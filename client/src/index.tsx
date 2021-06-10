import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SWRConfig } from "swr";

import { createGlobalStyle } from "styled-components";
import { RootStyle } from "styles/root-styles";

const GlobalStyle = createGlobalStyle`
  ${RootStyle}
`;

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(process.env.REACT_APP_API_URL + resource, init).then((res) =>
            res.json()
          ),
      }}
    >
      <App />
      <GlobalStyle />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById("root")
);
