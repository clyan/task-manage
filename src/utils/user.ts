import { useQuery } from "react-query";
import { useHttp } from "utils/http";
import { User } from "types/user";

// 获取所有
export const useUsers = (params?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[]>(["users", params], () =>
    client("users", { data: params })
  );
};
