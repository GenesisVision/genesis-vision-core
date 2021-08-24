import { css } from "styled-components";
import { adaptiveMargin, cursorPointer } from "styles/mixins";
import {
  $paddingBig,
  $paddingMedium,
  $paddingSmall,
  $paddingXsmall,
  $paddingXxsmall,
  $paddingXxxsmall
} from "styles/sizes";
import { IRowItemProps } from "./row-item.types";

export const RowItemStaticStyles = {
  "box-sizing": "border-box"
};

const getOffset = (size: number, bottom: boolean) => {
  return `
  &:not(:last-child){
    ${adaptiveMargin("right", size)}
  }
  ${bottom ? adaptiveMargin("bottom", size) : ""}`;
};

export const RowItemDynamicStyles = css`
  ${cursorPointer};
  display: ${({ hide }: IRowItemProps) => (hide ? "none" : "block")};
  ${({ wide }: IRowItemProps) => (wide ? "width: 100%" : "")};
  ${({ size = "middle", bottomOffset }: IRowItemProps) => {
    switch (size) {
      case "xsmall":
        return getOffset($paddingXxxsmall, !!bottomOffset);
      case "small":
        return getOffset($paddingXxsmall, !!bottomOffset);
      case "middle":
        return getOffset($paddingXsmall, !!bottomOffset);
      case "large":
        return getOffset($paddingSmall, !!bottomOffset);
      case "xlarge":
        return getOffset($paddingMedium, !!bottomOffset);
      case "xxlarge":
        return getOffset($paddingBig, !!bottomOffset);
    }
  }}
`;
