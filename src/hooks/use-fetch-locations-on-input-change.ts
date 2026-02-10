import { useEffect, useRef } from "preact/hooks";
import { debounce } from "radash";
import { useSearchContext } from "../context/search-context";
import { useConfigContext } from "../context/config-context";
import { EarthIcon, PlaceIcon } from "../icons";
import { fetchMapboxLocations } from "../services/fetch-mapbox-locations";
import { SearchResultItem } from "../types/search-results";
import { getEverywhereLabel } from "../locales/utils";

export const useFetchLocationsOnInputChange = () => {
  const { locale } = useConfigContext();
  const {
    setResults,

    focusedInput,
    setFocusedInput,

    locationInputValue,
    setLocationInputValue,
    setLocationCoords,
  } = useSearchContext();

  // ref is necessary to access the latest value of focusedInput inside the debounced function
  const focusedInputRef = useRef(focusedInput);

  useEffect(() => {
    focusedInputRef.current = focusedInput;
  }, [focusedInput]);

  useEffect(() => {
    if (focusedInput !== "location") {
      return;
    }

    const everywhereLabel = getEverywhereLabel(locale);
    const everywhereItem = {
      id: "location-everywhere",
      text: everywhereLabel,
      Icon: EarthIcon,
      onClick: () => {
        setLocationInputValue(everywhereLabel);
        setLocationCoords(null);
        setFocusedInput(null);
      },
    };

    if (!locationInputValue.length) {
      return setResults({
        groups: [],
        items: [everywhereItem],
      });
    }

    setResults({
      groups: [],
      items: [
        everywhereItem,
        { id: "loading", text: "Loading locations...", isLoading: true },
      ],
    });

    const debouncedFetch = debounce({ delay: 500 }, async () => {
      if (focusedInputRef.current !== "location") {
        return;
      }

      try {
        const locations = await fetchMapboxLocations({
          query: locationInputValue,
          locale,
        });

        if (focusedInputRef.current !== "location") {
          return;
        }

        setResults({
          groups: [],
          items: [
            everywhereItem,
            ...locations.map(
              (location): SearchResultItem => ({
                id: location.id,
                text: location.placeName,
                Icon: PlaceIcon,
                onClick: () => {
                  setLocationInputValue(location.placeName);
                  setLocationCoords(location.coordinates);
                  setFocusedInput(null);
                },
              }),
            ),
          ],
        });
      } catch (error) {
        console.error("Failed to fetch locations:", error);

        if (focusedInputRef.current !== "location") {
          return;
        }

        setResults({
          groups: [],
          items: [
            everywhereItem,
            {
              id: "error",
              text: "Failed to load locations. Please try again.",
              isError: true,
            },
          ],
        });
      }
    });

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [locationInputValue, focusedInput, locale]);
};
