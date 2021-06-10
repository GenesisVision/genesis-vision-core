import React from "react";
import { SimpleNumberField } from "shared/simple-fields/simple-number-field";
import { initialTokensAmountRules } from "utils/validators";
import AssetField from "../asset-fields/asset-field";
import AssetFormField from "../asset-fields/asset-form-field";

interface Props {
  name: string;
}

const _InitialTokensAmountField: React.FC<Props> = ({ name }) => {
  return (
    <AssetField>
      <AssetFormField
        wide
        name={name}
        label={"Initial tokens amount"}
        caption={"Starting price of your fund in USD"}
        component={SimpleNumberField}
        rules={initialTokensAmountRules(10, 1000000)}
      />
    </AssetField>
  );
};

const InitialTokensAmountField = React.memo(_InitialTokensAmountField);
export default InitialTokensAmountField;
