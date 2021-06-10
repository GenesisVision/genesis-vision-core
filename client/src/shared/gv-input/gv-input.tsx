import React from "react";
import { Text } from "shared/text/text";
import styled from "styled-components";
import { $negativeColor } from "styles/colors";
import { fontSize } from "styles/mixins";
import { $fontSizeXsmall } from "styles/sizes";
import { GvInputAdornment } from "./gv-input-adornment";
import { GvInputLabel } from "./gv-input-label";
import { GvInputWrapper } from "./gv-input-wrapper";
import { GVInputStyles, IPropsGvInput } from "./gv-input.styles";

interface Props extends IPropsGvInput {
  inputElement: JSX.Element;
}

const Error = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  ${fontSize($fontSizeXsmall)};
  color: ${$negativeColor};
`;

const StyledDiv = styled.div<Props>`
  ${GVInputStyles}
`;

const _GvInput: React.FC<Props> = (props) => {
  const {
    showError = true,
    noMargin,
    wide,
    label,
    focused,
    adornment,
    value,
    touched,
    error,
    inputElement,
    adornmentPosition = "end",
  } = props;
  return (
    <GvInputWrapper margin={!noMargin} wide={wide}>
      {label && (
        <GvInputLabel
          shrink={
            !!focused || !!adornment || (value !== undefined && value !== "")
          }
        >
          <Text wrap={false} muted size={"large"}>
            {label}
          </Text>
        </GvInputLabel>
      )}
      <StyledDiv {...props}>
        {inputElement}
        {adornment && (
          <GvInputAdornment adornmentPosition={adornmentPosition}>
            {adornment}
          </GvInputAdornment>
        )}
      </StyledDiv>
      {showError && touched && error && <Error>{error}</Error>}
    </GvInputWrapper>
  );
};

export const GvInput = React.memo(_GvInput);
