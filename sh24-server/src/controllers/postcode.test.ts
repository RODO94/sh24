import test, { describe, it } from "node:test";
import assert from "node:assert";
import { checkAndValidatePostcode } from "./utils/validation.js";

const invalidZodPostcode = "INV12 5BGO";

describe("postcode controller", () => {
  it("the zod postcode validation schema", () => {
    const validatedPostcode = checkAndValidatePostcode(invalidZodPostcode);
    assert.notStrictEqual(typeof validatedPostcode, "string");
    assert.strictEqual(
      validatedPostcode.error?.message,
      `'${invalidZodPostcode}' is in an invalid format. Enter a postcode similar to AA12 3BC`
    );
  });
});

test.todo("the zod postcode validation schema");

test.todo("the allowed postcode check");

test.todo("the error when a postcode is not found");

test.todo("the postcode is in the service area check");

test.todo("the postcode is not in the service area check");
