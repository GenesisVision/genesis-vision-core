// import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
// import DepositDetailsBlock from "components/assets/fields/deposit-details-block";
// import DescriptionBlock from "components/assets/fields/description-block";
// import FeesSettings from "components/assets/fields/fees-settings";
// import { IImageValue } from "components/form/input-image/input-image";
// import { Row } from "components/row/row";
// import SettingsBlock from "components/settings-block/settings-block";
// import { ASSET } from "constants/constants";
import CreateAssetNavigation from "components/assets/fields/create-asset-navigation";
import DescriptionBlock from "components/assets/fields/description-block";
import FeesSettings from "components/assets/fields/fees-settings";
import React from "react";
import { useForm } from "react-hook-form";
import { Row } from "shared/row/row";
import SettingsBlock from "shared/settings-block/settings-block";
import { FundCreateAssetPlatformInfo } from "utils/gv-api.types";
import { HookForm } from "utils/hook-form.helpers";

import { entryFeeRules, exitFeeRules } from "utils/validators";
import { AssetsField } from "./assets-field";
// import { safeGetElemFromArray } from "utils/helpers";

export enum CREATE_DEFI_FUND_FIELDS {
  entryFee = "entryFee",
  symbol = "symbol",
  title = "title",
  exitFee = "exitFee",
  assets = "assets",
  initialTokensAmount = "initialTokensAmount"
}

interface Props {
  errorMessage?: string;
  // wallets: WalletData[];
  createFundInfo: FundCreateAssetPlatformInfo;
  onSubmit: (values: ICreateDeFiFundSettingsFormValues) => void;
}

const _CreateDeFiFundSettings: React.FC<Props> = ({
  createFundInfo,
  errorMessage,
  onSubmit
}) => {
  const { maxExitFee, maxEntryFee, minDeposit } = createFundInfo;

  const form = useForm<ICreateDeFiFundSettingsFormValues>({
    defaultValues: {
      [CREATE_DEFI_FUND_FIELDS.entryFee]: undefined,
      [CREATE_DEFI_FUND_FIELDS.exitFee]: undefined
    },
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <SettingsBlock label={"Main settings"} blockNumber={"01"}>
        <DescriptionBlock
          titleName={CREATE_DEFI_FUND_FIELDS.title}
          symbolName={CREATE_DEFI_FUND_FIELDS.symbol}
          initialTokensAmountName={CREATE_DEFI_FUND_FIELDS.initialTokensAmount}
        />
      </SettingsBlock>
      <SettingsBlock label={"Asset selection"} blockNumber={"02"}>
        <AssetsField name={CREATE_DEFI_FUND_FIELDS.assets} />
      </SettingsBlock>
      <SettingsBlock label={"Fees settings"} blockNumber={"03"}>
        <FeesSettings
          firstFeeLabel={"Entry fee"}
          firstFeeUnderText={"Description about entry fee is here"}
          firstFeeName={CREATE_DEFI_FUND_FIELDS.entryFee}
          firstFeeDescription={`An entry fee is a fee charged to investors upon their investment to a GV Fund. The maximum entry fee is ${maxEntryFee} %`}
          firstFeeRules={entryFeeRules(maxEntryFee)}
          secondFeeName={CREATE_DEFI_FUND_FIELDS.exitFee}
          secondFeeLabel={"Exit fee"}
          secondFeeUnderText={"Description about exit fee is here"}
          secondFeeDescription={`An exit fee is a fee charged to investors when they redeem shares from a GV Fund. The maximum exit fee is ${maxExitFee} %`}
          secondFeeRules={exitFeeRules(maxExitFee)}
        />
      </SettingsBlock>
      {/* <DepositDetailsBlock
        blockNumber={selfManaged ? 3 : 4}
        walletFieldName={CREATE_DEFI_FUND_FIELDS.depositWalletId}
        inputName={CREATE_DEFI_FUND_FIELDS.depositAmount}
        depositAmount={depositAmount}
        minimumDepositAmount={minDeposit}
        setFieldValue={setValue}
        assetCurrency={FUND_CURRENCY}
      /> */}
      <Row size={"large"}>
        <CreateAssetNavigation isSuccessful={!errorMessage} />
      </Row>
    </HookForm>
  );
};

export interface ICreateDeFiFundSettingsFormValues {
  [CREATE_DEFI_FUND_FIELDS.symbol]: string;
  [CREATE_DEFI_FUND_FIELDS.title]: string;
  [CREATE_DEFI_FUND_FIELDS.assets]: Array<any>;
  [CREATE_DEFI_FUND_FIELDS.entryFee]?: number;
  [CREATE_DEFI_FUND_FIELDS.exitFee]?: number;
  [CREATE_DEFI_FUND_FIELDS.initialTokensAmount]?: number;
}

const CreateDeFiFundSettings = React.memo(_CreateDeFiFundSettings);
export default CreateDeFiFundSettings;
