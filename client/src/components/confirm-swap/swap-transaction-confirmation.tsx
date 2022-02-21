import { ChainId, Currency, Token } from "@pancakeswap/sdk";
import useActiveWeb3React from "hooks/web3active.hook";
import { useCallback } from "react";
import { Text } from "shared/text/text";
import { Row } from "shared/row/row";
import { wrappedCurrency } from "utils/wrappedCurrency";
import { Button } from "shared/button/button";
import styled from "styled-components";
import Spinner from "shared/spinner/spinner";
import { transition } from "styles/mixins";
import { getBscScanLink } from "utils";

const StyledA = styled.a`
  ${transition("opacity")}
  &:hover {
    opacity: 0.6;
  }
  display: block;
  text-align: center;
`;

const StyledText = styled(Text).attrs({
  as: "p"
})`
  text-align: center;
  padding: 0;
`;

function ConfirmationPendingContent({ pendingText }: { pendingText: string }) {
  return (
    <>
      <Spinner isShown />
      <Row onlyOffset>
        <StyledText>Waiting For Confirmation</StyledText>
      </Row>
      <Row onlyOffset size={"small"}>
        <StyledText weight="bold">{pendingText}</StyledText>
      </Row>
      <Row onlyOffset size={"small"}>
        <StyledText muted>Confirm this transaction in your wallet</StyledText>
      </Row>
    </>
  );
}

function TransactionSubmittedContent({
  onClose,
  chainId,
  hash,
  currencyToAdd
}: {
  onClose: () => void;
  hash: string | undefined;
  chainId: ChainId;
  currencyToAdd?: Currency | undefined;
}) {
  // const { library } = useActiveWeb3React();

  // const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId);

  return (
    <>
      <Row onlyOffset>
        <StyledText size="large" weight={"bold"}>
          Transaction Submitted
        </StyledText>
      </Row>
      <Row onlyOffset>
        {chainId && hash && (
          <StyledA
            target="_blank"
            rel="noopener noreferrer"
            href={getBscScanLink(hash, "transaction", chainId)}
          >
            View on BscScan
          </StyledA>
        )}
      </Row>
      {/* {currencyToAdd && library?.provider?.isMetaMask && (
            <Button
              onClick={() =>
                registerToken(token.address, token.symbol, token.decimals)
              }
            >
              <RowFixed>
                {t("Add %asset% to Metamask", { asset: currencyToAdd.symbol })}
                <MetamaskIcon width="16px" ml="6px" />
              </RowFixed>
            </Button>
          )} */}
      <Row>
        <Button wide onClick={onClose}>
          Close
        </Button>
      </Row>
    </>
  );
}

export function ConfirmationModalContent({
  bottomContent,
  topContent
}: {
  topContent: () => React.ReactNode;
  bottomContent: () => React.ReactNode;
}) {
  return (
    <>
      {topContent()}
      {bottomContent()}
    </>
  );
}

export function TransactionErrorContent({
  message,
  onClose
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <>
      <Row onlyOffset>
        <StyledText size={"large"} color="red">
          {message}
        </StyledText>
      </Row>
      <Row>
        <Button wide onClick={onClose}>
          Dismiss
        </Button>
      </Row>
    </>
  );
}

interface ConfirmationProps {
  onClose?: () => void;
  hash: string | undefined;
  content: () => React.ReactNode;
  attemptingTxn: boolean;
  pendingText: string;
  currencyToAdd?: Currency | undefined;
}

export const SwapTransactionConfirmation: React.FC<ConfirmationProps> = ({
  onClose,
  attemptingTxn,
  hash,
  pendingText,
  content,
  currencyToAdd
}) => {
  const { chainId } = useActiveWeb3React();

  if (!chainId) return null;

  return (
    <>
      {attemptingTxn ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : hash ? (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={hash}
          onClose={onClose}
          currencyToAdd={currencyToAdd}
        />
      ) : (
        content()
      )}
    </>
  );
};
