import React from "react";
import { useDebounce } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Button } from "antd";
import { useProjects } from "utils/projects";
import { useUser } from "utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import {
  ErrorBox,
  Row,
  ScreenContainer,
  useDocumentTitle,
} from "components/lib";
function ProjectListScreen(): React.ReactElement<any> {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  const [param, setParam] = useProjectSearchParams();
  // 节流
  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debounceParam);
  const { data: users } = useUser();
  return (
    <ScreenContainer>
      <Row between={true} marginBottom={2}>
        <h2>项目列表</h2>
        <Button onClick={() => open()}>创建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <ErrorBox error={error}></ErrorBox> : null}
      <List users={users || []} loading={isLoading} dataSource={list || []} />
    </ScreenContainer>
  );
}
ProjectListScreen.whyDidYouRender = false;

export default ProjectListScreen;
