import { useHttp } from "utils/http";
import { useQuery } from "react-query";
import { Kanban } from "types/kanban";

// 获取所有
export const useKanbans = (params?: Partial<Kanban>) => {
  const client = useHttp();
  // 指定Error
  // return useQuery<Project[], Error>(['projects', params], ()=> client('projects', { data: params }));
  // 不指定Error， 通过ErrorBox处理
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};
