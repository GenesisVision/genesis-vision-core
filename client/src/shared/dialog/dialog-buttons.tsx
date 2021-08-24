import * as React from "react";
import styled from "styled-components";
import { Row } from "shared/row/row";

const StyledRow = styled(Row)`
  justify-content: space-between;
`;

export const _DialogButtons: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children
}) => <StyledRow size={"xlarge"}>{children}</StyledRow>;

export const DialogButtons = React.memo(_DialogButtons);
