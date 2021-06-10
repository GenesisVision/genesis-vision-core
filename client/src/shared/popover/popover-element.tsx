import styled from "styled-components";
import { $popoverBackground } from "styles/colors";
import { adaptiveBorderRadius } from "styles/mixins";
import { $boxShadow4 } from "styles/shadow";
import { $borderRadius } from "styles/sizes";

export const PopoverElement = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  background-color: ${$popoverBackground};
  ${adaptiveBorderRadius($borderRadius)};
  overflow: hidden;
  box-shadow: ${$boxShadow4};
  max-width: calc(100vw - 20px);
  z-index: 1301;
  transition: opacity 150ms ease-in-out;
`;
