import React from "react";
/**
 * @param
 * @returns
 * @description 将搜索的内容进行高亮。
 */
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#257AFD" }}> {keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
