import { useState } from "preact/hooks";
import { useCmsConfig } from "../../context/config-context";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { SearchResultsList } from "../search-results-list/search-results-list";
import {
  ChevronLeftIcon,
  SearchIcon,
  PlaceIcon,
  TargetIcon,
  LoaderIcon,
} from "../../icons";
import { useSearchContext } from "../../context/search-context";
import {
  useEmptyResultsOnBlurInput,
  useFetchTaxonomiesOnInputChange,
  useUpdateResultsOnInputChange,
  useFetchLocationsOnInputChange,
} from "../../hooks";
import {
  getUserLocation,
  isGeolocationAvailable,
} from "../../services/get-user-location";

import * as styles from "./search-modal.css";

type SearchModalProps = {
  onClose: () => void;
};

export const SearchModal = ({ onClose }: SearchModalProps) => {
  const config = useCmsConfig();
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const {
    queryConfig,

    setFocusedInput,

    queryInputValue,
    setQueryInputValue,

    locationInputValue,
    setLocationInputValue,

    locationCoords,
    setLocationCoords,
  } = useSearchContext();

  useEmptyResultsOnBlurInput();
  useUpdateResultsOnInputChange();
  useFetchTaxonomiesOnInputChange();
  useFetchLocationsOnInputChange();

  const handleUseMyLocation = async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      const location = await getUserLocation({
        mapboxAccessToken: config.mapboxAccessToken,
      });
      setLocationInputValue(location.placeName);
      setLocationCoords(location.coordinates);
      setFocusedInput(null);
    } catch (error) {
      console.error("Failed to get user location:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unable to retrieve location";
      setLocationError(errorMessage);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    queryParams.set("location", locationInputValue || "Everywhere");
    if (locationCoords) {
      queryParams.set("coords", locationCoords.join(","));
    }
    // queryParams.set("distance", "0");

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
    <div id="search-modal" className={styles.overlay}>
      <div id="search-modal-content" className={styles.content}>
        <div id="search-modal-button-row" className={styles.buttonRow}>
          <Button
            id="search-modal-back-button"
            onClick={onClose}
            size="md"
            variant="secondary"
            Icon={ChevronLeftIcon}
          >
            Back
          </Button>
          <Button
            id="search-modal-search-button"
            onClick={handleSearch}
            size="md"
            variant="primary"
            disabled={!queryInputValue.trim()}
          >
            Search
          </Button>
        </div>

        <Input
          value={queryInputValue}
          id="search-modal-query-input"
          autofocus
          size="sm"
          onInput={setQueryInputValue}
          onFocus={() => setFocusedInput("query")}
          onClear={() => setQueryInputValue("")}
          placeholder={config?.texts?.queryInputPlaceholder || undefined}
          Icon={SearchIcon}
        />

        <Input
          value={locationInputValue}
          id="search-modal-location-input"
          size="sm"
          onInput={setLocationInputValue}
          onFocus={() => setFocusedInput("location")}
          onClear={() => {
            setLocationInputValue("");
            setLocationCoords(null);
          }}
          placeholder={config.texts?.locationInputPlaceholder || undefined}
          Icon={PlaceIcon}
        />

        {isGeolocationAvailable() && (
          <>
            <Button
              id="search-modal-use-location-button"
              variant="link"
              size="sm"
              onClick={handleUseMyLocation}
              Icon={isLoadingLocation ? LoaderIcon : TargetIcon}
              iconPosition="left"
              disabled={isLoadingLocation}
            >
              {isLoadingLocation ? "Getting location..." : "Use My Location"}
            </Button>
            {locationError && (
              <p
                id="search-modal-location-error"
                className={styles.locationError}
              >
                {locationError}
              </p>
            )}
          </>
        )}

        <SearchResultsList />
      </div>
    </div>
  );
};
