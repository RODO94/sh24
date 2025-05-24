import {
  LSOA_ALLOW_LIST,
  POSTCODE_ALLOW_LIST,
} from "../../logic/allowLists.js";
import { RequestResponse } from "../../types/requests.js";
import { transfromAndSantitisePostcode } from "./transformations.js";
import { z } from "zod/v4";

export const checkIfPostcodeIsInLsoa = (lsoa: string) =>
  LSOA_ALLOW_LIST.find(
    (allowedLsoa) => allowedLsoa.toLowerCase() === lsoa.toLowerCase()
  );

export const checkIfPostcodeIsAllowed = (postcode: string) =>
  POSTCODE_ALLOW_LIST.find(
    (allowedPostcode) =>
      transfromAndSantitisePostcode(allowedPostcode) ===
      transfromAndSantitisePostcode(postcode)
  );

export function checkIfAllowedServiceArea(lsoa: string, postcode: string) {
  const serviceArea = lsoa.split(" ").slice(0, -1).join(" ");
  const isAllowedServiceArea = checkIfPostcodeIsInLsoa(serviceArea);

  if (!isAllowedServiceArea) {
    const errorResponse: RequestResponse = {
      isSuccess: false,
      error: {
        type: "input",
        message: `'${postcode}' is in ${serviceArea} which is not an allowed service area. Enter another postcode`,
      },
    };
    return errorResponse;
  }

  return true;
}

export function checkAndValidatePostcode(postcode: string) {
  const transformedPostcode = transfromAndSantitisePostcode(postcode);

  const validatedPostcode = z
    .string()
    .min(5)
    .max(7)
    .safeParse(transformedPostcode);

  if (!validatedPostcode.success) {
    const errorResponse: RequestResponse = {
      isSuccess: false,
      error: {
        type: "zod",
        message: `'${postcode}' is in an invalid format. Enter a postcode similar to AA12 3BC`,
      },
    };
    return errorResponse;
  }

  return transformedPostcode;
}
