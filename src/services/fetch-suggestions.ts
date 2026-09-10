import { SearchWidgetConfig } from "src/types/search-widget-config";
import { API_URL } from "../env";

const API_VERSION = "2";

export type SuggestionTaxonomyItem = {
  id: string;
  code: string;
  name: string;
};

export type SuggestionOrganizationItem = {
  organization_id: string;
  name: string;
  city: string | null;
  state: string | null;
};

export type SuggestionResponse = {
  taxonomies: SuggestionTaxonomyItem[];
  organizations: SuggestionOrganizationItem[];
};

type FetchSuggestionsArgs = Pick<SearchWidgetConfig, "tenantId" | "locale"> & {
  query: string;
};

export const fetchSuggestions = async ({
  locale,
  tenantId,
  query,
}: FetchSuggestionsArgs): Promise<SuggestionResponse> => {
  const searchParams = new URLSearchParams({ query });

  const response = await fetch(`${API_URL}/suggestion?${searchParams}`, {
    headers: {
      "accept-language": locale,
      "x-tenant-id": tenantId,
      "x-api-version": API_VERSION,
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Failed to fetch suggestions" }));
    throw new Error(error.error || "Failed to fetch suggestions");
  }

  return response.json();
};
