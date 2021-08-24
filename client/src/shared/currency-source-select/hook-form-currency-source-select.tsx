import React from "react";
import { GVHookFormField } from "shared/gv-hook-form-field";
import GVTextField from "shared/gv-text-field";
import { IUpdatableGvTextFieldProps } from "shared/gv-text-field/updatable-gv-text-field";
import Select, { ISelectChangeEvent } from "shared/select/select";
import {
  CurrencySourceSelectItemsType,
  getCurrencySourceSelectItems
} from "./currency-source-select-items";

interface Props extends IUpdatableGvTextFieldProps {
  items: CurrencySourceSelectItemsType;
  label: string;
  name: string;
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  disabled?: boolean;
}

const _CurrencySourceSelect: React.FC<Props> = ({
  onClickUpdate,
  disabled,
  items,
  onChange,
  label,
  name
}) => {
  return (
    <GVHookFormField
      onClickUpdate={onClickUpdate}
      disableIfSingle
      wide
      disabled={disabled}
      name={name}
      component={GVTextField}
      label={label}
      InputComponent={Select}
      onChange={onChange}
    >
      {items && getCurrencySourceSelectItems(items)}
    </GVHookFormField>
  );
};

export const CurrencySourceSelect = React.memo(_CurrencySourceSelect);
