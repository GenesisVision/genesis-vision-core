import { Trade, currencyEquals } from "@pancakeswap/sdk";
import React, { useCallback, useMemo } from "react";
import { DialogBottom } from "shared/dialog/dialog-bottom";
import { DialogTop } from "shared/dialog/dialog-top";
import { ConfirmSwapFooter } from "./confirm-swap-footer";
import { ConfirmSwapHeader } from "./confirm-swap-header";
import {
  ConfirmationModalContent,
  SwapTransactionConfirmation,
  TransactionErrorContent
} from "./swap-transaction-confirmation";

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(tradeA: Trade, tradeB: Trade): boolean {
  return (
    tradeA.tradeType !== tradeB.tradeType ||
    !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
    !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
    !currencyEquals(
      tradeA.outputAmount.currency,
      tradeB.outputAmount.currency
    ) ||
    !tradeA.outputAmount.equalTo(tradeB.outputAmount)
  );
}

interface ConfirmSwapProps {
  onClose: () => void;
  trade?: Trade;
  originalTrade?: Trade;
  attemptingTxn: boolean;
  txHash?: string;
  allowedSlippage: number;
  onAcceptChanges: () => void;
  onConfirm: () => void;
  swapErrorMessage?: string;
}

const _ConfirmSwap: React.FC<ConfirmSwapProps> = ({
  onClose,
  trade,
  originalTrade,
  attemptingTxn,
  txHash,
  allowedSlippage,
  onAcceptChanges,
  onConfirm,
  swapErrorMessage
}) => {
  const showAcceptChanges = useMemo(
    () =>
      Boolean(
        trade && originalTrade && tradeMeaningfullyDiffers(trade, originalTrade)
      ),
    [originalTrade, trade]
  );

  // text to show while loading
  const pendingText = `Swapping ${trade?.inputAmount?.toSignificant(6) ?? ""} ${
    trade?.inputAmount?.currency?.symbol ?? ""
  } for ${trade?.outputAmount?.toSignificant(6) ?? ""} ${
    trade?.outputAmount?.currency?.symbol ?? ""
  }`;

  const modalHeader = useCallback(() => {
    return trade ? (
      <ConfirmSwapHeader
        trade={trade}
        allowedSlippage={allowedSlippage}
        showAcceptChanges={showAcceptChanges}
        onAcceptChanges={onAcceptChanges}
      />
    ) : null;
  }, [allowedSlippage, onAcceptChanges, showAcceptChanges, trade]);

  const modalBottom = useCallback(() => {
    return trade ? (
      <ConfirmSwapFooter
        onConfirm={onConfirm}
        trade={trade}
        disabledConfirm={showAcceptChanges}
        swapErrorMessage={swapErrorMessage}
        allowedSlippage={allowedSlippage}
      />
    ) : null;
  }, [allowedSlippage, onConfirm, showAcceptChanges, swapErrorMessage, trade]);

  const confirmationContent = useCallback(
    () =>
      swapErrorMessage ? (
        <TransactionErrorContent onClose={onClose} message={swapErrorMessage} />
      ) : (
        <ConfirmationModalContent
          topContent={modalHeader}
          bottomContent={modalBottom}
        />
      ),
    [onClose, swapErrorMessage, modalBottom, modalHeader]
  );

  return (
    <>
      <DialogTop title={"Confirm swap"} />
      <DialogBottom>
        <SwapTransactionConfirmation
          onClose={onClose}
          attemptingTxn={attemptingTxn}
          hash={txHash}
          content={confirmationContent}
          pendingText={pendingText}
          currencyToAdd={trade?.outputAmount.currency}
        />
      </DialogBottom>
    </>
  );
};

const ConfirmSwap = React.memo(_ConfirmSwap);
export default ConfirmSwap;
