import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
import { darkTheme } from "./theme";
import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
