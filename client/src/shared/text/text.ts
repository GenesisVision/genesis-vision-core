import styled from "styled-components";
import { dynamicTextStyles } from "./text.styles";
import { ITextProps } from "./text.types";

export const Text = styled.span<ITextProps>`
  ${dynamicTextStyles}
`;
