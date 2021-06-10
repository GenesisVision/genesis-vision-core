import { css } from "styled-components";
import { AnyObjectType } from "utils/types";
import { mediaBreakpointLandscapePhone } from "./media";
import { $dividerPadding, $dividerText } from "./sizes";

export const adaptiveBorderRadius = (size: number) => {
  return `
    border-radius: ${size / $dividerText}px;
    ${mediaBreakpointLandscapePhone(`border-radius: ${size}px;`)}`;
};

export const adaptivePadding = (
  direction: string,
  marginSize: number,
  divider: number = $dividerPadding
) => {
  return `
    padding-${direction}: ${marginSize / divider}px;
    ${mediaBreakpointLandscapePhone(`padding-${direction}: ${marginSize}px;`)}
  `;
};

export const fontSize = (value: number) => {
  return `
    font-size: ${value / $dividerText}px;
    ${mediaBreakpointLandscapePhone(`font-size: ${value}px;`)}
  `;
};

export const adaptiveMargin = (
  direction: string,
  marginSize: number,
  divider: number = $dividerPadding
) => {
  return `
    margin-${direction}: ${marginSize / divider}px;
    ${mediaBreakpointLandscapePhone(`margin-${direction}: ${marginSize}px;`)}
  `;
};

export const cursorPointer = css`
  ${({ onClick }: AnyObjectType) => onClick && "cursor: pointer"};
`;

export const horizontalPaddings = (value: number, divider?: number) => {
  return `
    ${adaptivePadding("left", value, divider)}
    ${adaptivePadding("right", value, divider)}
  `;
};

export const verticalPaddings = (value: number, divider?: number) => {
  return `
    ${adaptivePadding("top", value, divider)}
    ${adaptivePadding("bottom", value, divider)}
  `;
};

export const adaptiveFullPadding = (value: number) => {
  return `
    ${verticalPaddings(value)}
    ${horizontalPaddings(value)}
  `;
};

export const lineHeight = (value: number, divider: number = $dividerText) => {
  return `
    line-height: ${value / divider}px;
    ${mediaBreakpointLandscapePhone(`line-height: ${value}px;`)}
  `;
};

export const width = (value: number, divider: number = $dividerText) => {
  return `
    width: ${value / divider}px;
    ${mediaBreakpointLandscapePhone(`width: ${value}px;`)}
  `;
};

export const height = (value: number, divider: number = $dividerText) => {
  return `
    height: ${value / divider}px;
    ${mediaBreakpointLandscapePhone(`height: ${value}px;`)}
  `;
};

export const getBoxShadowValue = (color: string) => {
  return `0 0.2em 0.5em 0 ${color}`;
};

export const transition = (...args: string[]) => {
  const props = args.join(", ");
  return {
    "transition-property": props,
    "transition-duration": "400ms",
    "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
    "transition-delay": "0s",
    "will-change": props,
  };
};
