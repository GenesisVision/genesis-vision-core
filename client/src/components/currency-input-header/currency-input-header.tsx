import SwapSettingsButton from "components/swap-settings/swap-settings-button";
import SwapTransactionsButton from "components/swap-settings/swap-transactions-button";
import { RowItem } from "shared/row-item/row-item";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

export const CurrencyInputHeader = () => {
  return (
    <Container>
      <RowItem size={"small"}>
        <SwapSettingsButton />
      </RowItem>
      <RowItem>
        <SwapTransactionsButton />
      </RowItem>
    </Container>
  );
};
