import styled from "styled-components";
import { defaultBlockDynamicStyles } from "./default-block.styles";
import { IDefaultBlockProps } from "./default-block.types";

export const DefaultBlock = styled.div<IDefaultBlockProps>`
  ${defaultBlockDynamicStyles}
`;
