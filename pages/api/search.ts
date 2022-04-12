import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE_URL = "https://api.company-information.service.gov.uk";
const API_PATH = "/search/companies";
const API_KEY = process.env.CN_API_KEY;

export interface ResultItem {
  name: string;
  number: string;
  date: string;
}

export interface SearchResponse {
  items: ResultItem[];
  total: number;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(404).json({
      error: {
        code: "not_found",
        message:
          "The requested endpoint was not found or doesn't support this method.",
      },
    });
  }

  const { term } = JSON.parse(req.body);

  try {
    const headers: HeadersInit = new Headers();
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", API_KEY ?? "");

    const resp = await fetch(`${API_BASE_URL}${API_PATH}?q=${term}`, {
      headers,
    });
    const json = await resp.json();

    res.status(200).json({
      // TODO shortcut, needs type defs for api response.
      items: json.items.map((i: any) => ({
        name: i.title,
        number: i.company_number,
        date: i.date_of_creation,
      })),
      total: json.total_results,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        code: "internal_error",
        message: "An unexpected error occurred",
      },
    });
  }
}
