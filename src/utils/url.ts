import { cleanObject } from "./index";
import { useMemo } from "react";
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
/**
 * 返回页面URl中，指定键的参数值
 */
export const useUrlQueryParams = <T extends string>(keys: T[]) => {
  const [searchParam, setSearchParam] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce(
          (prev, key) => ({ ...prev, [key]: searchParam.get(key) || "" }),
          {} as { [key in T]: string }
        ),
      [searchParam]
    ), // eslint-disable-line1  react-hooks/exhaustive-deps
    (params: Partial<{ [key in T]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParam),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const; // 解决 返回类型异常问题
};
