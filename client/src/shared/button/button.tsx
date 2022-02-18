import React from "react";
import styled from "styled-components";
import { transition } from "styles/mixins";
import {
  ButtonDynamicStyles,
  LabelDynamicStyles,
  SuccessMarkDynamicStyles
} from "./button.styles";
import { IButtonProps, ILabelProps } from "./button.types";

const Label = styled.span<ILabelProps>`
  ${transition("opacity")}
  ${LabelDynamicStyles}
`;

const SuccessMark = styled.span<ILabelProps>`
  position: absolute;
  ${transition("opacity")}
  ${SuccessMarkDynamicStyles}
`;

const StyledButton = styled.button<IButtonProps>`
  ${ButtonDynamicStyles}
`;

const _Button: React.FC<IButtonProps> = props => {
  const {
    type = "button",
    isSuccessful,
    successSymbol = true,
    children,
    testId,
    flexChildren
  } = props;
  return (
    <StyledButton data-test-id={testId} {...props} type={type}>
      <Label flexChildren={flexChildren} isSuccessful={isSuccessful}>
        {children}
      </Label>
      {successSymbol && (
        <SuccessMark isSuccessful={isSuccessful}>✔</SuccessMark>
      )}
    </StyledButton>
  );
};

export const Button = React.memo<IButtonProps>(_Button);
