import React from "react";
import useSWR from "swr";
import CreateDeFiFundSettings, {
  ICreateDeFiFundSettingsFormValues,
} from "./create-defi-fund-settings";

const _CreateDeFiFundSettingsSection: React.FC = () => {
  const { data } = useSWR("/platform/info");

  const handleCreate = (data: ICreateDeFiFundSettingsFormValues) =>
    console.log(data);

  const errorMessage = "";

  if (!data) {
    return null;
  }

  return (
    <CreateDeFiFundSettings
      errorMessage={errorMessage}
      //   wallets={wallets}
      createFundInfo={data.assetInfo.fundInfo.createFundInfo}
      onSubmit={handleCreate}
    />
  );
};

const CreateDeFiFundSettingsSection = React.memo(
  _CreateDeFiFundSettingsSection
);
export default CreateDeFiFundSettingsSection;
