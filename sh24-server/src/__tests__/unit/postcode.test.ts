// @ts-nocheck
import { describe, it } from "node:test";
import assert from "node:assert";
import {
  checkAndValidatePostcode,
  checkIfAllowedServiceArea,
  checkIfPostcodeIsAllowed,
} from "../../controllers/utils/validation.js";
import { southwarkPostcode } from "../mocks/southwark.js";
import { firstSHPostcode } from "../mocks/sh24.js";
import { lambethPostcode } from "../mocks/lambeth.js";
import {
  invalidPostcode,
  invalidServiceArea,
  invalidZodPostcode,
} from "../mocks/invalidData.js";

describe("zod postcode validation", () => {
  it("creates a zod error for invalid postcodes", () => {
    const validatedPostcode = checkAndValidatePostcode(invalidZodPostcode);
    assert.notStrictEqual(typeof validatedPostcode, "string");
    assert.strictEqual(validatedPostcode.error.type, "zod");
    assert.strictEqual(
      validatedPostcode.error?.message,
      `'${invalidZodPostcode}' is in an invalid format. Enter a postcode similar to AA12 3BC`
    );
  });

  it("returns true for valid postcodes", () => {
    const validatedPostcode = checkAndValidatePostcode(southwarkPostcode);
    assert.strictEqual(validatedPostcode, "se17qd");
  });
});

describe("check for allowed postcodes", () => {
  it("returns true for allowed postcodes", () => {
    const isAllowed = checkIfPostcodeIsAllowed(firstSHPostcode);
    assert.strictEqual(isAllowed, firstSHPostcode);
  });

  it("returns an error for not allowed postcodes", () => {
    const isAllowed = checkIfPostcodeIsAllowed(invalidPostcode);
    assert.strictEqual(isAllowed, undefined);
  });
});

describe("check for allowed service areas", () => {
  it("returns true for allowed service areas", () => {
    const isAllowedServiceArea = checkIfAllowedServiceArea(
      "Lambeth 000",
      lambethPostcode
    );
    assert.strictEqual(isAllowedServiceArea, true);
  });

  it("returns an error for not allowed service areas", () => {
    const isAllowedServiceArea = checkIfAllowedServiceArea(
      invalidServiceArea,
      invalidPostcode
    );
    assert.strictEqual(isAllowedServiceArea.error.type, "input");
    assert.strictEqual(
      isAllowedServiceArea.error.message,
      `'${invalidPostcode}' is in Cambuslang which is not an allowed service area. Enter another postcode`
    );
  });
});
