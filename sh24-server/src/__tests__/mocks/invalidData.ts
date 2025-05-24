export const invalidZodPostcode = "INV125BGO";
export const invalidPostcode = "xx122nn";
export const invalidServiceAreaPostcode = "e26pp";
export const invalidServiceArea = "Cambuslang 000";

export const invalidAPIResponse = {
  status: 404,
  error: "Postcode not found",
};

export const invalidServiceAreaAPIResponse = {
  status: 200,
  ok: true,
  result: {
    postcode: invalidServiceAreaPostcode,
    lsoa: "Tower Hamlets 036B",
  },
};
