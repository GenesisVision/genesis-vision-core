import React from "react";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import styled from "styled-components";
import { $secondaryColor } from "styles/colors";
import { mediaBreakpointLandscapePhone } from "styles/media";
import { adaptivePadding } from "styles/mixins";
import { $fontSizeH3, $paddingSmall, $paddingBig } from "styles/sizes";

const Container = styled(Row)`
  box-sizing: border-box;
`;

const LineBlock = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  & h3 {
    margin-left: ${-$fontSizeH3 / 2}px;
  }
  ${mediaBreakpointLandscapePhone(`
        display: flex;
    `)}
`;

interface LineProps {
  withBorder?: boolean;
}

const Line = styled(Row)<LineProps>`
  min-height: 30px;
  height: 100%;
  ${({ withBorder }: LineProps) =>
    withBorder && `border-left: 2px solid ${$secondaryColor};`}
  ${mediaBreakpointLandscapePhone(`
        padding-left: ${$paddingBig}px;
    `)}
`;

const ContentBlock = styled.div`
  width: 100%;
  ${adaptivePadding("bottom", $paddingSmall)}
`;

const Wrapper = styled(Row)`
  justify-content: space-between;
`;

interface OwnProps {
  hide?: boolean;
  content?: JSX.Element;
  label?: string;
  blockNumber?: string;
  withBorder?: boolean;
}

interface Props extends OwnProps, React.HTMLAttributes<HTMLDivElement> {}

const SettingsBlock: React.FC<Props> = ({
  withBorder = true,
  blockNumber,
  label,
  children
}) => (
  <Container size={!blockNumber ? "xlarge" : undefined} center={false}>
    <LineBlock>
      {blockNumber && <h3>{blockNumber}</h3>}
      <Line withBorder={withBorder} />
    </LineBlock>
    <ContentBlock>
      {label && (
        <Row>
          {label && (
            <RowItem>
              <h3>{label}</h3>
            </RowItem>
          )}
        </Row>
      )}
      <Wrapper size={"large"} wrap wide>
        {children}
      </Wrapper>
    </ContentBlock>
  </Container>
);

export default SettingsBlock;
