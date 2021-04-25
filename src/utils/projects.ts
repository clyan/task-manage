import { cleanObject } from "./index";
import { useHttp } from "utils/http";
import { Project } from "./../screens/project-list/list";
import { useAsync } from "./use-async";
import { useEffect } from "react";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(params || {}) }));
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps
  return result;
};
