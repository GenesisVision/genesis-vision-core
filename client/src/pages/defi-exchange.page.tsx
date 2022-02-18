import TransferContainer from "components/defi-exchange/swap.container";
import { Row } from "shared/row/row";
import styled from "styled-components";
import { mediaBreakpointLandscapePhone } from "styles/media";

const Container = styled.div`
  width: 280px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  ${mediaBreakpointLandscapePhone(`
    width: 360px;
  `)}
`;

const DefiExchangePage = () => {
  return (
    <>
      <Row>
        <h1>DeFi Exchange</h1>
      </Row>
      <Row onlyOffset size={"large"}>
        <Container>
          <TransferContainer />
        </Container>
      </Row>
    </>
  );
};

export default DefiExchangePage;
