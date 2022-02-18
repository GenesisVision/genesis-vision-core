import { DialogBottom } from "shared/dialog/dialog-bottom";
import { DialogTop } from "shared/dialog/dialog-top";
import { Text } from "shared/text/text";
import SwapWarningTokensConfig from "config/constants/swapWarningTokens";
import { WrappedTokenInfo } from "state/lists/hooks";
import React from "react";
import { DialogButtons } from "shared/dialog/dialog-buttons";
import { Button } from "shared/button/button";
import styled from "styled-components";

const StyledText = styled(Text).attrs({
  muted: true,
  as: "div"
})`
  margin-top: 5px;
`;

const SafemoonWarning = () => {
  return (
    <>
      <StyledText>{"To trade SAFEMOON, you must:"} </StyledText>
      <StyledText>• {"Click on the settings icon"}</StyledText>
      <StyledText>• {"Set your slippage tolerance to 12%+"}</StyledText>
      <StyledText>
        {"This is because SafeMoon taxes a 10% fee on each transaction:"}
      </StyledText>
      <StyledText>
        • {"5% fee = redistributed to all existing holders"}
      </StyledText>
      <StyledText>• {"5% fee = used to add liquidity"}</StyledText>
    </>
  );
};

const BondlyWarning = () => {
  return (
    <>
      <StyledText>
        {
          "Warning: BONDLY has been compromised. Please remove liquidity until further notice."
        }
      </StyledText>
    </>
  );
};

interface SwapWarningProps {
  onClose: () => void;
  swapCurrency: WrappedTokenInfo;
}

const _SwapWarning: React.FC<SwapWarningProps> = ({
  onClose,
  swapCurrency
}) => {
  const TOKEN_WARNINGS = {
    [SwapWarningTokensConfig.safemoon.address]: {
      symbol: SwapWarningTokensConfig.safemoon.symbol,
      component: <SafemoonWarning />
    },
    [SwapWarningTokensConfig.bondly.address]: {
      symbol: SwapWarningTokensConfig.bondly.symbol,
      component: <BondlyWarning />
    }
  };

  const SWAP_WARNING = TOKEN_WARNINGS[swapCurrency.address];

  return (
    <>
      <DialogTop title={`Notice for trading ${SWAP_WARNING.symbol}`} />
      <DialogBottom>
        {SWAP_WARNING.component}
        <DialogButtons>
          <Button wide onClick={onClose}>
            I understand
          </Button>
        </DialogButtons>
      </DialogBottom>
    </>
  );
};

const SwapWarning = React.memo(_SwapWarning);
export default SwapWarning;
