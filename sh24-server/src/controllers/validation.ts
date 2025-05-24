import { LSOA_ALLOW_LIST } from "../logic/allowLists.js";

export const checkIfPostcodeIsInLsoa = (lsoa: string) =>
  LSOA_ALLOW_LIST.find((allowedLsoa) => allowedLsoa === lsoa);

export const checkIfPostcodeIsAllowed = (postcode: string) =>
  LSOA_ALLOW_LIST.find((allowedPostcode) => allowedPostcode === postcode);
