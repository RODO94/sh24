import { postcodeIoUrl } from "../index.js";
import { PostcodeIOResponse, RequestResponse } from "../types/requests.js";
import { RequestHandler } from "express";
import {
  checkAndValidatePostcode,
  checkIfAllowedServiceArea,
  checkIfPostcodeIsAllowed,
} from "./utils/validation.js";
import axios from "axios";

export const checkPostcode: RequestHandler = async (req, res) => {
  const { postcode } = req.params;

  const validatedPostcode = checkAndValidatePostcode(postcode);

  if (typeof validatedPostcode !== "string") {
    res.status(400).json(validatedPostcode);
    return;
  }

  const isAllowedPostcode = checkIfPostcodeIsAllowed(postcode);

  if (isAllowedPostcode) {
    const successResponse: RequestResponse = {
      isSuccess: true,
      data: { message: `${postcode} is a valid postcode ` },
    };

    res.status(200).json(successResponse);
    return;
  }
  try {
    const { data } = (await axios.get(
      `${postcodeIoUrl}/${validatedPostcode}`
    )) satisfies PostcodeIOResponse;

    if (data.status === 404) {
      const errorResponse: RequestResponse = {
        isSuccess: false,
        error: {
          type: "input",
          message: `'${postcode}' cannot be found. Enter another postcode`,
        },
      };
      res.status(404).json(errorResponse);
      return;
    }

    const isAllowedServiceArea = checkIfAllowedServiceArea(
      data.result.lsoa,
      postcode
    );

    if (isAllowedServiceArea !== true) {
      res.status(400).json(isAllowedServiceArea);
      return;
    }

    if (data.status === 200 && isAllowedServiceArea) {
      const successResponse: RequestResponse = {
        isSuccess: true,
        data: {
          message: `Postcode is in the service area ${data.result.lsoa}`,
        },
      };

      res.status(200).json(successResponse);
      return;
    }
  } catch (error) {
    console.error("Error fetching postcode data:", error);
    const errorResponse: RequestResponse = {
      isSuccess: false,
      error: { type: "server", message: "Failed to fetch postcode data" },
    };
    res.status(500).json(errorResponse);
  }
};
