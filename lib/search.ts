const SEARCH_END_POINT = "/api/search";

export interface FetchCompaniesParams {
  term: string;
}

export async function fetchCompanies({ term }: FetchCompaniesParams) {
  const resp = await fetch(SEARCH_END_POINT, {
    method: "POST",
    body: JSON.stringify({ term }),
  });
  return await resp.json();
}
