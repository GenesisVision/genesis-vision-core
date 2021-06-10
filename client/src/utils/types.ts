export type SizesType =
  | "zero"
  | "xsmall"
  | "small"
  | "middle"
  | "large"
  | "xlarge"
  | "xxlarge";

export interface Sizeable {
  size?: SizesType;
}

export type AnyObjectType = { [keys: string]: any };

export interface Clickable {
  onClick: (values?: any) => void;
}

export type OptionalClickable = Partial<Clickable>;
