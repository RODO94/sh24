import { render } from "@testing-library/react";
import SuccessBox from "./SuccessBox";

describe("The functionality", () => {
  it("should render a component with an success message", () => {
    const { getByText } = render(
      <SuccessBox
        successMessage={{
          isSuccess: true,
          data: { message: "test success message" },
        }}
      />
    );

    const successMessage = getByText("test success message");
    expect(successMessage).toBeInTheDocument();
  });

  it("should not render a component without an success message", () => {
    const { queryByText } = render(<SuccessBox successMessage={null} />);

    const successMessage = queryByText("test success message");
    expect(successMessage).not.toBeInTheDocument();
  });
});
