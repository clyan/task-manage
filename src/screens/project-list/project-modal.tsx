import { Button, Drawer } from "antd";
import React from "react";
interface ProjectModalProps {
  projectModalOpen: boolean;
  onClose: () => void;
}

function ProjectModal(props: ProjectModalProps) {
  return (
    <Drawer
      onClose={() => props.onClose()}
      visible={props?.projectModalOpen}
      width={"100%"}
    >
      ProjectModal
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
}

export default ProjectModal;
