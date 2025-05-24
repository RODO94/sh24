export const transfromAndSantitisePostcode = (postcode: string) => {
  const lowercasePostcode = postcode.toLowerCase();
  const sanitizedPostcode = lowercasePostcode
    .replace(" ", "")
    .replace("%20", "");
  return sanitizedPostcode;
};
