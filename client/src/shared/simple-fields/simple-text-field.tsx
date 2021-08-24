import React from "react";
import { GVTextFieldProps } from "shared/gv-text-field/gv-text-field.styles";
import { SimpleField } from "./simple-field";

const _SimpleTextField: React.FC<ISimpleTextFieldProps> = props => {
  return (
    <SimpleField
      {...props}
      valueCallback={({ target: { value } }: React.ChangeEvent<any>) => value}
    />
  );
};

export interface ISimpleTextFieldProps extends GVTextFieldProps {
  triggerValidation: (name: string) => void;
  validateOnInput?: boolean;
  setFieldValue?: (name: string, value?: any, validate?: boolean) => void;
  [key: string]: any;
}

export const SimpleTextField = React.memo(_SimpleTextField);
