import React, { useEffect, useState } from "react";
import { Card, Input } from "antd";
import { useProjectIdInUrl, useTasksQueryKey } from "./utils";
import { useAddTask } from "utils/task";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const [inputMode, setInputMode] = useState(false);
  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };
  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) setName("");
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+ 创建事物</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        size={"large"}
        placeholder={"需要做些什么"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
