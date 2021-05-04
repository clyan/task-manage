import { useMount } from "./index";
import { useHttp } from "utils/http";
import { useAsync } from "./use-async";
import { User } from "types/user";

export const useUser = (params?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useMount(() => {
    run(client("users"));
  });
  return result;
};
