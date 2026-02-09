import { Button } from "../../ui/button/button";
import { useSearchContext } from "../../context/search-context";
import { useCmsConfig, useConfigContext } from "../../context/config-context";
import { getEverywhereLabel } from "../../locales/utils";

interface SearchButtonProps {
  onClose: () => void;
}

export const SearchButton = ({ onClose }: SearchButtonProps) => {
  const config = useCmsConfig();
  const { locale } = useConfigContext();
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
    if (distance !== null) {
      queryParams.set("distance", distance.toString());
    }

    if (!queryConfig) {
      queryParams.set("query", queryInputValue);
      queryParams.set("query_label", queryInputValue);
      queryParams.set("query_type", "text");
      window.open(
        `https://${config.domain}?${queryParams.toString()}`,
        "_blank",
      );
    } else if ("href" in queryConfig) {
      window.open(
        `${queryConfig.href}?${queryParams.toString()}`,
        queryConfig.openInNewTab ? "_blank" : "_self",
      );
    } else {
      queryParams.set("query", queryConfig.query);
      queryParams.set("query_label", queryConfig.queryLabel);
      queryParams.set("query_type", queryConfig.queryType);
      window.open(
        `https://${config.domain}?${queryParams.toString()}`,
        "_blank",
      );
    }

    onClose();
  };

  return (
    <Button
      id="search-modal-search-button"
      onClick={handleSearch}
      size="md"
      variant="primary"
      disabled={!queryInputValue.trim()}
    >
      Search
    </Button>
  );
};
