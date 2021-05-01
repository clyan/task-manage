import { Rate } from "antd";
import React from "react";
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChagne?: (checked: boolean) => void;
}
function Pin(props: PinProps) {
  const { checked, onCheckedChagne, ...restProps } = props;
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChagne?.(!!num)}
    />
  );
}

export default Pin;
