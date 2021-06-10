import React from "react";
import { SimpleTextField } from "shared/simple-fields/simple-text-field";
import { assetSymbolRules } from "utils/validators";
import AssetField from "../asset-fields/asset-field";
import AssetFormField from "../asset-fields/asset-form-field";

interface Props {
  name: string;
}

const _SymbolField: React.FC<Props> = ({ name }) => {
  return (
    <AssetField>
      <AssetFormField
        wide
        type="text"
        name={name}
        label={"Symbol"}
        component={SimpleTextField}
        caption={"Requirement from 3 to 5 symbols"}
        rules={assetSymbolRules}
      />
    </AssetField>
  );
};

const SymbolField = React.memo(_SymbolField);
export default SymbolField;
