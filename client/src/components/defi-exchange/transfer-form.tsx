import { useForm } from "react-hook-form";
import { HookForm } from "utils/hook-form.helpers";
import React from "react";

import { Row } from "shared/row/row";
import { DialogTop } from "shared/dialog/dialog-top";
import { DialogBottom } from "shared/dialog/dialog-bottom";
import { DialogButtons } from "shared/dialog/dialog-buttons";
import { SubmitButton } from "shared/submit-button/submit-button";
import { HookFormWalletSelect } from "shared/wallet-select/wallet-select";

const _TransferForm: React.FC = () => {
  const form = useForm({
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={() => {}}>
      <DialogTop title={"Defi exchange"}>
        <Row size={"large"}>
          <HookFormWalletSelect
            onClickUpdate={() => {}}
            name={"name"}
            label={"From"}
            items={[
              {
                id: "b07bf947-9343-4d1c-93ba-0aa1509c7265",
                title: "Genesis Vision Token",
                logoUrl:
                  "https://red-s3.genesis.vision/img/orgn/443a516c-0e38-433b-ba67-80bb78d0a708.png",
                currency: "GVT",
                available: 2867.3025
              },
              {
                id: "e1428b60-06f4-755f-6114-b0ad05f8c2bf",
                title: "Binance Coin",
                logoUrl:
                  "https://red-s3.genesis.vision/img/orgn/8b298a5a-d723-440e-8001-dd7f28c66a8b.png",
                currency: "BNB",
                available: 0.4912
              },
              {
                id: "68623450-fe0a-4fdc-bacf-d962cb7cd25a",
                title: "Bitcoin",
                logoUrl:
                  "https://red-s3.genesis.vision/img/orgn/8a795484-a948-4717-90a7-958899888596.png",
                currency: "BTC",
                available: 0.0002119
              },
              {
                id: "d5964a6f-1a90-dd9a-37e4-c2dc556b723d",
                title: "DAI",
                logoUrl:
                  "https://red-s3.genesis.vision/img/opt/bd67bd93-79ea-4dac-84d6-40cc6b07e587.png",
                currency: "DAI",
                available: 4728.0517
              },
              {
                id: "8d25983d-cbed-4ebc-808d-f36e905c607d",
                title: "Ethereum",
                logoUrl:
                  "https://red-s3.genesis.vision/img/orgn/c1191151-bc6b-4870-a9c1-cb09d194966b.png",
                currency: "ETH",
                available: 2.0091295
              },
              {
                id: "840b7398-5bb0-0c94-2930-dbdc7a03158c",
                title: "USD Coin",
                logoUrl:
                  "https://red-s3.genesis.vision/img/opt/beebbbf5-37c6-47d5-b09c-d75fc0ec0980.png",
                currency: "USDC",
                available: 530.1596
              },
              {
                id: "9f231159-2e34-40e9-a512-5a816c58608e",
                title: "Tether",
                logoUrl:
                  "https://red-s3.genesis.vision/img/orgn/754bf998-3e8b-41fe-9183-66898571f72e.png",
                currency: "USDT",
                available: 23658.1348
              }
            ]}
            onChange={() => {}}
          />

          {/* <TransferSelectField
            onClickUpdate={sourceType === "Wallet" ? updateWallets : undefined}
            currency={selectedSourceItem.currency}
            name={TRANSFER_FORM_FIELDS.sourceId}
            value={formattedAvailableSourceItem}
            label={t("transfer:from")}
            onChange={onChangeSourceId}
            items={sourceItems}
            sourceType={sourceType}
          /> */}
        </Row>
      </DialogTop>
      <DialogBottom>
        <HookFormWalletSelect
          onClickUpdate={() => {}}
          name={"name"}
          label={"To"}
          items={[
            {
              id: "b07bf947-9343-4d1c-93ba-0aa1509c7265",
              title: "Genesis Vision Token",
              logoUrl:
                "https://red-s3.genesis.vision/img/orgn/443a516c-0e38-433b-ba67-80bb78d0a708.png",
              currency: "GVT",
              available: 2867.3025
            },
            {
              id: "e1428b60-06f4-755f-6114-b0ad05f8c2bf",
              title: "Binance Coin",
              logoUrl:
                "https://red-s3.genesis.vision/img/orgn/8b298a5a-d723-440e-8001-dd7f28c66a8b.png",
              currency: "BNB",
              available: 0.4912
            },
            {
              id: "68623450-fe0a-4fdc-bacf-d962cb7cd25a",
              title: "Bitcoin",
              logoUrl:
                "https://red-s3.genesis.vision/img/orgn/8a795484-a948-4717-90a7-958899888596.png",
              currency: "BTC",
              available: 0.0002119
            },
            {
              id: "d5964a6f-1a90-dd9a-37e4-c2dc556b723d",
              title: "DAI",
              logoUrl:
                "https://red-s3.genesis.vision/img/opt/bd67bd93-79ea-4dac-84d6-40cc6b07e587.png",
              currency: "DAI",
              available: 4728.0517
            },
            {
              id: "8d25983d-cbed-4ebc-808d-f36e905c607d",
              title: "Ethereum",
              logoUrl:
                "https://red-s3.genesis.vision/img/orgn/c1191151-bc6b-4870-a9c1-cb09d194966b.png",
              currency: "ETH",
              available: 2.0091295
            },
            {
              id: "840b7398-5bb0-0c94-2930-dbdc7a03158c",
              title: "USD Coin",
              logoUrl:
                "https://red-s3.genesis.vision/img/opt/beebbbf5-37c6-47d5-b09c-d75fc0ec0980.png",
              currency: "USDC",
              available: 530.1596
            },
            {
              id: "9f231159-2e34-40e9-a512-5a816c58608e",
              title: "Tether",
              logoUrl:
                "https://red-s3.genesis.vision/img/orgn/754bf998-3e8b-41fe-9183-66898571f72e.png",
              currency: "USDT",
              available: 23658.1348
            }
          ]}
          onChange={() => {}}
        />
        {/* <TransferSelectField
          onClickUpdate={
            destinationType === "Wallet" ? updateWallets : undefined
          }
          currency={selectedDestinationItem.currency}
          name={TRANSFER_FORM_FIELDS.destinationId}
          value={formattedAvailableDestinationItem}
          label={t("transfer:to")}
          onChange={onChangeDestinationId}
          items={destinationItemsWithoutCurrent}
          sourceType={destinationType}
        /> */}
        {/* <InputAmountField
          name={TRANSFER_FORM_FIELDS.amount}
          label={t("transfer:amount")}
          currency={selectedSourceItem.currency}
          setMax={setMax}
          isAllowed={isAmountAllow(sourceItems, sourceId)}
          rules={amountRules({
            t,
            available,
            currency
          })}
        /> */}
        {/* {!!amount &&
          selectedDestinationItem.currency !== selectedSourceItem.currency && (
            <Row>
              <span>{`≈ ${formatCurrencyValue(
                +amount / rate,
                selectedDestinationItem.currency
              )} ${selectedDestinationItem.currency}`}</span>
            </Row>
          )} */}
        {/* {errorMessage && <FormError error={errorMessage} />} */}
        <DialogButtons>
          <SubmitButton wide isSuccessful={!"errorMessage"}>
            Connect wallet
          </SubmitButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

const TransferForm = React.memo(_TransferForm);
export default TransferForm;
