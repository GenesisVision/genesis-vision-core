import { DialogBottom } from "shared/dialog/dialog-bottom";
import orderBy from "lodash/orderBy";
import { DialogTop } from "shared/dialog/dialog-top";
import React, { useCallback } from "react";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import useActiveWeb3React from "hooks/web3active.hook";
import { useDispatch } from "react-redux";
import {
  isTransactionRecent,
  useAllTransactions
} from "state/transactions/hooks";
import { clearAllTransactions } from "state/transactions/actions";
import ConnectWalletButton from "components/connect-wallet/connect-wallet-button";
import { Button } from "shared/button/button";
import { TransactionDetails } from "state/transactions/reducer";
import { Transaction } from "./components/transaction";

function renderTransactions(transactions: TransactionDetails[]) {
  return (
    <Row size={"small"} onlyOffset>
      {transactions.map(tx => {
        return <Transaction key={tx.hash + tx.addedTime} tx={tx} />;
      })}
    </Row>
  );
}

const _SwapTransactions: React.FC = () => {
  const { account, chainId } = useActiveWeb3React();
  const dispatch = useDispatch();
  const allTransactions = useAllTransactions();

  const sortedRecentTransactions = orderBy(
    Object.values(allTransactions).filter(isTransactionRecent),
    "addedTime",
    "desc"
  );

  console.log({ allTransactions });

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt);
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt);

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }));
  }, [dispatch, chainId]);
  return (
    <>
      <DialogTop title={"Recent Transactions"} />
      <DialogBottom>
        {account ? (
          <>
            {!!pending.length || !!confirmed.length ? (
              <>
                <Row
                  style={{ justifyContent: "space-between" }}
                  size={"xsmall"}
                >
                  <Text>{"Recent Transactions"}</Text>
                  <Button
                    size={"xsmall"}
                    color={"secondary"}
                    onClick={clearAllTransactionsCallback}
                  >
                    clear all
                  </Button>
                </Row>
                {renderTransactions(pending)}
                {renderTransactions(confirmed)}
              </>
            ) : (
              <Text>{"No recent transactions"}</Text>
            )}
          </>
        ) : (
          <ConnectWalletButton />
        )}
      </DialogBottom>
    </>
  );
};

const SwapTransactions = React.memo(_SwapTransactions);
export default SwapTransactions;
