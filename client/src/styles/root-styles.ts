import { css } from "styled-components";
import {
  $backgroundColor,
  $primaryColor,
  $textDarkColor,
  $textLightColor,
} from "styles/colors";
import { adaptivePadding, fontSize } from "styles/mixins";
import {
  $fontSizeCommon,
  $fontSizeH1,
  $fontSizeH2,
  $fontSizeH3,
  $fontSizeH4,
  $fontSizeParagraph,
  $paddingXxsmall,
} from "styles/sizes";

export const RootStyle = css`
  html,
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    color: white;
    background-color: ${$backgroundColor};
    font-family: "Montserrat", sans-serif;
    backface-visibility: hidden;
  }
  .body--fixed {
    overflow: hidden;
  }

  div {
    box-sizing: border-box;
  }

  input,
  textarea,
  select,
  button {
    font-family: "Montserrat", sans-serif;
  }

  a {
    color: ${$primaryColor};
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }

  #root {
    height: 100%;
    color: white;
  }

  h1 {
    ${fontSize($fontSizeH1)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
  }

  h2 {
    ${fontSize($fontSizeH2)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
  }

  h3 {
    ${fontSize($fontSizeH3)};
    font-weight: 600;
    color: ${$textLightColor};
    margin-top: 0;
    margin-bottom: 0;
    letter-spacing: 0.2px;
  }

  h4 {
    ${fontSize($fontSizeH4)};
    font-weight: 800;
    margin-top: 0;
    margin-bottom: 0;
  }

  h5 {
    margin: 0;
    ${fontSize($fontSizeCommon)};
  }

  p {
    ${fontSize($fontSizeParagraph)};
    ${adaptivePadding("bottom", $paddingXxsmall)};
    margin-top: 0;
    margin-bottom: 0;
  }

  :root {
    --scroll-width: 6px;
    --scroll-radius: calc(var(--scroll-width) / 2);
    --scroll-background: transparent;
    --scroll-thumb-color: ${$textDarkColor};
  }
  ::-webkit-scrollbar {
    width: var(--scroll-width);
    height: var(--scroll-width);
  }

  ::-webkit-scrollbar-track {
    background: var(--scroll-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scroll-thumb-color);
    border-radius: var(--scroll-radius);
  }

  ::-webkit-scrollbar-corner {
    background: var(--scroll-background);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--scroll-thumb-color) var(--scroll-background);
  }
`;
