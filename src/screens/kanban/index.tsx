import React from "react";
import { useDocumentTitle } from "components/lib";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";

export function KanbanScreen() {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectInUrl();
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id}></KanbanColumn>
        ))}
      </ColumnsContainer>
    </div>
  );
}

const ColumnsContainer = styled.div`
  display: flex;
  flex: Row;
  overflow: hidden;
  margin-right: 2rem;
`;
