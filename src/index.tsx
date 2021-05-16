import "./wdyr";
import { AppProviders } from "context";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  loadServer,
  // DevTools
} from "jira-dev-tool";
// 此处引入less,并不是要使用less编写css, 而是，方便自定义css变量,自定义主题
import "antd/dist/antd.less";

loadServer(() =>
  ReactDOM.render(
    <AppProviders>
      {/* <DevTools /> */}
      <App />
    </AppProviders>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
