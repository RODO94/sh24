const addPostcodeToInput = async (
  page,
  postcode: "SE1 7QA" | "SE1 7QD" | "SH24 1AA" | "E2 6PP" | "BAD"
) => {
  const inputBox = page.getByRole("textbox", { name: "Enter a postcode" });

  await inputBox.fill(postcode);
  return true;
};

const clickSubmitButton = async (page) => {
  const submitButton = page.getByRole("button", { name: "Submit postcode" });
  await submitButton.click();
  return true;
};

/**
 * Adds a post to the input box and clicks the submit button.
 */
export const submitAPostcode = async (
  page,
  postcode: "SE1 7QA" | "SE1 7QD" | "SH24 1AA" | "E2 6PP" | "BAD"
) => {
  await addPostcodeToInput(page, postcode);
  await clickSubmitButton(page);
  return true;
};
