import { useState } from "react";
import { Button } from "shared/button/button";
import GVTextField from "shared/gv-text-field";
import { RowItem } from "shared/row-item/row-item";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import {
  useUserSlippageTolerance,
  useUserTransactionTTL
} from "state/user/hooks";
import styled from "styled-components";
import { escapeRegExp } from "utils";
import { LabeledTooltipWithQuestion } from "./labeled-tooltip-with-question";

enum SlippageError {
  InvalidInput = "InvalidInput",
  RiskyLow = "RiskyLow",
  RiskyHigh = "RiskyHigh"
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

const CustomButton = styled(Button)`
  font-size: 13px;
  width: 60px;
  height: 25px;
`;

export const TransactionSettings = () => {
  const [userSlippageTolerance, setUserSlippageTolerance] =
    useUserSlippageTolerance();
  const [ttl, setTtl] = useUserTransactionTTL();
  const [slippageInput, setSlippageInput] = useState("");
  const [deadlineInput, setDeadlineInput] = useState("");

  const slippageInputIsValid =
    slippageInput === "" ||
    (userSlippageTolerance / 100).toFixed(2) ===
      Number.parseFloat(slippageInput).toFixed(2);

  let slippageError: SlippageError | undefined;
  if (slippageInput !== "" && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput;
  } else if (slippageInputIsValid && userSlippageTolerance < 50) {
    slippageError = SlippageError.RiskyLow;
  } else if (slippageInputIsValid && userSlippageTolerance > 500) {
    slippageError = SlippageError.RiskyHigh;
  } else {
    slippageError = undefined;
  }

  const parseCustomSlippage = (value: string) => {
    if (value === "" || inputRegex.test(escapeRegExp(value))) {
      setSlippageInput(value);

      try {
        const valueAsIntFromRoundedFloat = Number.parseInt(
          (Number.parseFloat(value) * 100).toString()
        );
        if (
          !Number.isNaN(valueAsIntFromRoundedFloat) &&
          valueAsIntFromRoundedFloat < 5000
        ) {
          setUserSlippageTolerance(valueAsIntFromRoundedFloat);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const parseCustomDeadline = (value: string) => {
    setDeadlineInput(value);

    try {
      const valueAsInt: number = Number.parseInt(value) * 60;
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setTtl(valueAsInt);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <LabeledTooltipWithQuestion
          tooltipText={
            "Setting a high slippage tolerance can help transactions succeed, but you may not get such a good price. Use with caution."
          }
          label={"Slippage Tolerance"}
        />
      </Row>
      <Row wrap size={"small"}>
        <RowItem size={"small"}>
          <CustomButton
            onClick={() => {
              setSlippageInput("");
              setUserSlippageTolerance(10);
            }}
            size={"xsmall"}
            color={userSlippageTolerance === 10 ? "primary" : "secondary"}
          >
            0.1%
          </CustomButton>
        </RowItem>
        <RowItem size={"small"}>
          <CustomButton
            onClick={() => {
              setSlippageInput("");
              setUserSlippageTolerance(50);
            }}
            size={"xsmall"}
            color={userSlippageTolerance === 50 ? "primary" : "secondary"}
          >
            0.5%
          </CustomButton>
        </RowItem>
        <RowItem size={"small"}>
          <CustomButton
            onClick={() => {
              setSlippageInput("");
              setUserSlippageTolerance(100);
            }}
            size={"xsmall"}
            color={userSlippageTolerance === 100 ? "primary" : "secondary"}
          >
            1.0%
          </CustomButton>
        </RowItem>
        <RowItem style={{ width: "50px", marginLeft: "auto" }}>
          <GVTextField
            inputMode="decimal"
            pattern="^[0-9]*[.,]?[0-9]{0,2}$"
            placeholder={(userSlippageTolerance / 100).toFixed(2)}
            value={slippageInput}
            onBlur={() => {
              parseCustomSlippage((userSlippageTolerance / 100).toFixed(2));
            }}
            onChange={event => {
              if (event.target.validity.valid) {
                parseCustomSlippage(event.target.value.replace(/,/g, "."));
              }
            }}
            incorrect={!slippageInputIsValid}
            correct={![10, 50, 100].includes(userSlippageTolerance)}
          />
        </RowItem>
      </Row>
      {!!slippageError && (
        <Row size={"small"}>
          <Text
            color={
              slippageError === SlippageError.InvalidInput ? "red" : "yellow"
            }
          >
            {slippageError === SlippageError.InvalidInput
              ? "Enter a valid slippage percentage"
              : slippageError === SlippageError.RiskyLow
              ? "Your transaction may fail"
              : "Your transaction may be frontrun"}
          </Text>
        </Row>
      )}
      <Row style={{ justifyContent: "space-between" }}>
        <LabeledTooltipWithQuestion
          tooltipText={
            "Your transaction will revert if it is left confirming for longer than this time."
          }
          label={"Tx deadline (mins)"}
        />
        <div style={{ width: "50px" }}>
          <GVTextField
            maxLength={10}
            inputMode="numeric"
            pattern="^[0-9]+$"
            onBlur={() => {
              parseCustomDeadline((ttl / 60).toString());
            }}
            placeholder={(ttl / 60).toString()}
            value={deadlineInput}
            onChange={event => {
              if (event.target.validity.valid) {
                parseCustomDeadline(event.target.value);
              }
            }}
          />
        </div>
      </Row>
    </>
  );
};
