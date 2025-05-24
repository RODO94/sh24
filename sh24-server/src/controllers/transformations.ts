export const transfromAndSantitisePostcode = (postcode: string) => {
  const lowercasePostcode = postcode.toLowerCase();
  const sanitizedPostcode = lowercasePostcode.replace(" ", "");
  return sanitizedPostcode;
};
