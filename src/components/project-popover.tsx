import { Divider, List, Popover, Typography } from "antd";
import React from "react";
import { useProject } from "utils/projects";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
export interface ProjectPopoverProps {
  setProjectModalOpen: (isOpen: boolean) => void;
}

function ProjectPopover(props: ProjectPopoverProps) {
  const { data: projects, isLoading } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={() => props.setProjectModalOpen(true)}
        type={"link"}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      项目
    </Popover>
  );
}
const ContentContainer = styled.div`
  min-width: 30rem;
`;
export default ProjectPopover;
