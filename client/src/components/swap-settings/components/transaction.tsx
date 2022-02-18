import useActiveWeb3React from "hooks/web3active.hook";
import React from "react";
import { CircleLoader } from "shared/circle-loader/circle-loader";
import { CancelIcon } from "shared/icon/cancel-icon";
import { OkIcon } from "shared/icon/ok-icon";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import { TransactionDetails } from "state/transactions/reducer";
import styled from "styled-components";
import { transition } from "styles/mixins";
import { getBscScanLink } from "utils";

const StyledA = styled.a`
  ${transition("opacity")}
  &:hover {
    opacity: 0.6;
  }
`;

interface Props {
  tx: TransactionDetails;
}

export const Transaction: React.FC<Props> = ({ tx }) => {
  const { chainId } = useActiveWeb3React();

  const summary = tx?.summary;
  const pending = !tx?.receipt;
  const success =
    !pending &&
    tx &&
    (tx.receipt?.status === 1 || typeof tx.receipt?.status === "undefined");

  if (!chainId) return null;

  return (
    <Row size={"xsmall"} style={{ justifyContent: "space-between" }}>
      <Text>
        <StyledA
          target="_blank"
          rel="noopener noreferrer"
          href={getBscScanLink(tx.hash, "transaction", chainId)}
        >
          {summary ?? tx.hash}
        </StyledA>
      </Text>
      {pending ? <CircleLoader /> : success ? <OkIcon /> : <CancelIcon />}
    </Row>
  );
};
