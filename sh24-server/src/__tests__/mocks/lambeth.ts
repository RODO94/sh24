export const lambethPostcode = "SE1 7QA";

export const lambethPostcodesIoResponse = {
  status: 200,
  ok: true,
  result: {
    postcode: "SE1 7QA",
    lsoa: "Lambeth 036B",
  },
};

export const lambethPostcodeAddressLookupResponse = {
  pagination: {
    page: 1,
    total_pages: 1,
    per_page: 20,
  },
  results: [
    {
      postcode: "SE1 7QA",
      region: "Lambeth",
    },
  ],
  status: "ok",
};
