{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE FlexibleContexts #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE DuplicateRecordFields #-}
{-# LANGUAGE MultiWayIf #-}
-- |

module Test.Sandwich.Formatters.TerminalUI (
  defaultTerminalUIFormatter
  , showContextManagers
  , showRunTimes
  ) where

import Brick
import Brick.BChan
import Brick.Widgets.List
import Control.Concurrent
import Control.Concurrent.Async
import Control.Concurrent.STM
import Control.Exception.Safe
import Control.Monad
import Control.Monad.IO.Class
import Data.Foldable
import qualified Data.List as L
import qualified Data.Set as S
import qualified Data.Vector as Vec
import qualified Graphics.Vty as V
import Lens.Micro
import Test.Sandwich.Formatters.TerminalUI.AttrMap
import Test.Sandwich.Formatters.TerminalUI.CrossPlatform
import Test.Sandwich.Formatters.TerminalUI.Draw
import Test.Sandwich.Formatters.TerminalUI.Filter
import Test.Sandwich.Formatters.TerminalUI.Keys
import Test.Sandwich.Formatters.TerminalUI.TreeToList
import Test.Sandwich.Formatters.TerminalUI.Types
import Test.Sandwich.Interpreters.RunTree.Util
import Test.Sandwich.Interpreters.StartTree
import Test.Sandwich.Shutdown
import Test.Sandwich.Types.Formatter
import Test.Sandwich.Types.RunTree
import Test.Sandwich.Types.Spec
import Test.Sandwich.Util


data TerminalUIFormatter = TerminalUIFormatter {
  showContextManagers :: Bool
  , showRunTimes :: Bool
  }

defaultTerminalUIFormatter :: TerminalUIFormatter
defaultTerminalUIFormatter = TerminalUIFormatter {
  showContextManagers = True
  , showRunTimes = True
  }

instance Formatter TerminalUIFormatter where
  runFormatter = runApp

runApp :: TerminalUIFormatter -> [RunNode BaseContext] -> BaseContext -> IO ()
runApp (TerminalUIFormatter {..}) rts baseContext = do
  rtsFixed <- atomically $ mapM fixRunTree rts
  let initialState = updateFilteredTree (zip (filterRunTree showContextManagers rts) (filterRunTree showContextManagers rtsFixed)) $
        AppState {
          _appRunTreeBase = rts
          , _appRunTree = rtsFixed
          , _appRunTreeFiltered = []
          , _appMainList = list () mempty 1
          , _appBaseContext = baseContext

          , _appShowContextManagers = showContextManagers
          , _appShowRunTimes = showRunTimes
        }

  eventChan <- newBChan 10

  currentFixedTree <- newTVarIO rtsFixed
  eventAsync <- async $ forever $ do
    newFixedTree <- atomically $ do
      currentFixed <- readTVar currentFixedTree
      newFixed <- mapM fixRunTree rts
      when (fmap getCommons newFixed == fmap getCommons currentFixed) retry
      writeTVar currentFixedTree newFixed
      return newFixed
    writeBChan eventChan (RunTreeUpdated newFixedTree)
    threadDelay 100000 -- Sleep 100ms

  let buildVty = V.mkVty V.defaultConfig
  initialVty <- buildVty
  flip onException (cancel eventAsync) $
    void $ customMain initialVty buildVty (Just eventChan) app initialState

app :: App AppState AppEvent ()
app = App {
  appDraw = drawUI
  , appChooseCursor = showFirstCursor
  , appHandleEvent = appEvent
  , appStartEvent = return
  , appAttrMap = const mainAttrMap
  }

appEvent :: AppState -> BrickEvent () AppEvent -> EventM () (Next AppState)
appEvent s (AppEvent (RunTreeUpdated newTree)) = continue $ s
  & appRunTree .~ newTree
  & updateFilteredTree (zip (filterRunTree (s ^. appShowContextManagers) (s ^. appRunTreeBase))
                            (filterRunTree (s ^. appShowContextManagers) newTree))

appEvent s x@(VtyEvent e) =
  case e of
    V.EvKey c [] | c `elem` [V.KEsc, exitKey]-> do
      -- Cancel everything and wait for cleanups
      liftIO $ mapM_ cancelNode (s ^. appRunTreeBase)
      _ <- forM_ (s ^. appRunTreeBase) (liftIO . waitForTree)
      halt s

    V.EvKey c [] | c == toggleShowContextManagersKey -> do
      let runTreeFiltered = filterRunTree (not $ s ^. appShowContextManagers) (s ^. appRunTreeBase)
      let runTreeFilteredFixed = filterRunTree (not $ s ^. appShowContextManagers) (s ^. appRunTree)
      continue $ s
        & appShowContextManagers %~ not
        & updateFilteredTree (zip runTreeFiltered runTreeFilteredFixed)

    V.EvKey c [] | c == toggleShowRunTimesKey -> continue $ s
      & appShowRunTimes %~ not

    -- Navigation
    V.EvKey c [] | c == nextKey -> continue (s & appMainList %~ (listMoveBy 1))
    V.EvKey c [] | c == previousKey -> continue (s & appMainList %~ (listMoveBy (-1)))
    V.EvKey c [] | c == nextFailureKey -> do
      let ls = Vec.toList $ listElements (s ^. appMainList)
      let listToSearch = case listSelectedElement (s ^. appMainList) of
            Just (i, MainListElem {}) -> let (front, back) = L.splitAt (i + 1) (zip [0..] ls) in back <> front
            Nothing -> zip [0..] ls
      case L.find (isFailureStatus . status . snd) listToSearch of
        Nothing -> continue s
        Just (i', _) -> continue (s & appMainList %~ (listMoveTo i'))
    V.EvKey c [] | c == previousFailureKey -> do
      let ls = Vec.toList $ listElements (s ^. appMainList)
      let listToSearch = case listSelectedElement (s ^. appMainList) of
            Just (i, MainListElem {}) -> let (front, back) = L.splitAt i (zip [0..] ls) in (L.reverse front) <> (L.reverse back)
            Nothing -> L.reverse (zip [0..] ls)
      case L.find (isFailureStatus . status . snd) listToSearch of
        Nothing -> continue s
        Just (i', _) -> continue (s & appMainList %~ (listMoveTo i'))


    V.EvKey c [] | c `elem` toggleKeys -> modifyToggled s not
    V.EvKey c [] | c == V.KLeft -> modifyToggled s (const False)
    V.EvKey c [] | c == V.KRight -> modifyToggled s (const True)

    V.EvKey c [] | c == cancelAllKey -> do
      liftIO $ mapM_ cancelNode (s ^. appRunTreeBase)
      continue s
    V.EvKey c [] | c == cancelSelectedKey -> withContinueS $ do
      whenJust (listSelectedElement (s ^. appMainList)) $ \(_, MainListElem {..}) -> liftIO $
        (readTVarIO $ runTreeStatus node) >>= \case
          Running {..} -> cancel statusAsync
          _ -> return ()
    V.EvKey c [] | c == runAllKey -> withContinueS $ do
      when (all (not . isRunning . runTreeStatus . runNodeCommon) (s ^. appRunTree)) $ liftIO $ do
        mapM_ clearRecursively (s ^. appRunTreeBase)
        void $ async $ void $ runNodesSequentially (s ^. appRunTreeBase) (s ^. appBaseContext)
    V.EvKey c [] | c == runSelectedKey -> withContinueS $
      whenJust (listSelectedElement (s ^. appMainList)) $ \(_, MainListElem {..}) -> case status of
        Running {} -> return ()
        _ -> do
          -- Get the set of IDs for only this node's ancestors and children
          let ancestorIds = S.fromList $ toList $ runTreeAncestors node
          let childIds = S.fromList $ extractValues' (runTreeId . runNodeCommon) runNode
          let allIds = ancestorIds <> childIds
          -- Clear the status of all affected nodes
          liftIO $ mapM_ (clearRecursivelyWhere (\x -> runTreeId x `S.member` allIds)) (s ^. appRunTreeBase)
          -- Start a run for all affected nodes
          let bc = (s ^. appBaseContext) { baseContextOnlyRunIds = Just allIds }
          void $ liftIO $ async $ void $ runNodesSequentially (s ^. appRunTreeBase) bc
    V.EvKey c [] | c == clearResultsKey -> withContinueS $ do
      liftIO $ mapM_ clearRecursively (s ^. appRunTreeBase)
    V.EvKey c [] | c == openSelectedFolderInFileExplorer -> withContinueS $ do
      whenJust (listSelectedElement (s ^. appMainList)) $ \(_i, MainListElem {folderPath}) ->
        whenJust folderPath $ liftIO . openFileExplorerFolderPortable

    ev -> handleEventLensed s appMainList handleListEvent ev >>= continue

  where withContinueS action = action >> continue s
appEvent s _ = continue s

modifyToggled s f = case listSelectedElement (s ^. appMainList) of
  Nothing -> continue s
  Just (i, MainListElem {..}) -> do
    liftIO $ atomically $ modifyTVar (runTreeToggled node) f
    continue s


updateFilteredTree :: [(RunNode BaseContext, RunNodeFixed BaseContext)] -> AppState -> AppState
updateFilteredTree pairs s = s
  & appRunTreeFiltered .~ fmap snd pairs
  & appMainList %~ listReplace (treeToVector pairs) (listSelected $ s ^. appMainList)

-- * Clearing

clearRecursively :: RunNode context -> IO ()
clearRecursively = mapM_ clearCommon . getCommons

clearRecursivelyWhere :: (RunNodeCommon -> Bool) -> RunNode context -> IO ()
clearRecursivelyWhere f = mapM_ clearCommon . filter f . getCommons

clearCommon :: RunNodeCommon -> IO ()
clearCommon (RunNodeCommonWithStatus {..}) = atomically $ do
  writeTVar runTreeStatus NotStarted
  writeTVar runTreeLogs mempty
