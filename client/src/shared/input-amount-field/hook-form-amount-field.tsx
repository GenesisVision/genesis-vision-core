import * as React from "react";
import { GVHookFormField } from "shared/gv-hook-form-field";
import SimpleInputAmountField, {
  ISimpleInputAmountFieldProps
} from "./simple-input-amount-field";

const _HookFormAmountField: React.FC<Props> = props => {
  return <GVHookFormField {...props} component={SimpleInputAmountField} />;
};

interface Props extends ISimpleInputAmountFieldProps {}

const HookFormAmountField = React.memo(_HookFormAmountField);
export default HookFormAmountField;
