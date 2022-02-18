export enum ALERT_MESSAGE {
  SUCCESS = "ALERT_MESSAGE_SUCCESS",
  WARNING = "ALERT_MESSAGE_WARNING",
  ERROR = "ALERT_MESSAGE_ERROR"
}

export type IMessage = {
  type?: ALERT_MESSAGE;
  id?: string;
  text?: string;
};
