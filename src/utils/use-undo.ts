import { useCallback } from "react";
import { useState } from "react";

// 状态不合并
export const useUndo = (initialPresent: T) => {
  // 记录历史操作的合集
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  // 记录未来操作的合集
  const [future, setFuture] = useState<T[]>([]);
  const canUndo = past.length !== 0;
  const canRedo = future.length !== 0;
  // 使用useCallback包裹函数的依赖时，所有函数依赖都要加上，很麻烦
  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setPast(newPast);
    setPresent(previous);
    setFuture([previous, ...future]);
  }, [canUndo, future, past]);
  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = future[0];
    const newFuture = past.slice(1);
    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [future, past, canRedo, present]);
  const set = useCallback(
    (newPresent: T) => {
      if (newPresent === present) {
        return;
      }
      setPast([...past, present]);
      setPresent(newPresent);
      setFuture([]);
    },
    [past, present]
  );
  const reset = useCallback((newPresent: T) => {
    setPast([]);
    setPresent(newPresent);
    setFuture([]);
  }, []);
  return [
    { past, present, future },
    { set, reset, undo, redo, canUndo, canRedo },
  ] as const;
};
