import React, { ComponentType } from "react";
import styled from "styled-components";
import {
  appMainStyles,
  appStyles,
  appWrapperStyles,
} from "./app-layout.styles";

const App = styled.div`
  ${appStyles}
`;

const AppWrapper = styled.div`
  ${appWrapperStyles}
`;

const AppMain = styled.div`
  ${appMainStyles}
`;

const AppLayout: ComponentType = ({ children }) => {
  return (
    <AppWrapper>
      <App>
        <AppMain>{children}</AppMain>
      </App>
      <div id="modal-root" />
    </AppWrapper>
  );
};

export default AppLayout;
