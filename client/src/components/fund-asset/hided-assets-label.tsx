import React from "react";
import { HidedAssetsContainer, HidedAssetsCount } from "./fund-asset.styles";
import { FundAssetViewType } from "./fund-asset.types";

const _HidedAssets: React.FC<Props> = ({
  type,
  count,
  handleOpen,
  canExpand = true,
}) => {
  switch (type) {
    case "text":
      return <div>... +{count}</div>;
    default:
      return canExpand ? (
        <HidedAssetsContainer onClick={handleOpen}>
          <HidedAssetsCount canExpand={canExpand}>+{count}</HidedAssetsCount>
        </HidedAssetsContainer>
      ) : (
        <HidedAssetsCount canExpand={canExpand}>+{count}</HidedAssetsCount>
      );
  }
};
const HidedAssetsLabel = React.memo(_HidedAssets);
export default HidedAssetsLabel;

interface Props {
  canExpand?: boolean;
  count: number;
  type: FundAssetViewType;
  handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
}
