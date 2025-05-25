import type { ErrorMessages } from "./request.error.js";
import type { SuccessMessage } from "./request.success.js";

export interface RequestResponseBase {
  isSuccess: boolean;
}

export interface RequestError extends RequestResponseBase {
  isSuccess: false;
  error: ErrorMessages;
}

export interface RequestSuccess extends RequestResponseBase {
  isSuccess: true;
  data: SuccessMessage;
}

export type RequestResponse = RequestError | RequestSuccess;

export interface PostcodeIOResponse {
  data: {
    status: number;
    result: { lsoa: string };
  };
}
