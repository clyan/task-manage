import { useAsync } from "utils/use-async";
import { cleanObject } from "./index";
import { useHttp } from "utils/http";
import { Project } from "./../screens/project-list/list";
import { useEffect } from "react";

export const useProject = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = () =>
    client("projects", { data: cleanObject(params || {}) });
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
