import { Button, Drawer } from "antd";
import React from "react";
import { useProjectModal } from "./util";
function ProjectModal() {
  const { close, projectModalOpen } = useProjectModal();
  return (
    <Drawer onClose={() => close()} visible={projectModalOpen} width={"100%"}>
      ProjectModal
      <Button onClick={() => close()}>关闭</Button>
    </Drawer>
  );
}

export default ProjectModal;
