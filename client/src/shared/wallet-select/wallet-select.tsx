import React from "react";
import { CurrencySourceSelectItemType } from "shared/currency-source-select/currency-source-select-items";
import { CurrencySourceSelect as HookFormCurrencySourceSelect } from "shared/currency-source-select/hook-form-currency-source-select";
import { IUpdatableGvTextFieldProps } from "shared/gv-text-field/updatable-gv-text-field";
import { ISelectChangeEvent } from "shared/select/select";
import {
  AssetDetails,
  Currency,
  WalletBaseData,
  WalletData,
  WalletDepositData,
  WalletWithdrawalCurrencyInfo
} from "utils/gv-api.types";

export interface TransferItemType extends CurrencySourceSelectItemType {
  available: number;
}

export type ItemsType = Array<WalletItemType>;
export type WalletItemType = WalletData | WalletBaseData | TransferItemType;
export interface CommonWalletType {
  id: string;
  title?: string;
  logoUrl?: string;
  currency: Currency;
  available: number;
  depositAddresses?: Array<WalletDepositData>;
  asset?: AssetDetails;
  rate?: number;
  isWithdrawalEnabled?: boolean;
  withdrawalCommissions?: Array<WalletWithdrawalCurrencyInfo>;
}

export interface IWalletSelectProps {
  name: string;
  disabled?: boolean;
}

interface Props extends IWalletSelectProps, IUpdatableGvTextFieldProps {
  onChange?: (event: ISelectChangeEvent, child: JSX.Element) => void;
  label: string;
  items: CommonWalletType[];
}

const _HookFormWalletSelect: React.FC<Props> = ({
  onClickUpdate,
  items,
  onChange,
  label,
  name,
  disabled
}) => (
  <HookFormCurrencySourceSelect
    onClickUpdate={onClickUpdate}
    disabled={disabled}
    label={label}
    items={items}
    name={name}
    onChange={onChange}
  />
);
export const HookFormWalletSelect = React.memo(_HookFormWalletSelect);
