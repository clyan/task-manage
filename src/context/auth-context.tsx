import React, { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallBack, FullPageLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";
import * as authStore from "store/auth.slice";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  // 使用token，拿user的信息。
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isIdle, isLoading, isError, error } = useAsync<User | null>();
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  // 初始化user状态，登录后，user被重置为null, 需要重新设置。 页面会先在登录页，在闪回主页。
  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });
  // 添加全局loading, 登录后刷新页面
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallBack error={error} />;
  }
  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
