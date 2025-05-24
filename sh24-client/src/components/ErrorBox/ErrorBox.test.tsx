import { render } from "@testing-library/react";
import ErrorBox from "./ErrorBox";

describe("The functionality", () => {
  it("should render a component with an error message", () => {
    const { getByText } = render(
      <ErrorBox
        errorMessage={{
          isSuccess: false,
          error: { type: "input", message: "test error message" },
        }}
      />
    );

    const errorMessage = getByText("test error message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should not render a component without an error message", () => {
    const { queryByText } = render(<ErrorBox errorMessage={null} />);

    const errorMessage = queryByText("test error message");
    expect(errorMessage).not.toBeInTheDocument();
  });
});
