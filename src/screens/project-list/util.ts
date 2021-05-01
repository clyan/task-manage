import { useMemo } from "react";
import { useUrlQueryParams } from "utils/url";

// 项目列表搜索参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParams(["name", "personId"]);
  // 由于直接从url获取的参数为string，需要转换为number
  return [
    // useMemo , 解决每次返回的是不同的对象，导致循环引用
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const; // 注意点！！！加const
};
