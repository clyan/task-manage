import { useProjectSearchParams } from "./../screens/project-list/util";
import {
  useDeleteConfig,
  useEditConfig,
  useAddConfig,
} from "./use-optimistic-options";
import { useHttp } from "utils/http";
import { Project } from "./../screens/project-list/list";
import { QueryKey, useMutation, useQuery } from "react-query";

// 获取所有
export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  // 指定Error
  // return useQuery<Project[], Error>(['projects', params], ()=> client('projects', { data: params }));
  // 不指定Error， 通过ErrorBox处理
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// 获取详情
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    // 当id 不为false时再请求
    {
      enabled: Boolean(id),
    }
  );
};
