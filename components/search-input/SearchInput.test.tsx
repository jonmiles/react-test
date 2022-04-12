import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SearchInput } from "./SearchInput";

const mockSubmit = jest.fn();

describe("SearchInput", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const renderPage = () => {
    render(<SearchInput onSubmit={mockSubmit} />);
  };

  it("should not submit without valid term i.e. non null", async () => {
    renderPage();
    fireEvent.click(screen.getByRole("button"));
    expect(mockSubmit).toHaveBeenCalledTimes(0);
  });

  it("should call onSubmit with correct value ", async () => {
    renderPage();

    const inputEl = screen.getByPlaceholderText(/Enter company name/i);
    fireEvent.change(screen.getByPlaceholderText(/Enter company name/i), {
      target: { value: "MyCompany" },
    });

    fireEvent.click(screen.getByRole("button"));
    expect(mockSubmit).toHaveBeenNthCalledWith(1, "MyCompany");
  });
});
