import TransferForm from "components/defi-exchange/transfer-form";
import React from "react";
import { Row } from "shared/row/row";
import styled from "styled-components";

const Container = styled.div`
  width: 360px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
`;

const DefiExchangePage = () => {
  return (
    <>
      <Row>
        <h1>DeFi Exchange</h1>
      </Row>
      <Row onlyOffset size={"large"}>
        <Container>
          <TransferForm />
        </Container>
      </Row>
    </>
  );
};

export default DefiExchangePage;
