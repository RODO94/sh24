import { http, HttpResponse } from "msw";
import { postcodeIoUrl } from "../../index.js";
import { southwarkAPIResponse, southwarkPostcode } from "./southwark.js";
import { lambethAPIResponse, lambethPostcode } from "./lambeth.js";

export const handlers = [
  http.get(`${postcodeIoUrl}/${southwarkPostcode}`, () => {
    return HttpResponse.json(southwarkAPIResponse);
  }),
  http.get(`${postcodeIoUrl}/${lambethPostcode}`, () => {
    return HttpResponse.json(lambethAPIResponse);
  }),
];
