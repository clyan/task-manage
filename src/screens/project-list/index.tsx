import React from "react";
import { useDebounce } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProject } from "utils/projects";
import { useUser } from "utils/user";
import { useProjectSearchParams } from "./util";
import { Row, useDocumentTitle } from "components/lib";
import { useDispatch } from "react-redux";
import { projectListActions } from "./project-list.slice";
function ProjectListScreen(): React.ReactElement<any> {
  useDocumentTitle("项目列表", false);
  const dispatch = useDispatch();
  const [param, setParam] = useProjectSearchParams();
  // 节流
  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list, retry } = useProject(debounceParam);
  const { data: users } = useUser();
  return (
    <Container>
      <Row between={true} marginBottom={2}>
        <h2>项目列表</h2>
        <Button onClick={() => dispatch(projectListActions.openProjectModal())}>
          创建项目
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}> {error.message} </Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users || []}
        loading={isLoading}
        dataSource={list || []}
      />
    </Container>
  );
}
ProjectListScreen.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
export default ProjectListScreen;
