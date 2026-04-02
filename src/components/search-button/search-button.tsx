import { Button } from "../../ui/button/button";
import { useSearchContext } from "../../context/search-context";
import { useCmsConfig, useConfigContext } from "../../context/config-context";
import { getEverywhereLabel, getOtherTranslations } from "../../locales/utils";
import { deriveQueryType } from "../../utils";

interface SearchButtonProps {
  onClose: () => void;
}

export const SearchButton = ({ onClose }: SearchButtonProps) => {
  const config = useCmsConfig();
  const { locale, searchTarget, widgetId } = useConfigContext();
  const otherTexts = getOtherTranslations(locale);
  const {
    queryConfig,
    queryInputValue,
    locationInputValue,
    locationCoords,
    distance,
  } = useSearchContext();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    // Always use "Everywhere" in English for the query parameter
    const everywhereLabel = getEverywhereLabel(locale);
    const locationParam =
      locationInputValue === everywhereLabel || !locationInputValue
        ? "Everywhere"
        : locationInputValue;
    queryParams.set("location", locationParam);
    if (locationCoords) {
      queryParams.set("coords", locationCoords.join(","));
    }
    if (distance !== null && locationParam !== "Everywhere") {
      queryParams.set("distance", distance.toString());
    }

    if (widgetId) {
      queryParams.set("widgetId", widgetId);
    }

    const localePath = locale ? `/${locale}` : "";
    const target = searchTarget || "_blank";

    if (queryConfig && "href" in queryConfig && queryConfig.href) {
      window.open(
        `${queryConfig.href}${localePath}?${queryParams.toString()}`,
        queryConfig.openInNewTab ? "_blank" : target,
      );
    }

    if (queryConfig && "query" in queryConfig) {
      queryParams.set("query", queryConfig.query);
      queryParams.set("query_label", queryConfig.queryLabel);
      queryParams.set("query_type", queryConfig.queryType);
    } else {
      queryParams.set("query", queryInputValue);
      queryParams.set("query_label", queryInputValue);
      queryParams.set(
        "query_type",
        deriveQueryType(queryInputValue, config.hybridSemanticSearchEnabled),
      );
    }

    window.open(
      `https://${config.domain}${localePath}/search?${queryParams.toString()}`,
      target,
    );

    onClose();
  };

  return (
    <Button
      id="sw-search-modal-search-button"
      onClick={handleSearch}
      size="md"
      variant="primary"
      disabled={!queryInputValue.trim()}
    >
      {otherTexts.search}
    </Button>
  );
};
