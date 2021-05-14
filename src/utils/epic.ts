import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/epic";

// 获取所有
export const useEpics = (params?: Partial<Epic>) => {
  const client = useHttp();
  // 指定Error
  // return useQuery<Project[], Error>(['projects', params], ()=> client('projects', { data: params }));
  // 不指定Error， 通过ErrorBox处理
  return useQuery<Epic[]>(["epics", params], () =>
    client("epics", { data: params })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
