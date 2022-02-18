import { $primaryColorHover } from "styles/colors";
import styled from "styled-components";

const StyledSvg = styled.svg`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation-iteration-count: infinite;
  animation-duration: 1.5s;
  animation-timing-function: linear;
  animation-name: rotate;
`;

export const CircleLoader = () => {
  return (
    <StyledSvg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5"
        strokeWidth="2.5"
        stroke={$primaryColorHover}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};
