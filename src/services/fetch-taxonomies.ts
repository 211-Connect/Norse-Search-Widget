import { SearchWidgetConfig } from "src/types/search-widget-config";
import { TaxonomyResponse } from "../types/taxonomy";
import { API_URL } from "../env";

const API_VERSION = "2";

type FetchTaxonomiesArgs = Pick<SearchWidgetConfig, "tenantId" | "locale"> & {
  query: string;
};

export const fetchTaxonomies = async ({
  locale,
  tenantId,
  query,
}: FetchTaxonomiesArgs): Promise<TaxonomyResponse> => {
  const searchParams = new URLSearchParams({
    query,
  });

  const response = await fetch(`${API_URL}/taxonomy?${searchParams}`, {
    headers: {
      "accept-language": locale,
      "x-tenant-id": tenantId,
      "x-api-version": API_VERSION,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Failed to fetch taxonomies" }));
    throw new Error(error.error || "Failed to fetch taxonomies");
  }

  return response.json();
};
