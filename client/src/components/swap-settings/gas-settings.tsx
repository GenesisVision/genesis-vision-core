import { Button } from "shared/button/button";
import { RowItem } from "shared/row-item/row-item";
import { GAS_PRICE, GAS_PRICE_GWEI } from "state/user/helpers";
import { useGasPriceManager } from "state/user/hooks";
import { Row } from "shared/row/row";
import { LabeledTooltipWithQuestion } from "./labeled-tooltip-with-question";

const GasSettings = () => {
  const [gasPrice, setGasPrice] = useGasPriceManager();

  return (
    <>
      <LabeledTooltipWithQuestion
        tooltipText={
          "Adjusts the gas price (transaction fee) for your transaction. Higher GWEI = higher speed = higher fees"
        }
        label={"Default Transaction Speed (GWEI)"}
      />
      <Row wrap size={"small"}>
        <RowItem bottomOffset size={"small"}>
          <Button
            size={"small"}
            onClick={() => {
              setGasPrice(GAS_PRICE_GWEI.default);
            }}
            color={
              gasPrice === GAS_PRICE_GWEI.default ? "primary" : "secondary"
            }
          >
            {`Standard (${GAS_PRICE.default})`}
          </Button>
        </RowItem>
        <RowItem bottomOffset size={"small"}>
          <Button
            size={"small"}
            onClick={() => {
              setGasPrice(GAS_PRICE_GWEI.fast);
            }}
            color={gasPrice === GAS_PRICE_GWEI.fast ? "primary" : "secondary"}
          >
            {`Fast (${GAS_PRICE.fast})`}
          </Button>
        </RowItem>
        <RowItem bottomOffset size={"small"}>
          <Button
            size={"small"}
            onClick={() => {
              setGasPrice(GAS_PRICE_GWEI.instant);
            }}
            color={
              gasPrice === GAS_PRICE_GWEI.instant ? "primary" : "secondary"
            }
          >
            {`Instant (${GAS_PRICE.instant})`}
          </Button>
        </RowItem>
      </Row>
    </>
  );
};

export default GasSettings;
