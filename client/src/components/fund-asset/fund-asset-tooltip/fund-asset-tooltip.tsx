import React from "react";
import { Center } from "shared/center/center";
import { RowItem } from "shared/row-item/row-item";
import { Text } from "shared/text/text";
import { TooltipContent } from "shared/tooltip/tooltip-content";
import { CurrencyEnum } from "utils/gv-api.types";

interface IFundAssetTooltipProps {
  name: string;
  currency: CurrencyEnum;
}

const _FundAssetTooltip: React.FC<IFundAssetTooltipProps> = ({
  name,
  currency
}) => (
  <TooltipContent fixed={false}>
    <Center>
      <RowItem size={"small"}>{name}</RowItem>
      <Text muted>{currency}</Text>
    </Center>
  </TooltipContent>
);

const FundAssetTooltip = React.memo(_FundAssetTooltip);
export default FundAssetTooltip;
