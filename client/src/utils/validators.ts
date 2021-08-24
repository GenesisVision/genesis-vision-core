import { FundAssetPart } from "./gv-api.types";

export const entryFeeRules = (max: number) => ({
  required: "Field is required",
  min: {
    value: 0,
    message: "Entry fee must be greater than 0 %"
  },
  max: {
    value: max,
    message: `Entry fee must be less than ${max} %`
  }
});

export const exitFeeRules = (max: number) => ({
  required: "Field is required",
  min: {
    value: 0,
    message: "Exit fee must be greater than 0 %"
  },
  max: {
    value: max,
    message: `Exit fee must be less than ${max} %`
  }
});

export const assetTitleRules = {
  required: "Title is required",
  minLength: {
    value: 4,
    message: "Title is too short"
  },
  maxLength: {
    value: 20,
    message: "Title is too long"
  },
  pattern: {
    value: /^[-a-zA-Z0-9\s]{4,20}$/,
    message: "Latin letters and numbers only."
  }
};

// спросить Руслана о паттерне
export const assetSymbolRules = {
  required: "Symbol is required",
  minLength: {
    value: 3,
    message: "Symbol is too short"
  },
  maxLength: {
    value: 5,
    message: "Symbol is too long"
  },
  pattern: {
    value: /^[-a-zA-Z0-9\s]{4,20}$/,
    message: "Latin letters and numbers only."
  }
};

export const initialTokensAmountRules = (min: number, max: number) => ({
  required: "Amount is required",
  min: {
    value: min,
    message: `Initial tokens amount must be greater than ${min}`
  },
  max: {
    value: max,
    message: `Initial tokens amount must be less than ${max}`
  }
});

export const assetsRules = {
  validate: (value: FundAssetPart[]) => {
    if (!value?.length) return "Must be at least two assets.";
    if (value.length < 2) return "Must be at least two assets.";
    if (value.reduce((acc, next) => acc + next.percent, 0) !== 100)
      return "Total share of all assets should be equal to 100%";
    return true;
  }
};
