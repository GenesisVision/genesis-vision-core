import React from "react";
import { Text } from "shared/text/text";
import { BlurContainer } from "shared/blur-container";
import useActiveWeb3React from "hooks/web3active.hook";
import { useCurrencyBalance } from "hooks/wallet";
import { Currency } from "@pancakeswap/sdk";

interface Props {
  currency: Currency;
  toSignificantValue?: number;
}

const _CurrencyBalance: React.FC<Props> = ({
  currency,
  toSignificantValue = 4
}) => {
  const { account } = useActiveWeb3React();
  const balance = useCurrencyBalance(account ?? undefined, currency);
  return (
    <>
      {balance ? (
        <Text muted>{balance.toSignificant(toSignificantValue)}</Text>
      ) : account ? (
        <BlurContainer blur>{0}</BlurContainer>
      ) : null}
    </>
  );
};

const CurrencyBalance = React.memo(_CurrencyBalance);
export default CurrencyBalance;
