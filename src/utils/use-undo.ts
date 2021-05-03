import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;
  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case REDO: {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = past.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      if (newPresent === present) {
        return state;
      }
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
  }
};
type State<T> = {
  past: T[];
  present: T;
  future: T[];
};
type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};
// 状态合并
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;
  // 使用useCallback包裹函数的依赖时，所有函数依赖都要加上，很麻烦
  const undo = useCallback(() => {
    dispatch({
      type: UNDO,
    });
  }, []);
  const redo = useCallback(() => {
    dispatch({
      type: REDO,
    });
  }, []);
  const set = useCallback((newPresent: T) => {
    dispatch({
      type: SET,
      newPresent,
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    dispatch({
      type: RESET,
      newPresent,
    });
  }, []);
  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
