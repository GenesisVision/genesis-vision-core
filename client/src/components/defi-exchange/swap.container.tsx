import React from "react";
import Swap from "./swap";

export const _SwapContainer: React.FC = () => {
  return <Swap />;
};

const SwapContainer = React.memo(_SwapContainer);
export default SwapContainer;
