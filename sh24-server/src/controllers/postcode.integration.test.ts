import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import request from "supertest";
import { server } from "../__tests__/mocks/server.js";
import { southwarkPostcode } from "../__tests__/mocks/southwark.js";
import { lambethPostcode } from "../__tests__/mocks/lambeth.js";
import { firstSHPostcode } from "../__tests__/mocks/sh24.js";
import { app } from "../app.js";
import {
  invalidPostcode,
  invalidServiceAreaPostcode,
  invalidZodPostcode,
} from "../__tests__/mocks/invalidData.js";

describe("Postcode Integration Tests", () => {
  before(() => {
    server.listen();
  });

  after(() => {
    server.close();
  });

  describe("requests for valid postcodes", () => {
    it("should return success for allowed SH24 postcodes", async () => {
      const response = await request(app)
        .get(`/postcode/${firstSHPostcode}`)
        .expect(200);
      assert.strictEqual(response.body.isSuccess, true);
      assert(response.body.data.message.includes("valid postcode"));
    });

    it("should return success for Southwark postcodes", async () => {
      const response = await request(app)
        .get(`/postcode/${southwarkPostcode}`)
        .expect(200);

      assert.strictEqual(response.body.isSuccess, true);
      assert(response.body.data.message.includes("service area"));
    });

    it("should return success for Lambeth postcodes", async () => {
      const response = await request(app)
        .get(`/postcode/${lambethPostcode}`)
        .expect(200);

      assert.strictEqual(response.body.isSuccess, true);
      assert(response.body.data.message.includes("service area"));
    });
  });

  describe("requests for invalid postcodes or service areas", () => {
    it("should return 400 for invalid postcode format", async () => {
      const response = await request(app)
        .get(`/postcode/${invalidZodPostcode}`)
        .expect(400);

      assert.strictEqual(response.body.isSuccess, false);
      assert.strictEqual(response.body.error.type, "zod");
    });

    it("should return error for postcodes it can't find", async () => {
      const response = await request(app)
        .get(`/postcode/${invalidPostcode}`)
        .expect(404);

      assert.strictEqual(response.body.error, "Postcode not found");
    });

    it("should return error for postcodes in disallowed service areas", async () => {
      const response = await request(app)
        .get(`/postcode/${invalidServiceAreaPostcode}`)
        .expect(400);

      assert.strictEqual(response.body.isSuccess, false);
      assert.strictEqual(
        response.body.error.message,
        `'${invalidServiceAreaPostcode}' is in Tower Hamlets which is not an allowed service area. Enter another postcode`
      );
    });
  });
});
