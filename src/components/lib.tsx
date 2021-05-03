import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import { useEffect, useRef } from "react";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <ErrorBox error={error}></ErrorBox>
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
// 类型守卫( 当value有message时，则认为他是一个Error类型)
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    console.log(error);
    return (
      <Typography.Text type={"danger"}> {error?.message} </Typography.Text>
    );
  }
  return null;
};
