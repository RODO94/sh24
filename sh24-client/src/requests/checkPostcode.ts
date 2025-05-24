import axios from "axios";

export const checkPostcode = async (postcode: string) => {
  const lowercasePostcode = postcode.toLowerCase();
  const sanitizedPostcode = lowercasePostcode.replace(" ", "");

  const { data } = await axios
    .get(`http://localhost:8080/postcode/${sanitizedPostcode}`)
    .catch((error) => {
      console.log(error.response.data);
      return error.response;
    });
  return data;
};
