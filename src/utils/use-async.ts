import { useState } from "react";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}
const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  // 一定要使用两层函数
  const [retry, setRetry] = useState(() => () => {});
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      data: null,
      stat: "error",
      error: error,
    });
  // 用来触发异步请求
  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise类型数据");
    }
    // 一定要两层， state会自动第一层
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig);
      }
    });
    setState({ ...state, stat: "loading" });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        if (config.throwOnError) return Promise.reject(err);
        return err;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    // 被调用时，重新跑一遍run，让state刷新一遍
    retry,
    setData,
    setError,
    ...state,
  };
};
