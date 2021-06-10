import { ReallocateFieldWrapper } from "components/reallocation/components/reallocate-field-wrapper";
import React from "react";
import useSWR from "swr";
import { GVHookFormField } from "shared/gv-hook-form-field";
import { Row } from "shared/row/row";
import { Text } from "shared/text/text";
import { assetsRules } from "utils/validators";
import { PlatformAssets } from "utils/gv-api.types";

const _AssetsField: React.FC<{ name: string }> = ({ name }) => {
  const { data } = useSWR<PlatformAssets>("/platform/trading/assets");

  if (!data) {
    return null;
  }

  return (
    <>
      <Text muted size={"small"}>
        {"There is a mandatory 1% GVT allocation per Fund"}
      </Text>
      <Row onlyOffset wide>
        <GVHookFormField
          scheduleMessage={
            "Please note that this fund will be processed when the Stock Exchange is open."
          }
          name={name}
          component={ReallocateFieldWrapper}
          assets={data.assets}
          rules={assetsRules}
        />
      </Row>
    </>
  );
};
export const AssetsField = React.memo(_AssetsField);
