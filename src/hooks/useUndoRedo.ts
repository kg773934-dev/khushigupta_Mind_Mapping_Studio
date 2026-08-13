import { useState, useCallback } from 'react';

export function useUndoRedo<T>(initialPresent: T, maxHistory: number = 30) {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState<T>(initialPresent);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
  }, [past, present, future]);

  const redo = useCallback(() => {
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  }, [past, present, future]);

  const set = useCallback(
    (newPresent: T, overwriteHistory = false) => {
      if (overwriteHistory) {
        setPresent(newPresent);
        return;
      }

      setPast((prevPast) => {
        const nextPast = [...prevPast, present];
        if (nextPast.length > maxHistory) {
          return nextPast.slice(nextPast.length - maxHistory);
        }
        return nextPast;
      });
      setPresent(newPresent);
      setFuture([]);
    },
    [present, maxHistory]
  );

  const reset = useCallback((newInitialPresent: T) => {
    setPast([]);
    setPresent(newInitialPresent);
    setFuture([]);
  }, []);

  return {
    state: present,
    setState: set,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    historyLength: past.length
  };
}
