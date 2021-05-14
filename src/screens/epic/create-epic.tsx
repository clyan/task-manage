import React, { useEffect } from "react";
import { Drawer, DrawerProps, Spin, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { Container } from "screens/project-list/project-modal";
import { useAddEpic } from "utils/epic";
import { useEpicQueryKey } from "./util";
import { useProjectIdInUrl } from "screens/kanban/utils";
// 不使用DrawerProps 定义的onClose , 因为onClose 需要传入参数，此处不需要传入实参
// 所以自定义一个参数
// export const CreateEpic = (props:Pick<DrawerProps, 'visible'| 'onClose'>) => {
export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, error, isLoading } = useAddEpic(useEpicQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };
  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      visible={props.visible}
      forceRender={true}
      destroyOnClose={true}
      onClose={() => props.onClose()}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>创建任务组</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入任务组名称" }]}
              >
                <Input placeholder={"请输入任务组名称"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};
