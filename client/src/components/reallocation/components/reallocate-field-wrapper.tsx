import React, { useCallback } from "react";
import useSWR from "swr";
import { PlatformAssets } from "utils/gv-api.types";
import ReallocateField, { IReallocateFieldProps } from "./reallocate-field";

const _ReallocateFieldWrapper: React.FC<Props> = props => {
  const { setFieldValue, name } = props;

  const { data: platformAssets } = useSWR<PlatformAssets>(
    "/platform/trading/assets"
  );

  const onChange = useCallback(
    (e: any) => {
      setFieldValue(name, e.target.value, true);
    },
    [setFieldValue]
  );

  if (!platformAssets) return null;
  const { assets, providers } = platformAssets;

  return (
    <ReallocateField
      {...props}
      assets={assets}
      providers={providers}
      onChange={onChange}
    />
  );
};

interface Props extends IReallocateFieldProps {
  [key: string]: any;
}

export const ReallocateFieldWrapper = React.memo(_ReallocateFieldWrapper);
