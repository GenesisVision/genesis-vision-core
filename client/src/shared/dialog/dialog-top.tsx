import { CurrencyInputHeader } from "components/currency-input-header/currency-input-header";
import * as React from "react";
import { PopoverContentCardBlock } from "shared/popover/popover-card.block";
import { Row } from "shared/row/row";
import styled from "styled-components";
import { adaptivePadding, fontSize } from "styles/mixins";
import { $fontSizeCommon, $paddingXsmall } from "styles/sizes";

interface Props {
  title?: string | JSX.Element;
  subtitle?: string | JSX.Element;
  includeSwapHeader?: boolean;
}

const Subtitle = styled(Row)`
  ${fontSize($fontSizeCommon)};
  font-weight: 400;
  letter-spacing: 0.4px;
  color: #e8eff3;
`;

const Container = styled.div`
  ${adaptivePadding("top", $paddingXsmall)};
`;

export const DialogTop: React.FC<React.HTMLAttributes<HTMLDivElement> & Props> =
  ({ title, subtitle, children, includeSwapHeader }) => (
    <PopoverContentCardBlock dark size={"large"} fixed>
      <Container>
        {title && (
          <Row style={{ justifyContent: "space-between" }}>
            <h2>{title}</h2>
            {includeSwapHeader && <CurrencyInputHeader />}
          </Row>
        )}
        {subtitle && <Subtitle size={"small"}>{subtitle}</Subtitle>}
      </Container>
      {children}
    </PopoverContentCardBlock>
  );
