import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import ProjectListScreen from "screens/project-list";
import styled from "@emotion/styled";
import { Row, useDocumentTitle } from "components/lib";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
function AuthenticaedApp() {
  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* 共享router信息 */}
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
}
const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <HeaderItem>
          <Button type={"link"} onClick={resetRoute}>
            <SoftwareLogo
              width={"18rem"}
              color={"rgb(38,132,255)"}
            ></SoftwareLogo>
          </Button>
        </HeaderItem>
        <HeaderItem>项目</HeaderItem>
        <HeaderItem>用户</HeaderItem>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <Button type={"link"} onClick={logout}>
                  退出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main";
  height: 100vh;
`;

const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const HeaderItem = styled.h2`
  margin-right: 3rem;
`;
const Main = styled.main`
  grid-area: main;
`;

export default AuthenticaedApp;
