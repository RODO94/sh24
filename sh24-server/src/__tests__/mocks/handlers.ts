import { http, HttpResponse } from "msw";
import { postcodeIoUrl } from "../../index.js";
import { southwarkAPIResponse, southwarkPostcode } from "./southwark.js";
import {
  lambethPostcodesIoResponse,
  lambethPostcode,
  lambethPostcodeAddressLookupResponse,
} from "./lambeth.js";
import {
  invalidPostcode,
  invalidPostcodeAddressLookupResponse,
  invalidPostcodeIoResponse,
  invalidServiceAreaAPIResponse,
  invalidServiceAreaPostcode,
} from "./invalidData.js";
import { transfromAndSantitisePostcode } from "../../controllers/utils/transformations.js";
import { firstSHPostcode } from "./sh24.js";

export const postcodeIoHandlers = [
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(southwarkPostcode)}`,
    () => {
      return HttpResponse.json(southwarkAPIResponse, { status: 200 });
    }
  ),
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(lambethPostcode)}`,
    () => {
      return HttpResponse.json(lambethPostcodesIoResponse, { status: 200 });
    }
  ),
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(firstSHPostcode)}`,
    () => {
      return HttpResponse.json({ status: 200, ok: true }, { status: 200 });
    }
  ),
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(invalidPostcode)}`,
    () => {
      return HttpResponse.json(invalidPostcodeIoResponse, { status: 404 });
    }
  ),
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(
      invalidServiceAreaPostcode
    )}`,
    () => {
      return HttpResponse.json(invalidServiceAreaAPIResponse);
    }
  ),
];

export const postcodeAddressLookupHandlers = [
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(lambethPostcode)}`,
    () => {
      return HttpResponse.json(lambethPostcodeAddressLookupResponse, {
        status: 200,
      });
    }
  ),
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(invalidPostcode)}`,
    () => {
      return HttpResponse.json(invalidPostcodeAddressLookupResponse, {
        status: 404,
      });
    }
  ),
];

export const handlers = [
  ...postcodeIoHandlers,
  ...postcodeAddressLookupHandlers,
];
