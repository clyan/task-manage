import { Select } from "antd";
import React from "react";
import { Row } from "types";
type SelectProps = React.ComponentProps<typeof Select>;

interface idSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Row | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}
/**
 * value 可以传入多种类型，
 * onChange只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为true 的时候， 代表选择默认类型。
 * 当选择默认类型的时候， onChange会回调undefined
 * @returns
 */
function IdSelect(props: idSelectProps) {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      // options?.length ? toNumber(value) 解决可能出现的，先显示id, 再显示name的情况
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
}
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
export default IdSelect;
