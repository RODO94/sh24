import { cleanup, render } from "@testing-library/react";
import PostcodeInput from "./PostcodeInput";
import userEvent from "@testing-library/user-event";

describe("The component function", () => {
  beforeEach(() => {});

  afterEach(() => {
    cleanup();
  });

  it("should render the component", () => {
    const screen = render(<PostcodeInput handleSubmit={() => vi.fn()} />);

    const inputBox = screen.getByRole("textbox", { name: "Enter a postcode" });
    expect(inputBox).toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Submit postcode" });
    expect(button).toBeInTheDocument();
  });

  it("should allow you to type into the textbox", async () => {
    const { getByRole } = render(
      <PostcodeInput handleSubmit={() => vi.fn()} />
    );

    const inputBox = getByRole("textbox", { name: "Enter a postcode" });
    await userEvent.type(inputBox, "12345");

    expect(inputBox).toHaveValue("12345");
  });

  it("should allow you to submit what you type", async () => {
    const handleSubmit = vi.fn();
    const { getByRole } = render(<PostcodeInput handleSubmit={handleSubmit} />);

    const inputBox = getByRole("textbox", { name: "Enter a postcode" });
    await userEvent.type(inputBox, "12345");

    expect(inputBox).toHaveValue("12345");

    const button = getByRole("button", { name: "Submit postcode" });
    await userEvent.click(button);

    expect(button).toBeInTheDocument();

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
