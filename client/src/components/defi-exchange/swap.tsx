import { Text } from "shared/text/text";
import { Row } from "shared/row/row";
import { DialogTop } from "shared/dialog/dialog-top";
import useActiveWeb3React from "hooks/web3active.hook";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { CurrencyAmount, JSBI, Trade } from "@pancakeswap/sdk";
import { CurrencyInputPanel } from "../currency-input-panel/currency-input-panel";
import {
  useDerivedSwapInfo,
  useLoadSwapState,
  useSwapActionHandlers,
  useSwapState
} from "state/swap/hooks";
import { Field } from "state/swap/actions";
import {
  useUserSingleHopOnly,
  useUserSlippageTolerance
} from "state/user/hooks";
import maxAmountSpend from "utils/maxAmountSpend";
import useWrapCallback, { WrapType } from "hooks/wrap-callback.hook";
import {
  ApprovalState,
  useApproveCallbackFromTrade
} from "hooks/approval-callback.hook";
import { useSwapCallback } from "hooks/swap-callback";
import { computeTradePriceBreakdown, warningSeverity } from "utils/prices";
import confirmPriceImpactWithoutFee from "./swap.helpers";
import useIsOpen from "hooks/is-open.hook";
import SwapWarningPopup from "components/swap-warning/swap-warning-popup";
import SwapWarningTokens from "config/constants/swapWarningTokens";
import ConfirmSwapPopup from "components/confirm-swap/confirm-swap-popup";
import { Button } from "shared/button/button";
import { INITIAL_ALLOWED_SLIPPAGE } from "config/constants";
import TradePrice from "./trade-price";
import ConnectWalletButton from "components/connect-wallet/connect-wallet-button";
import SwapButton from "shared/swap-button/swap-button";
import { RowItem } from "shared/row-item/row-item";
import { $backgroundColor } from "styles/colors";
import { DefaultBlock } from "shared/default-block/default-block";
import ProgressCircles from "shared/progress-circles/progress-circles";
import { AdvancedSwapDetails } from "components/advanced-swap-details/advanced-swap-details";

const SwapButtonWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const TextContainer = styled(DefaultBlock)`
  background: ${$backgroundColor};
  padding-left: 20px;
  padding-right: 20px;
`;

