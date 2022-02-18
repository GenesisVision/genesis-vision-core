import React from "react";
import { $negativeColor } from "styles/colors";

export const CancelIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L9 9"
      stroke={$negativeColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 1L1 9"
      stroke={$negativeColor}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
