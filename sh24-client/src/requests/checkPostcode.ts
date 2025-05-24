import axios from "axios";

export const checkPostcode = async (postcode: string) => {
  const lowercasePostcode = postcode.toLowerCase();
  const sanitizedPostcode = lowercasePostcode.replace(" ", "");

  const response = await axios.get(
    `http://localhost:8080/postcode/${sanitizedPostcode}`
  );
  return response.data;
};
