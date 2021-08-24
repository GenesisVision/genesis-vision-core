import React from "react";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import styled from "styled-components";
import { CurrencyItem, ICurrencyItemProps } from "./currency-item";

interface Props extends ICurrencyItemProps {
  showSymbol?: boolean;
  showName?: boolean;
  available?: number | string;
}

const Name = styled(RowItem)`
  min-width: 80px;
`;

const _CurrencyItemWithAmount: React.FC<Props> = ({
  showSymbol,
  showName,
  available,
  symbol,
  name,
  ...props
}) => {
  return (
    <Row>
      <Name>
        <CurrencyItem
          {...props}
          symbol={symbol}
          name={available !== undefined && !showName ? symbol : name}
        />
      </Name>
      <RowItem>
        <Text muted>
          {available} {showSymbol && <>{symbol}</>}
        </Text>
      </RowItem>
    </Row>
  );
};

export const CurrencyItemWithAmount = React.memo(_CurrencyItemWithAmount);
