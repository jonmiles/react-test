import { render, screen, cleanup, fireEvent } from "@testing-library/react";

import { Button } from "./Button";

const mockOnClick = jest.fn();

describe("Button", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should not call onClick when button disabled", async () => {
    render(
      <Button disabled onClick={mockOnClick}>
        Submit
      </Button>
    );

    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });

  it("should call onClick when clicked", async () => {
    render(<Button onClick={mockOnClick}>Submit</Button>);

    fireEvent.click(screen.getByText("Submit"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
