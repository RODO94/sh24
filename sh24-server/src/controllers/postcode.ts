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

  const transformedPostcode = checkAndValidatePostcode(postcode);

  if (typeof transformedPostcode !== "string" && transformedPostcode.error) {
    res.status(400).json(transformedPostcode);
  }

  try {
    const response = await fetch(`${postcodeIoUrl}/${transformedPostcode}`);
    const {
      result: { lsoa },
    } = await response.json();

    !response.ok && res.status(404).json({ error: "Postcode not found" });

    const isAllowedServiceArea = checkIfAllowedServiceArea(lsoa, postcode);

    if (isAllowedServiceArea !== true) {
      res.status(400).json(isAllowedServiceArea);
    }

    // TODO: Check if the postcode is in the service area

    const successResponse: RequestResponse = {
      isSuccess: true,
      success: { message: `Postcode is in the service area ${lsoa}` },
    };

    res.status(200).json(successResponse);
  } catch (error) {
    console.error("Error fetching postcode data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function checkIfAllowedServiceArea(lsoa: string, postcode: string) {
  const isAllowedServiceArea = checkIfPostcodeIsInLsoa(lsoa);

  if (!isAllowedServiceArea) {
    return {
      error: `'${postcode}' is not in an allowed service area. Enter another postcode`,
    };
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
    return {
      error: `'${postcode}' is in an invalid format. Enter a postcode similar to AA12 3BC`,
    };
  }

  const isAllowedPostcode = checkIfPostcodeIsAllowed(postcode);

  if (!isAllowedPostcode) {
    return {
      error: `'${postcode}' is not an allowed postcode. Enter another postcode`,
    };
  }

  return transformedPostcode;
}
