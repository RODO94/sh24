import type { ErrorMessages } from "./error.js";
import type { SuccessMessage } from "./success.js";

export interface RequestResponseBase {
  isSuccess: boolean;
}

export interface RequestError extends RequestResponseBase {
  isSuccess: false;
  error: ErrorMessages;
}

export interface RequestSuccess extends RequestResponseBase {
  isSuccess: true;
  success: SuccessMessage;
}

export type RequestResponse = RequestError | RequestSuccess;
