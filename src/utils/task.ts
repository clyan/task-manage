import { Task } from "types/task";

import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig } from "./use-optimistic-options";

// 获取所有
export const useTasks = (params?: Partial<Task>) => {
  const client = useHttp();
  // 指定Error
  // return useQuery<Project[], Error>(['projects', params], ()=> client('projects', { data: params }));
  // 不指定Error， 通过ErrorBox处理
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
