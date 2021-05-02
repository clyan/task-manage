import React from "react";
import { useDebounce } from "utils";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/projects";
import { useUser } from "utils/user";
import { useProjectSearchParams } from "./util";
import { useDocumentTitle } from "components/lib";
function ProjectListScreen(): React.ReactElement<any> {
  useDocumentTitle("项目列表", false);
  const [param, setParam] = useProjectSearchParams();
  // 节流
  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list, retry } = useProject(debounceParam);
  const { data: users } = useUser();
  return (
    <Container>
      <h2>项目列表</h2>
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
