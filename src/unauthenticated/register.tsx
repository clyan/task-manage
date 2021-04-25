import { useAuth } from "context/auth-context";
import React from "react";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated";
import { useAsync } from "utils/use-async";
function RegisterScreen({
  onError,
}: {
  onError: (error: Error) => void;
}): React.ReactElement<any> {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次密码相同"));
      return;
    }
    try {
      await run(register(values));
    } catch (error) {
      console.log(error);
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        initialValue={"ywy"}
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
      <Form.Item
        name={"cpassword"}
        initialValue={"123456"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确定密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
}

export default RegisterScreen;
