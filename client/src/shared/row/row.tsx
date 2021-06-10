import { Center } from "shared/center/center";
import styled from "styled-components";
import { adaptiveMargin } from "styles/mixins";
import {
  $paddingMedium,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxsmall,
  $paddingXxxsmall,
} from "styles/sizes";

import { IRowProps } from "./row.types";

export const Row = styled(Center)<IRowProps>`
  width: ${({ wide }: IRowProps) => (wide ? "100%" : "auto")};
  &:not(:first-child) {
    ${({ size = "middle" }: IRowProps) => {
      switch (size) {
        case "zero":
          return adaptiveMargin("top", 0);
        case "xsmall":
          return adaptiveMargin("top", $paddingXxxsmall);
        case "small":
          return adaptiveMargin("top", $paddingXxsmall);
        case "middle":
          return adaptiveMargin("top", $paddingXsmall);
        case "large":
          return adaptiveMargin("top", $paddingSmall);
        case "xlarge":
          return adaptiveMargin("top", $paddingMedium);
      }
    }}
  }
`;
