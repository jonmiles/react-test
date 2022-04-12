import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

import { SearchResults, SearchResultsProps } from "./SearchResults";

const mockResults = {
  items: [
    {
      name: "COMPANY A",
      number: "13965111",
      date: "2022-03-09",
    },
    {
      name: "COMPANY B",
      number: "13965112",
      date: "2022-03-10",
    },
    {
      name: "COMPANY C",
      number: "13965113",
      date: "2022-03-11",
    },
  ],
  total: 3,
};

describe("SearchResults", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  const renderPage = ({ results = mockResults }: SearchResultsProps) => {
    return render(<SearchResults results={results} />);
  };

  it("should render consistently", async () => {
    renderPage({ results: mockResults });
    expect(screen.getByText("3 Results Found")).toBeInTheDocument();
    expect(screen.getByText("COMPANY A")).toBeInTheDocument();
    expect(screen.getByText("Created on: 9th Mar 2022")).toBeInTheDocument();
    expect(screen.getByText("13965111")).toBeInTheDocument();
    expect(screen.getByText("COMPANY B")).toBeInTheDocument();
    expect(screen.getByText("Created on: 10th Mar 2022")).toBeInTheDocument();
    expect(screen.getByText("13965112")).toBeInTheDocument();
    expect(screen.getByText("COMPANY C")).toBeInTheDocument();
    expect(screen.getByText("Created on: 11th Mar 2022")).toBeInTheDocument();
    expect(screen.getByText("13965113")).toBeInTheDocument();
  });

  it("should render no results", () => {
    renderPage({ results: { total: 0, items: [] } });
    expect(screen.getByText("No matches found")).toBeInTheDocument();
  });
});
