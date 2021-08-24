import React from "react";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import { SimpleNumberField } from "shared/simple-fields/simple-number-field";
import { allowPositiveValuesNumberFormat } from "utils/helpers";
import { AnyObjectType } from "utils/types";
import AssetFormField from "../asset-fields/asset-form-field";
import AssetRow from "../asset-fields/asset-row";

interface Props {
  firstFeeLabel: string;
  firstFeeUnderText: string;
  firstFeeName: string;
  firstFeeDescription: string;
  firstFeeRules?: AnyObjectType;
  secondFeeName: string;
  secondFeeLabel: string;
  secondFeeUnderText: string;
  secondFeeDescription: string;
  secondFeeRules?: AnyObjectType;
  title?: string;
}

const _FeesSettings: React.FC<Props> = ({
  title,
  firstFeeLabel,
  firstFeeUnderText,
  firstFeeName,
  firstFeeDescription,
  firstFeeRules,
  secondFeeName,
  secondFeeLabel,
  secondFeeUnderText,
  secondFeeDescription,
  secondFeeRules
}) => {
  return (
    <div>
      {title && (
        <Row>
          <h3>{title}</h3>
        </Row>
      )}
      <AssetRow>
        <RowItem>
          <AssetFormField
            wide
            name={firstFeeName}
            label={firstFeeLabel}
            adornment="%"
            component={SimpleNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={firstFeeDescription}
            hintContent={firstFeeUnderText}
            rules={firstFeeRules}
          />
        </RowItem>
        <RowItem>
          <AssetFormField
            wide
            name={secondFeeName}
            label={secondFeeLabel}
            adornment="%"
            component={SimpleNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={secondFeeDescription}
            hintContent={secondFeeUnderText}
            rules={secondFeeRules}
          />
        </RowItem>
      </AssetRow>
    </div>
  );
};

const FeesSettings = React.memo(_FeesSettings);
export default FeesSettings;
