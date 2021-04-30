import { cleanObject } from "./index";
import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
/**
 * 返回页面URl中，指定键的参数值
 */
export const useUrlQueryParams = <T extends string>(keys: T[]) => {
  const [searchParam] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  return [
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => ({ ...prev, [key]: searchParam.get(key) || "" }),
          {} as { [key in T]: string }
        ),
      [searchParam] //eslint-disable-line  react-hooks/exhaustive-deps
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const; // 解决 返回类型异常问题
};

export const useSetUrlSearchParam = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParam),
      ...params,
    }) as URLSearchParamsInit;

    return setSearchParam(o);
  };
};
