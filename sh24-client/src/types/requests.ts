import type { ErrorMessages } from "./Error";
import type { SuccessMessage } from "./Success";

export interface RequestResponseBase {
  isSuccess: boolean;
}

export interface RequestError extends RequestResponseBase {
  isSuccess: false;
  error: ErrorMessages;
}

export interface RequestSuccess extends RequestResponseBase {
  isSuccess: false;
  success: SuccessMessage;
}

export type RequestResponse = RequestError | RequestSuccess;
