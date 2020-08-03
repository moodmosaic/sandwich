{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE LambdaCase #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE MultiWayIf #-}
{-# LANGUAGE OverloadedStrings #-}
-- |

module Test.Sandwich.Interpreters.RunTree.Util where

import Control.Concurrent.STM
import Control.Monad.Free
import Control.Monad.Logger
import qualified Data.List as L
import Data.Sequence as Seq hiding ((:>))
import Data.String.Interpolate
import Data.Time.Clock
import System.FilePath
import Test.Sandwich.Types.RunTree
import Test.Sandwich.Types.Spec
import Text.Printf

-- | Wait for a tree, catching any synchronous exceptions and returning them as a list
waitForTree :: RunNode context -> IO Result
waitForTree node = atomically $
  readTVar (runTreeStatus $ runNodeCommon node) >>= \case
    Done {statusResult} -> return statusResult
    NotStarted {} -> retry
    Running {} -> retry

-- | Append a log message outside of ExampleT. Only stored to in-memory logs, not disk.
-- Only for debugging the interpreter, should not be exposed.
appendLogMessage :: ToLogStr msg => TVar (Seq LogEntry) -> msg -> IO ()
appendLogMessage logs msg = do
  ts <- getCurrentTime
  atomically $ modifyTVar logs (|> LogEntry ts (Loc "" "" "" (0, 0) (0, 0)) "manual" LevelDebug (toLogStr msg))

getImmediateChildren :: Free (SpecCommand context m) () -> [Free (SpecCommand context m) ()]
getImmediateChildren (Free (It' no l ex next)) = (Free (It' no l ex (Pure ()))) : getImmediateChildren next
getImmediateChildren (Free (Before' no l f subspec next)) = (Free (Before' no l f subspec (Pure ()))) : getImmediateChildren next
getImmediateChildren (Free (After' no l f subspec next)) = (Free (After' no l f subspec (Pure ()))) : getImmediateChildren next
getImmediateChildren (Free (Introduce' no l cl alloc cleanup subspec next)) = (Free (Introduce' no l cl alloc cleanup subspec (Pure ()))) : getImmediateChildren next
getImmediateChildren (Free (IntroduceWith' no l cl action subspec next)) = (Free (IntroduceWith' no l cl action subspec (Pure ()))) : getImmediateChildren next
getImmediateChildren (Free (Around' no l f subspec next)) = (Free (Around' no l f subspec (Pure ()))) : getImmediateChildren next
getImmediateChildren (Free (Describe' no l subspec next)) = (Free (Describe' no l subspec (Pure ()))) : getImmediateChildren next
getImmediateChildren (Free (Parallel' no subspec next)) = (Free (Parallel' no subspec (Pure ()))) : getImmediateChildren next
getImmediateChildren (Pure ()) = [Pure ()]

countChildren :: Free (SpecCommand context m) () -> Int
countChildren = L.length . getImmediateChildren

appendFolder :: RunTreeContext -> String -> Maybe FilePath
appendFolder (RunTreeContext {runTreeCurrentFolder=Nothing}) _ = Nothing
appendFolder (RunTreeContext {runTreeCurrentFolder=(Just f), ..}) l = Just (f </> (nodeToFolderName l runTreeNumSiblings runTreeIndexInParent))

nodeToFolderName :: String -> Int -> Int -> String
nodeToFolderName name 1 0 = fixupName name
nodeToFolderName name numSiblings indexInParent = padding <> fixupName name
  where
    paddingNeeded
      | numSiblings < 10 = 1
      | numSiblings < 100 = 2
      | numSiblings < 1000 = 3
      | numSiblings < 10000 = 4
      | numSiblings < 100000 = 5
      | numSiblings < 1000000 = 6
      | numSiblings < 10000000 = 7
      | numSiblings < 100000000 = 8
      | otherwise = 15

    paddedNumber = printf [i|%0#{paddingNeeded}d|] indexInParent

    padding = if | numSiblings == 1 -> ""
                 | otherwise -> paddedNumber <> "_"

fixupName = replace '/' '_'

replace :: Eq a => a -> a -> [a] -> [a]
replace a b = map $ \c -> if c == a then b else c
