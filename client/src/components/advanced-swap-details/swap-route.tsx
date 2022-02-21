import React, { Fragment, memo } from "react";
import { Trade } from "@pancakeswap/sdk";
import { Text } from "shared/text/text";
import { unwrappedToken } from "utils/wrappedCurrency";
import styled from "styled-components";
import { ChevronRightIcon } from "shared/icon/chevron-right-icon";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: end;
`;

export default memo(function SwapRoute({ trade }: { trade: Trade }) {
  return (
    <Container>
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1;
        const currency = unwrappedToken(token);
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={i}>
            <TextContainer>
              <Text>{currency.symbol}</Text>
            </TextContainer>
            {!isLastItem && <ChevronRightIcon />}
          </Fragment>
        );
      })}
    </Container>
  );
});
