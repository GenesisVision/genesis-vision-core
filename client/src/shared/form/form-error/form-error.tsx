import React from "react";
import styled from "styled-components";
import { $negativeColor } from "styles/colors";
import { fontSize } from "styles/mixins";
import { $fontSizeH4, $fontSizeSmall } from "styles/sizes";

export interface IFormErrorProps {
  small?: boolean;
  error?: string;
}

const Error = styled.div<IFormErrorProps>`
  color: ${$negativeColor};
  ${({ small }) => (small ? fontSize($fontSizeSmall) : fontSize($fontSizeH4))}
`;

const FormError: React.FC<IFormErrorProps> = React.memo(({ error, small }) => {
  if (error) {
    return <Error small={small}>{error}</Error>;
  }
  return null;
});

export default FormError;
