import { useAuth } from "context/auth-context";
import React from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated";
import { useAsync } from "utils/use-async";
function LoginScreen({
  onError,
}: {
  onError: (error: Error) => void;
}): React.ReactElement<any> {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error) {
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Button
        onClick={() => {
          throw new Error("错误");
        }}
      ></Button>
      {user ? (
        <div>
          登陆成功用户名：{user?.name}, Token: {user?.token}
        </div>
      ) : null}
      <Form.Item
        name={"username"}
        initialValue={"bbb"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        initialValue={"123456"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
}
export default LoginScreen;
