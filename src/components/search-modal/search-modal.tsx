import { useState } from "preact/hooks";
import { useCmsConfig, useConfigContext } from "../../context/config-context";
import { Input } from "../../ui/input/input";
import { Button } from "../../ui/button/button";
import { SearchResultsList } from "../search-results-list/search-results-list";
import { UseMyLocationButton } from "../use-my-location-button/use-my-location-button";
import { DistanceSelect } from "../distance-select/distance-select";
import { SearchButton } from "../search-button/search-button";
import { ChevronLeftIcon, SearchIcon, PlaceIcon } from "../../icons";
import { useSearchContext } from "../../context/search-context";
import {
  useEmptyResultsOnBlurInput,
  useFetchTaxonomiesOnInputChange,
  useUpdateResultsOnInputChange,
  useFetchLocationsOnInputChange,
  useInitializeDistanceFromConfig,
} from "../../hooks";
import { isGeolocationAvailable } from "../../services/get-user-location";
import { getTextTranslations, getOtherTranslations } from "../../locales";

import * as styles from "./search-modal.css";

type SearchModalProps = {
  onClose: () => void;
};

export const SearchModal = ({ onClose }: SearchModalProps) => {
  const config = useCmsConfig();
  const { locale } = useConfigContext();
  const [locationError, setLocationError] = useState<string | null>(null);

  const fallbackTexts = getTextTranslations(locale);
  const otherTexts = getOtherTranslations(locale);

  const {
    queryInputValue,
    locationInputValue,

    setFocusedInput,
    setQueryInputValue,
    setLocationInputValue,
    setLocationCoords,
  } = useSearchContext();

  useInitializeDistanceFromConfig();
  useEmptyResultsOnBlurInput();
  useUpdateResultsOnInputChange();
  useFetchTaxonomiesOnInputChange();
  useFetchLocationsOnInputChange();

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
            {otherTexts.back}
          </Button>
          <SearchButton onClose={onClose} />
        </div>

        <Input
          value={queryInputValue}
          id="search-modal-query-input"
          autofocus
          size="sm"
          onInput={setQueryInputValue}
          onFocus={() => setFocusedInput("query")}
          onClear={() => setQueryInputValue("")}
          placeholder={
            config?.texts?.queryInputPlaceholder ??
            fallbackTexts?.queryInputPlaceholder
          }
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
          placeholder={
            config.texts?.locationInputPlaceholder ??
            fallbackTexts?.locationInputPlaceholder
          }
          Icon={PlaceIcon}
        />

        {isGeolocationAvailable() && (
          <div>
            <div className={styles.locationRow}>
              <UseMyLocationButton onError={setLocationError} />
              <DistanceSelect />
            </div>
            {locationError && (
              <p
                id="search-modal-location-error"
                className={styles.locationError}
              >
                {locationError}
              </p>
            )}
          </div>
        )}

        <SearchResultsList />
      </div>
    </div>
  );
};
