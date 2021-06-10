import React from "react";
import { AnyObjectType } from "utils/types";

import { Center } from "shared/center/center";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import { RowItem } from "shared/row-item/row-item";
import { TextInputValues } from "shared/text-input-component/text-input-component";
import { GVHookFormField } from "shared/gv-hook-form-field";
import GVProgramPeriod from "shared/gv-program-period";
import { VERTICAL_POPOVER_POS } from "shared/popover/popover";
import Hint from "shared/hint/hint";
import styled from "styled-components";

const Caption = styled(Row)`
  height: 21px;
  justify-content: space-between;
`;

const StyledHint = styled(Hint)`
  width: 100%;
`;

interface Props {
  wide?: boolean;
  isAllowed?: (values: TextInputValues) => boolean;
  max?: number;
  value?: string | null;
  hintContent?: string;
  hintTooltipContent?: string;
  adornment?: string;
  type?: string;
  caption?: string;
  component: React.ComponentType<any>;
  label: string;
  name: string;
  disabled?: boolean;
  rules?: AnyObjectType;
}

export const _AssetFormField: React.FC<
  React.HTMLAttributes<HTMLDivElement> & Props
> = ({
  rules,
  wide,
  isAllowed,
  max = 500,
  value,
  name,
  label,
  component,
  caption,
  adornment,
  type,
  hintContent,
  hintTooltipContent,
  disabled,
}) => {
  const trimmedLength = (typeof value === "string" ? value : "").trim().length;
  return (
    <div>
      <GVHookFormField
        showCorrect
        wide={wide}
        isAllowed={isAllowed}
        adornment={adornment}
        type={type}
        name={name}
        label={label}
        autoComplete="off"
        component={component}
        disabled={disabled}
        rules={rules}
      />
      {caption && (
        <Caption>
          <Text muted size={"small"}>
            {caption}
          </Text>
          {trimmedLength > 0 && (
            <Center>
              <RowItem size={"small"}>
                <Text>{trimmedLength}</Text>
              </RowItem>
              <GVProgramPeriod
                start={0}
                end={max}
                value={trimmedLength}
                variant="pie"
              />
            </Center>
          )}
        </Caption>
      )}
      {hintContent && (
        <Row>
          <Text muted size={"small"}>
            <StyledHint
              content={hintContent}
              vertical={VERTICAL_POPOVER_POS.BOTTOM}
              tooltipContent={hintTooltipContent}
            />
          </Text>
        </Row>
      )}
    </div>
  );
};

const AssetFormField = React.memo(_AssetFormField);
export default AssetFormField;
