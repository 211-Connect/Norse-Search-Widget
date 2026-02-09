import { Button } from "../button/button";
import { useSearchContext } from "../../context/search-context";
import { useCmsConfig } from "../../context/config-context";

interface SearchButtonProps {
  onClose: () => void;
}

export const SearchButton = ({ onClose }: SearchButtonProps) => {
  const config = useCmsConfig();
  const {
    queryConfig,
    queryInputValue,
    locationInputValue,
    locationCoords,
    distance,
  } = useSearchContext();

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    queryParams.set("location", locationInputValue || "Everywhere");
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
