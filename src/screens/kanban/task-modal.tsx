import React, { useEffect } from "react";
import { useTaskModal, useTasksQueryKey } from "screens/kanban/utils";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDeleteTask, useEditTask } from "utils/task";
import UserSelect from "components/user-select";
import { TaskTypeSelect } from "components/task-type";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { mutateAsync: editTask, isLoading: editingLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { editingTask, close, editingTaskId } = useTaskModal();

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = () =>
    editTask({ ...editingTask, ...form.getFieldsValue() }).then(close);

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());
  const cofirmDeleteTask = (id: number) => {
    close();
    Modal.confirm({
      title: "确定删除这个任务吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteTask({ id });
      },
    });
  };

  return (
    <Modal
      forceRender={true}
      confirmLoading={editingLoading}
      okText={"确认"}
      cancelText={"取消"}
      title={"编辑任务"}
      visible={!!editingTask}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button
          size={"small"}
          style={{ fontSize: "14px" }}
          onClick={() => cofirmDeleteTask(Number(editingTaskId))}
        >
          {" "}
          删除
        </Button>
      </div>
    </Modal>
  );
};
