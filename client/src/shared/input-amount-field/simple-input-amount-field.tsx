import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";
import { NumberFormatValues } from "react-number-format";
import { Button } from "shared/button/button";
import { Row } from "shared/row/row";
import {
  ISimpleNumberFieldProps,
  SimpleNumberField
} from "shared/simple-fields/simple-number-field";
import { SizesType } from "utils/types";

const _SimpleInputAmountField: React.FC<ISimpleInputAmountFieldProps> = ({
  disabled,
  hide,
  externalDirty: externalDirtyProp,
  setMin,
  wide = true,
  autoFocus = true,
  label,
  currency,
  setMax,
  size = "large",
  ...props
}) => {
  const [externalDirty, setExternalDirty] = useIsOpen(externalDirtyProp);
  const handleSet = useCallback(
    (callback: VoidFunction) => () => {
      callback();
      setExternalDirty();
    },
    []
  );
  return (
    <Row size={size} hide={hide} wide={wide}>
      <SimpleNumberField
        {...props}
        disabled={disabled}
        externalDirty={externalDirty}
        wide={wide}
        autoFocus={autoFocus}
        label={label || "Amount"}
        autoComplete="off"
        suffix={` ${currency}`}
        allowNegative={false}
        adornment={
          <>
            {setMin && (
              <Button
                disabled={disabled}
                noPadding
                onClick={handleSet(setMin)}
                variant="text"
                color="secondary"
              >
                Min
              </Button>
            )}
            {setMin && setMax && <>&nbsp;|&nbsp;</>}
            {setMax && (
              <Button
                disabled={disabled}
                noPadding
                onClick={handleSet(setMax)}
                variant="text"
                color="secondary"
              >
                Max
              </Button>
            )}
          </>
        }
      />
    </Row>
  );
};

export interface ISimpleInputAmountFieldProps extends ISimpleNumberFieldProps {
  hide?: boolean;
  wide?: boolean;
  size?: SizesType;
  name: string;
  label?: React.ReactNode;
  currency: string;
  placeholder?: string;
  isAllowed?: (values: NumberFormatValues) => boolean;
  setMax?(): void;
  setMin?(): void;
  autoFocus?: boolean;
  emptyInit?: boolean;
  disabled?: boolean;
}

const SimpleInputAmountField = React.memo(_SimpleInputAmountField);
export default SimpleInputAmountField;
