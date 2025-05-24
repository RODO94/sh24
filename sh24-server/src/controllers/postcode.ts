import { postcodeIoUrl } from "../index.js";
import { z } from "zod/v4";
import { RequestResponse } from "../types/requests.js";
import { transfromAndSantitisePostcode } from "./transformations.js";
import { RequestHandler } from "express";
import {
  checkIfPostcodeIsAllowed,
  checkIfPostcodeIsInLsoa,
} from "./validation.js";

export const checkPostcode: RequestHandler = async (req, res) => {
  const { postcode } = req.params;

  const validatedPostcode = checkAndValidatePostcode(postcode);

  if (typeof validatedPostcode !== "string" && validatedPostcode.error) {
    res.status(400).json(validatedPostcode);
  }

  try {
    const response = await fetch(`${postcodeIoUrl}/${validatedPostcode}`);
    const {
      result: { lsoa },
    } = await response.json();

    !response.ok && res.status(404).json({ error: "Postcode not found" });

    const isAllowedServiceArea = checkIfAllowedServiceArea(lsoa, postcode);

    if (isAllowedServiceArea !== true) {
      res.status(400).json(isAllowedServiceArea);
    }

    const successResponse: RequestResponse = {
      isSuccess: true,
      data: { message: `Postcode is in the service area ${lsoa}` },
    };

    res.status(200).json(successResponse);
  } catch (error) {
    console.error("Error fetching postcode data:", error);
    const errorResponse: RequestResponse = {
      isSuccess: false,
      error: { type: "server", message: "Failed to fetch postcode data" },
    };
    res.status(500).json(errorResponse);
  }
};

function checkIfAllowedServiceArea(lsoa: string, postcode: string) {
  const isAllowedServiceArea = checkIfPostcodeIsInLsoa(lsoa);

  if (!isAllowedServiceArea) {
    const errorResponse: RequestResponse = {
      isSuccess: false,
      error: {
        type: "input",
        message: `'${postcode}' is not in an allowed service area. Enter another postcode`,
      },
    };
    return errorResponse;
  }

  return true;
}

function checkAndValidatePostcode(postcode: string) {
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

  const isAllowedPostcode = checkIfPostcodeIsAllowed(postcode);

  if (!isAllowedPostcode) {
    const errorResponse: RequestResponse = {
      isSuccess: false,
      error: {
        type: "input",
        message: `'${postcode}' is not an allowed postcode. Enter another postcode`,
      },
    };
    return errorResponse;
  }

  return transformedPostcode;
}
