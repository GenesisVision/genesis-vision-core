import React from "react";
import { Button } from "shared/button/button";
import GVTextField from "shared/gv-text-field";
import { escapeRegExp } from "utils";

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const Input = React.memo(function InnerInput({
  value,
  onUserInput,
  onMax,
  ...rest
}: {
  value: string | number;
  onUserInput: (input: string) => void;
  onMax?: () => void;
} & Omit<React.HTMLProps<HTMLInputElement>, "ref" | "onChange" | "as">) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };

  return (
    // dont pay attention to the component's name
    <GVTextField
      {...rest}
      wide
      value={value}
      onChange={event => {
        // replace commas with periods, because we exclusively uses period as the decimal separator
        enforcer(event.target.value.replace(/,/g, "."));
      }}
      // universal input options
      inputMode="decimal"
      title={"Token Amount"}
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      minLength={1}
      maxLength={79}
      spellCheck="false"
      adornment={
        <>
          {onMax && (
            <Button noPadding onClick={onMax} variant="text" color="secondary">
              Max
            </Button>
          )}
        </>
      }
    />
  );
});

export default Input;
