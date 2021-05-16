import { useState, useEffect, useRef } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const isVoid = (value: unknown): boolean =>
  value === undefined || value === null || value === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) delete result[key];
  });
  return result;
};

export const useMount = (callback: Function): void => {
  useEffect(() => {
    callback();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

/**
 *
 * @param {*} value
 * @param {*} delay
 * @description 防抖,最后只执行一次，应用场景。
 * @description 泛型规范
 * @returns
 */
export const useDebounce = <V>(value: V, delay?: number): V => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

// 节流
// export default function useThrottle(fn: (value:any) => {}, delay: number) {
//   const { current } = useRef({ fn, timer: 0 as number | undefined})
//   useEffect(function () {
//     current.fn = fn
//   },[fn, current])

//   return useCallback(function f(...args) {
//     if (!current.timer) {
//       current.timer = window.setTimeout(() => {
//         delete current.timer
//       }, delay)
//       current.fn.call(this, ...args)
//     }
//   }, [current, delay]);
// }

export const useArray = <A>(initialArray: A[]): any => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: A) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false,反之返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
