import test, { describe, it } from "node:test";
import assert from "node:assert";
import {
  checkAndValidatePostcode,
  checkIfAllowedServiceArea,
  checkIfPostcodeIsAllowed,
} from "./utils/validation.js";
import { southwarkPostcode } from "../__tests__/mocks/southwark.js";
import { firstSHPostcode } from "../__tests__/mocks/sh24.js";
import { lambethPostcode } from "../__tests__/mocks/lambeth.js";

const invalidZodPostcode = "INV12 5BGO";
const invalidPostcode = "xx122nn";
const invalidServiceArea = "Cambuslang 000";

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
test.todo("the error when a postcode is not found");

test.todo("the postcode is in the service area check");

test.todo("the postcode is not in the service area check");
