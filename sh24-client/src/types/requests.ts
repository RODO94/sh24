import type { ErrorMessages } from "./request.error";
import type { SuccessMessage } from "./request.success";

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
