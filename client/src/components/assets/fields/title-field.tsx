import React from "react";
import { SimpleTextField } from "shared/simple-fields/simple-text-field";
import { assetTitleRules } from "utils/validators";
import AssetField from "../asset-fields/asset-field";
import AssetFormField from "../asset-fields/asset-form-field";

interface Props {
  name: string;
}

const _TitleField: React.FC<Props> = ({ name }) => {
  return (
    <AssetField>
      <AssetFormField
        wide
        type="text"
        name={name}
        label={"Name"}
        component={SimpleTextField}
        caption={"Requirement from 4 to 20 symbols"}
        rules={assetTitleRules}
      />
    </AssetField>
  );
};

const TitleField = React.memo(_TitleField);
export default TitleField;
