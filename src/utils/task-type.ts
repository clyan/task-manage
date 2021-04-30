import { TaskType } from "./../types/task-type";

import { useHttp } from "utils/http";
import { useQuery } from "react-query";

// 获取所有
export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
