import CreateDeFiFundSettingsSection from "components/create-defi-fund-settings/create-defi-fund-settings-section";
import React from "react";
import { Row } from "shared/row/row";

const CreateDefiFundPage = () => {
  return (
    <>
      <Row>
        <h1>Create DeFi Fund</h1>
      </Row>
      <Row onlyOffset size={"large"}>
        <CreateDeFiFundSettingsSection />
      </Row>
    </>
  );
};

export default CreateDefiFundPage;
