import { http, HttpResponse } from "msw";
import { postcodeIoUrl } from "../../index.js";
import { southwarkAPIResponse, southwarkPostcode } from "./southwark.js";
import { lambethAPIResponse, lambethPostcode } from "./lambeth.js";
import {
  invalidAPIResponse,
  invalidPostcode,
  invalidServiceAreaAPIResponse,
  invalidServiceAreaPostcode,
} from "./invalidData.js";
import { transfromAndSantitisePostcode } from "../../controllers/utils/transformations.js";
import { firstSHPostcode } from "./sh24.js";

export const handlers = [
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(southwarkPostcode)}`,
    () => {
      return HttpResponse.json(southwarkAPIResponse, { status: 200 });
    }
  ),
  http.get(
    `${postcodeIoUrl}/${transfromAndSantitisePostcode(lambethPostcode)}`,
    () => {
      return HttpResponse.json(lambethAPIResponse, { status: 200 });
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
      return HttpResponse.json(invalidAPIResponse, { status: 404 });
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
