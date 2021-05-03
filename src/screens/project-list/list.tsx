import { Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { User } from "./search-panel";
import { Link } from "react-router-dom";
import Pin from "components/pin";
import { useEditProject } from "utils/projects";
import { ButtonNoPadding } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";
// TODO 将id 改成number类型
export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}
function ListPanel({ users, ...props }: ListProps): React.ReactElement<any> {
  const dispatch = useDispatch();
  const { mutate } = useEditProject();
  // 柯理化改造。。
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChagne={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}> {project.name} </Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
          key: "organization",
        },
        {
          title: "负责人",
          key: "id",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          key: "created",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        onClick={() =>
                          dispatch(projectListActions.openProjectModal())
                        }
                        type={"link"}
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
}

export default ListPanel;
