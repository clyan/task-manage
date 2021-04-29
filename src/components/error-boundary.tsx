import React from "react";

// 必须用class组件
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  // componentDidCatch(error, errorInfo) {
  //   // 你同样可以将错误日志上报给服务器
  //   logErrorToMyService(error, errorInfo);
  // }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}

export default ErrorBoundary;
