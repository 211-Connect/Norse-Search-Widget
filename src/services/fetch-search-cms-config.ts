import { SearchWidgetConfig } from "src/types/search-widget-config";
import { SearchCmsConfig } from "src/types/search-cms-config";

export const fetchSearchCmsConfig = async ({
  domain,
  locale,
  tenantId,
}: SearchWidgetConfig): Promise<SearchCmsConfig> => {
  try {
    const response = await fetch(
      `${domain}/api/search-config/${tenantId}/${locale}`,
    );

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Failed to fetch search config" }));
      throw new Error(error.error || "Failed to fetch search config");
    }

    const searchCmsConfig = await response.json();
    return searchCmsConfig;
  } catch (err) {
    console.error("Failed to fetch tenant config:", err);
    throw err;
  }
};
