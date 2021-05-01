import React from "react";
import { useUser } from "utils/user";
import IdSelect from "./id-select";

function UseSelect(props: React.ComponentProps<typeof IdSelect>) {
  const { data: users } = useUser();
  return <IdSelect options={users || []} {...props} />;
}

export default UseSelect;
