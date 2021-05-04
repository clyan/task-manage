import styled from "@emotion/styled";
import { Menu } from "antd";
import { ScreenContainer } from "components/lib";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanbanScreen } from "screens/kanban";
const useRouteType = () => {
  const utils = useLocation().pathname.split("/");
  return utils[utils.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}> 看板 </Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}> 任务组 </Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<KanbanScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
          <Navigate to={window.location.pathname + "/kanban"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.div`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.div`
  box-shadow: -5px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
`;