export default function Swap() {
  useLoadSwapState();

  const { account } = useActiveWeb3React();

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance();

  // swap state
  const { independentField, typedValue } = useSwapState();
  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError
  } = useDerivedSwapInfo();

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError
  } = useWrapCallback(
    currencies[Field.INPUT],
    currencies[Field.OUTPUT],
    typedValue
  );

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE;
  const trade = showWrap ? undefined : v2Trade;

  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount
      }
    : {
        [Field.INPUT]:
          independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]:
          independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount
      };

  const { onSwitchTokens, onCurrencySelection, onUserInput } =
    useSwapActionHandlers();
  const isValid = !swapInputError;
  const dependentField: Field =
    independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value);
    },
    [onUserInput]
  );
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value);
    },
    [onUserInput]
  );

  // modal and loading
  const [
    { tradeToConfirm, swapErrorMessage, attemptingTxn, txHash },
    setSwapState
  ] = useState<{
    tradeToConfirm: Trade | undefined;
    attemptingTxn: boolean;
    swapErrorMessage: string | undefined;
    txHash: string | undefined;
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined
  });

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ""
      : parsedAmounts[dependentField]?.toSignificant(6) ?? ""
  };

  const route = trade?.route;
  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] &&
      currencies[Field.OUTPUT] &&
      parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0))
  );
  const noRoute = !route;

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(
    trade,
    allowedSlippage
  );

  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true);
    }
  }, [approval, approvalSubmitted]);

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(
    currencyBalances[Field.INPUT]
  );
  const atMaxAmountInput = Boolean(
    maxAmountInput && parsedAmounts[Field.INPUT]?.equalTo(maxAmountInput)
  );

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage
  );

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade);

  const [singleHopOnly] = useUserSingleHopOnly();

  const handleSwap = useCallback(() => {
    if (
      priceImpactWithoutFee &&
      !confirmPriceImpactWithoutFee(priceImpactWithoutFee)
    ) {
      return;
    }
    if (!swapCallback) {
      return;
    }
    setSwapState({
      attemptingTxn: true,
      tradeToConfirm,
      swapErrorMessage: undefined,
      txHash: undefined
    });
    swapCallback()
      .then(hash => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: undefined,
          txHash: hash
        });
      })
      .catch(error => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined
        });
      });
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm]);

  // errors
  const [showInverted, setShowInverted] = useState<boolean>(false);

  // warnings on slippage
  const priceImpactSeverity = warningSeverity(priceImpactWithoutFee);

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !swapInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED)) &&
    !(priceImpactSeverity > 3);

  const handleConfirmDismiss = useCallback(() => {
    setSwapState({ tradeToConfirm, attemptingTxn, swapErrorMessage, txHash });
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, "");
    }
  }, [attemptingTxn, onUserInput, swapErrorMessage, tradeToConfirm, txHash]);

  const handleAcceptChanges = useCallback(() => {
    setSwapState({
      tradeToConfirm: trade,
      swapErrorMessage,
      txHash,
      attemptingTxn
    });
  }, [attemptingTxn, swapErrorMessage, trade, txHash]);

  // swap warning state
  const [swapWarningCurrency, setSwapWarningCurrency] = useState(null);

  const [
    swapWarningModalIsOpen,
    setOpenSwapWarningModal,
    setCloseSwapWarningModal
  ] = useIsOpen();

  const shouldShowSwapWarning = swapCurrency => {
    const isWarningToken = Object.entries(SwapWarningTokens).find(
      warningTokenConfig => {
        const warningTokenData = warningTokenConfig[1];
        return swapCurrency.address === warningTokenData.address;
      }
    );
    return Boolean(isWarningToken);
  };

  useEffect(() => {
    if (swapWarningCurrency) {
      setOpenSwapWarningModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapWarningCurrency]);

  const handleInputSelect = useCallback(
    inputCurrency => {
      setApprovalSubmitted(false); // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency);
      const showSwapWarning = shouldShowSwapWarning(inputCurrency);
      if (showSwapWarning) {
        setSwapWarningCurrency(inputCurrency);
      } else {
        setSwapWarningCurrency(null);
      }
    },
    [onCurrencySelection]
  );

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact());
    }
  }, [maxAmountInput, onUserInput]);

  const handleOutputSelect = useCallback(
    outputCurrency => {
      onCurrencySelection(Field.OUTPUT, outputCurrency);
      const showSwapWarning = shouldShowSwapWarning(outputCurrency);
      if (showSwapWarning) {
        setSwapWarningCurrency(outputCurrency);
      } else {
        setSwapWarningCurrency(null);
      }
    },

    [onCurrencySelection]
  );

  const [confirmModalIsOpen, setOpenConfirmModal, setCloseConfirmModal] =
    useIsOpen();

  return (
    <DialogTop title={"Exchange"} includeSwapHeader>
      <CurrencyInputPanel
        label={
          independentField === Field.OUTPUT && !showWrap && trade
            ? "From (estimated)"
            : "From"
        }
        value={formattedAmounts[Field.INPUT]}
        showMaxButton={!atMaxAmountInput}
        currency={currencies[Field.INPUT]}
        onUserInput={handleTypeInput}
        onMax={handleMaxInput}
        onCurrencySelect={handleInputSelect}
        otherCurrency={currencies[Field.OUTPUT]}
      />

      <Row style={{ position: "relative" }} size={"large"}>
        <SwapButtonWrapper>
          <SwapButton
            onClick={() => {
              setApprovalSubmitted(false); // reset 2 step UI for approvals
              onSwitchTokens();
            }}
          />
        </SwapButtonWrapper>
      </Row>

      <CurrencyInputPanel
        value={formattedAmounts[Field.OUTPUT]}
        onUserInput={handleTypeOutput}
        label={
          independentField === Field.INPUT && !showWrap && trade
            ? "To (estimated)"
            : "To"
        }
        showMaxButton={false}
        currency={currencies[Field.OUTPUT]}
        onCurrencySelect={handleOutputSelect}
        otherCurrency={currencies[Field.INPUT]}
      />

      {showWrap ? null : (
        <>
          {Boolean(trade) && (
            <Row style={{ justifyContent: "space-between" }}>
              <RowItem>
                <Text weight={"bold"} color={"yellow"} size={"small"}>
                  Price
                </Text>
              </RowItem>
              <TradePrice
                price={trade?.executionPrice}
                showInverted={showInverted}
                setShowInverted={setShowInverted}
              />
            </Row>
          )}
          {allowedSlippage !== INITIAL_ALLOWED_SLIPPAGE && (
            <Row>
              <RowItem>
                <Text weight={"bold"} color={"yellow"} size={"small"}>
                  Slippage Tolerance
                </Text>
              </RowItem>
              <RowItem style={{ marginLeft: "auto" }}>
                <Text weight={"bolder"}>{allowedSlippage / 100}%</Text>
              </RowItem>
            </Row>
          )}
        </>
      )}
      <Row onlyOffset>
        {!account ? (
          <ConnectWalletButton />
        ) : showWrap ? (
          <Button wide disabled={Boolean(wrapInputError)} onClick={onWrap}>
            {wrapInputError ??
              (wrapType === WrapType.WRAP
                ? "Wrap"
                : wrapType === WrapType.UNWRAP
                ? "Unwrap"
                : null)}
          </Button>
        ) : noRoute && userHasSpecifiedInputOutput ? (
          <TextContainer size={"small"}>
            <Text color="textSubtle">
              {"Insufficient liquidity for this trade."}
            </Text>
            {singleHopOnly && (
              <Text color="textSubtle">{"Try enabling multi-hop trades."}</Text>
            )}
          </TextContainer>
        ) : showApproveFlow ? (
          <Row style={{ justifyContent: "space-between" }}>
            <Button
              isPending={approval === ApprovalState.PENDING}
              color={
                approval === ApprovalState.APPROVED ? "success" : "primary"
              }
              style={{ width: "48%" }}
              onClick={approveCallback}
              disabled={
                approval !== ApprovalState.NOT_APPROVED || approvalSubmitted
              }
            >
              {approval === ApprovalState.PENDING
                ? "Enabling"
                : approvalSubmitted && approval === ApprovalState.APPROVED
                ? "Enabled"
                : `Enable ${currencies[Field.INPUT]?.symbol ?? ""}`}
            </Button>
            <Button
              style={{ width: "48%" }}
              color={isValid && priceImpactSeverity > 2 ? "danger" : "primary"}
              onClick={() => {
                setSwapState({
                  tradeToConfirm: trade,
                  attemptingTxn: false,
                  swapErrorMessage: undefined,
                  txHash: undefined
                });
                setOpenConfirmModal();
              }}
              disabled={
                !isValid ||
                approval !== ApprovalState.APPROVED ||
                priceImpactSeverity > 3
              }
            >
              {priceImpactSeverity > 3
                ? "Price Impact High"
                : priceImpactSeverity > 2
                ? "Swap Anyway"
                : "Swap"}
            </Button>
          </Row>
        ) : (
          <Button
            wide
            color={
              isValid && priceImpactSeverity > 2 && !swapCallbackError
                ? "danger"
                : "primary"
            }
            onClick={() => {
              setSwapState({
                tradeToConfirm: trade,
                attemptingTxn: false,
                swapErrorMessage: undefined,
                txHash: undefined
              });
              setOpenConfirmModal();
            }}
            disabled={
              !isValid || priceImpactSeverity > 3 || !!swapCallbackError
            }
          >
            {swapInputError ||
              (priceImpactSeverity > 3
                ? "Price Impact Too High"
                : priceImpactSeverity > 2
                ? "Swap Anyway"
                : "Swap")}
          </Button>
        )}
      </Row>
      {showApproveFlow && (
        <Row onlyOffset>
          <ProgressCircles steps={[approval === ApprovalState.APPROVED]} />
        </Row>
      )}
      {trade && <AdvancedSwapDetails trade={trade} />}
      <SwapWarningPopup
        open={swapWarningModalIsOpen}
        swapCurrency={swapWarningCurrency}
        onClose={setCloseSwapWarningModal}
      />
      <ConfirmSwapPopup
        open={confirmModalIsOpen}
        onClose={setCloseConfirmModal}
        trade={trade}
        originalTrade={tradeToConfirm}
        onAcceptChanges={handleAcceptChanges}
        attemptingTxn={attemptingTxn}
        txHash={txHash}
        allowedSlippage={allowedSlippage}
        onConfirm={handleSwap}
        swapErrorMessage={swapErrorMessage}
        customOnClose={handleConfirmDismiss}
      />
    </DialogTop>
  );
}
