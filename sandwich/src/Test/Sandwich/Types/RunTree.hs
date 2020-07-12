{-# LANGUAGE ViewPatterns #-}
{-# LANGUAGE TypeOperators #-}
{-# LANGUAGE RankNTypes #-}
{-# LANGUAGE NamedFieldPuns #-}
{-# LANGUAGE GADTs #-}
{-# LANGUAGE RecordWildCards #-}
{-# LANGUAGE DeriveFunctor #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE FlexibleInstances #-}
{-# LANGUAGE TypeSynonymInstances #-}
-- |

module Test.Sandwich.Types.RunTree where

import Control.Concurrent.Async
import Control.Concurrent.STM
import Control.Monad.Logger
import Data.Sequence
import Data.Time.Clock
import GHC.Stack
import Test.Sandwich.Types.Options
import Test.Sandwich.Types.Spec

data Status = NotStarted
            | Running { statusStartTime :: UTCTime }
            | Done { statusStartTime :: UTCTime
                   , statusEndTime :: UTCTime
                   , statusResult :: Result }
            deriving (Show, Eq)

data RunNodeWithStatus context s l t where
  RunNodeBefore :: { runNodeCommon :: RunNodeCommonWithStatus s l t
                   , runNodeChildren :: [RunNodeWithStatus context s l t]
                   , runNodeBefore :: ExampleT context m () } -> RunNodeWithStatus context s l t
  RunNodeAfter :: { runNodeCommon :: RunNodeCommonWithStatus s l t
                  , runNodeChildren :: [RunNodeWithStatus context s l t]
                  , runNodeAfter :: ExampleT context m () } -> RunNodeWithStatus context s l t
  RunNodeIntroduce :: { runNodeCommon :: RunNodeCommonWithStatus s l t
                      , runNodeChildrenAugmented :: [RunNodeWithStatus (LabelValue lab intro :> context) s l t]
                      , runNodeAlloc :: ExampleT context m intro
                      , runNodeCleanup :: intro -> ExampleT context m () } -> RunNodeWithStatus context s l t
  RunNodeIntroduceWith :: { runNodeCommon :: RunNodeCommonWithStatus s l t
                          , runNodeChildrenAugmented :: [RunNodeWithStatus (LabelValue lab intro :> context) s l t]
                          , runNodeIntroduceAction :: ActionWith intro -> ExampleT context m () } -> RunNodeWithStatus context s l t
  RunNodeAround :: { runNodeCommon :: RunNodeCommonWithStatus s l t
                   , runNodeChildren :: [RunNodeWithStatus context s l t]
                   , runNodeActionWith :: ExampleT context m Result -> ExampleT context m () } -> RunNodeWithStatus context s l t
  RunNodeDescribe :: { runNodeCommon :: RunNodeCommonWithStatus s l t
                     , runNodeChildren :: [RunNodeWithStatus context s l t] } -> RunNodeWithStatus context s l t
  RunNodeParallel :: { runNodeCommon :: RunNodeCommonWithStatus s l t
                     , runNodeChildren :: [RunNodeWithStatus context s l t] } -> RunNodeWithStatus context s l t
  RunNodeIt :: { runNodeCommon :: RunNodeCommonWithStatus s l t
               , runNodeExample :: ExampleT context m () } -> RunNodeWithStatus context s l t

type RunNodeFixed context = RunNodeWithStatus context Status (Seq LogEntry) Bool
type RunNode context = RunNodeWithStatus context (Var Status) (Var (Seq LogEntry)) (Var Bool)

-- * RunNodeCommon

data RunNodeCommonWithStatus s l t = RunNodeCommonWithStatus {
  runTreeLabel :: String
  , runTreeId :: Int
  , runTreeAncestors :: Seq Int
  , runTreeToggled :: t
  , runTreeStatus :: s
  , runTreeFolder :: Maybe FilePath
  , runTreeVisibilityLevel :: Int
  , runTreeLogs :: l
  } deriving Show

type RunNodeCommonFixed = RunNodeCommonWithStatus Status (Seq LogEntry) Bool
type RunNodeCommon = RunNodeCommonWithStatus (Var Status) (Var (Seq LogEntry)) (Var Bool)

-- * Other

type Var = TVar
data LogEntry = LogEntry { logEntryTime :: UTCTime
                         , logEntryLoc :: Loc
                         , logEntrySource :: LogSource
                         , logEntryLevel :: LogLevel
                         , logEntryStr :: LogStr
                         } deriving (Show, Eq)

-- | Context passed around through the evaluation of a RunTree
data RunTreeContext = RunTreeContext {
  runTreeOptions :: Options
  , runTreeCurrentFolder :: Maybe FilePath
  , runTreeCurrentAncestors :: Seq Int
  , runTreeIndexInParent :: Int
  , runTreeNumSiblings :: Int
  }

isFailureStatus :: Status -> Bool
isFailureStatus (Done _ _ stat) = isFailure stat
isFailureStatus _ = False

fixRunTree :: RunNode context -> STM (RunNodeFixed context)
fixRunTree node@(runNodeCommon -> (RunNodeCommonWithStatus {..})) = do
  status <- readTVar runTreeStatus
  logs <- readTVar runTreeLogs
  toggled <- readTVar runTreeToggled

  let common' = RunNodeCommonWithStatus {
        runTreeStatus = status
        , runTreeLogs = logs
        , runTreeToggled = toggled
        , ..
        }

  case node of
    RunNodeBefore {..} -> do
      children <- mapM fixRunTree runNodeChildren
      return $ RunNodeBefore { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeAfter {..} -> do
      children <- mapM fixRunTree runNodeChildren
      return $ RunNodeAfter { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeIntroduce {..} -> do
      children <- mapM fixRunTree runNodeChildrenAugmented
      return $ RunNodeIntroduce { runNodeCommon=common', runNodeChildrenAugmented=children, .. }
    RunNodeIntroduceWith {..} -> do
      children <- mapM fixRunTree runNodeChildrenAugmented
      return $ RunNodeIntroduceWith { runNodeCommon=common', runNodeChildrenAugmented=children, .. }
    RunNodeAround {..} -> do
      children <- mapM fixRunTree runNodeChildren
      return $ RunNodeAround { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeDescribe {..} -> do
      children <- mapM fixRunTree runNodeChildren
      return $ RunNodeDescribe { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeParallel {..} -> do
      children <- mapM fixRunTree runNodeChildren
      return $ RunNodeParallel { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeIt {..} -> do
      return $ RunNodeIt { runNodeCommon=common', .. }

unFixRunTree :: RunNodeFixed context -> STM (RunNode context)
unFixRunTree node@(runNodeCommon -> (RunNodeCommonWithStatus {..})) = do
  status <- newTVar runTreeStatus
  logs <- newTVar runTreeLogs
  toggled <- newTVar runTreeToggled

  let common' = RunNodeCommonWithStatus {
        runTreeStatus = status
        , runTreeLogs = logs
        , runTreeToggled = toggled
        , ..
        }

  case node of
    RunNodeBefore {..} -> do
      children <- mapM unFixRunTree runNodeChildren
      return $ RunNodeBefore { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeAfter {..} -> do
      children <- mapM unFixRunTree runNodeChildren
      return $ RunNodeAfter { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeIntroduce {..} -> do
      children <- mapM unFixRunTree runNodeChildrenAugmented
      return $ RunNodeIntroduce { runNodeCommon=common', runNodeChildrenAugmented=children, .. }
    RunNodeIntroduceWith {..} -> do
      children <- mapM unFixRunTree runNodeChildrenAugmented
      return $ RunNodeIntroduceWith { runNodeCommon=common', runNodeChildrenAugmented=children, .. }
    RunNodeAround {..} -> do
      children <- mapM unFixRunTree runNodeChildren
      return $ RunNodeAround { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeDescribe {..} -> do
      children <- mapM unFixRunTree runNodeChildren
      return $ RunNodeDescribe { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeParallel {..} -> do
      children <- mapM unFixRunTree runNodeChildren
      return $ RunNodeParallel { runNodeCommon=common', runNodeChildren=children, .. }
    RunNodeIt {..} -> do
      return $ RunNodeIt { runNodeCommon=common', .. }


getCallStackFromStatus :: Status -> Maybe CallStack
getCallStackFromStatus NotStarted {} = Nothing
getCallStackFromStatus Running {} = Nothing
getCallStackFromStatus Done {statusResult} = getCallStackFromResult statusResult

getCallStackFromResult :: Result -> Maybe CallStack
getCallStackFromResult (Success {}) = Nothing
getCallStackFromResult (Failure (Reason x _)) = x
getCallStackFromResult (Failure (ExpectedButGot x _ _)) = x
getCallStackFromResult (Failure (DidNotExpectButGot x _)) = x
getCallStackFromResult (Failure (Pending x _)) = x
getCallStackFromResult (Failure (GotException {})) = Nothing
getCallStackFromResult (Failure (GetContextException {})) = Nothing
getCallStackFromResult (Failure (GotAsyncException {})) = Nothing

isDone :: Status -> Bool
isDone (Done {}) = True
isDone _ = False
