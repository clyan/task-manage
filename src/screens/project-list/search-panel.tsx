/** @jsxImportSource @emotion/react */
import React from "react";
import { Form, Input } from "antd";
import { Project } from "./list";
import UserSelect from "components/user-select";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

function SearchPanel({
  param,
  setParam,
  users,
}: SearchPanelProps): React.ReactElement<any> {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect defaultOptionName={"负责人"} />
      </Form.Item>
    </Form>
  );
}

export default SearchPanel;
