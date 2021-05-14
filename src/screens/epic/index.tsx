import { Row, ScreenContainer } from "components/lib";
import { Button, List, Spin, Modal } from "antd";
import React, { useState } from "react";
import { useProjectInUrl } from "screens/kanban/utils";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useEpicQueryKey, useEpicSearchParams } from "./util";
import { CreateEpic } from "./create-epic";
import { Epic } from "types/epic";

export function EpicScreen() {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics, isLoading } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);
  const cofirmDeleteTask = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除这个${epic.name}吗？`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>
          {" "}
          创建任务组{" "}
        </Button>
      </Row>
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <List
          style={{ overflowY: "auto" }}
          dataSource={epics}
          itemLayout={"vertical"}
          renderItem={(epic) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span>{epic.name}</span>
                    <Button
                      type={"link"}
                      onClick={() => cofirmDeleteTask(epic)}
                    >
                      删除
                    </Button>
                  </Row>
                }
                description={
                  <div>
                    <div>
                      开始时间： {dayjs(epic.start).format("YYYY-MM-DD")}
                    </div>
                    <div>结束时间： {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              />
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <p key={task.id}>
                      <Link
                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                      >
                        {task.name}
                      </Link>
                    </p>
                  ))}
              </div>
            </List.Item>
          )}
        />
      )}
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      ></CreateEpic>
    </ScreenContainer>
  );
}
