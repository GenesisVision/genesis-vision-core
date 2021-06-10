import AppLayout from "components/app-layout/app-layout";
import CreateDeFiFundSettingsSection from "components/create-defi-fund-settings/create-defi-fund-settings-section";
import React from "react";
import { Row } from "shared/row/row";

const App = () => {
  return (
    <AppLayout>
      <Row>
        <h1>Create DeFi Fund</h1>
      </Row>
      <Row onlyOffset size={"large"}>
        <CreateDeFiFundSettingsSection />
      </Row>
    </AppLayout>
  );
};

export default App;
