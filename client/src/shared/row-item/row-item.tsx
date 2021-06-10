import styled from "styled-components";
import { RowItemDynamicStyles } from "./row-item.styles";
import { IRowItemProps } from "./row-item.types";

export const RowItem = styled.div<IRowItemProps>`
  box-sizing: border-box;
  ${RowItemDynamicStyles}
`;
