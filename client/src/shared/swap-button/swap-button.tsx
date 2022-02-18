import React from "react";
import styled from "styled-components";
import { $textAccentColor } from "styles/colors";
import { mediaBreakpointLandscapePhone } from "styles/media";
import { $dividerText } from "styles/sizes";

// copy of add-button

const $swapButtonHeight = 25;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3.6px;
  color: #14beb4;
  background: #253e48;
  width: ${$swapButtonHeight / $dividerText}px;
  height: ${$swapButtonHeight / $dividerText}px;
  cursor: pointer;
  font-size: ${28 / $dividerText}px;
  font-weight: 200;
  &:hover {
    background: rgb(21, 187, 175);
    svg path {
      stroke: ${$textAccentColor};
    }
  }
  ${mediaBreakpointLandscapePhone(`
    font-size: 28px;
    width: ${$swapButtonHeight}px;
    height: ${$swapButtonHeight}px;
  `)}
`;

interface Props {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const SwapButton: React.FC<Props> = ({ className, onClick }) => {
  return (
    <Container className={className} onClick={onClick}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.9436 3.25977V12.1975"
          stroke="#14beb4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.0542 6.16296C2.0542 6.16296 3.59057 3.25879 4.94278 3.25879C6.29428 3.25879 7.83135 6.16296 7.83135 6.16296"
          stroke="#14beb4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9751 13.762V4.82422"
          stroke="#14beb4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.8643 10.8584C14.8643 10.8584 13.3272 13.7626 11.9757 13.7626C10.6242 13.7626 9.08716 10.8584 9.08716 10.8584"
          stroke="#14beb4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Container>
  );
};
export default SwapButton;
