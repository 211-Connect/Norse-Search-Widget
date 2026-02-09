import { useEffect } from "preact/hooks";
import { debounce } from "radash";
import { useSearchContext } from "../context/search-context";
import { useCmsConfig } from "../context/config-context";
import { EarthIcon, PlaceIcon } from "../icons";
import { fetchMapboxLocations } from "../services/fetch-mapbox-locations";
import { SearchResultItem } from "../types/search-results";

export const useFetchLocationsOnInputChange = () => {
  const config = useCmsConfig();
  const {
    setResults,

    focusedInput,
    setFocusedInput,

    locationInputValue,
    setLocationInputValue,
    setLocationCoords,
  } = useSearchContext();

  useEffect(() => {
    if (focusedInput !== "location") {
      return;
    }

    const everywhereItem = {
      id: "location-everywhere",
      text: "Everywhere",
      Icon: EarthIcon,
      onClick: () => {
        setLocationInputValue("Everywhere");
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

    const debouncedFetch = debounce({ delay: 500 }, async () => {
      try {
        const locations = await fetchMapboxLocations({
          query: locationInputValue,
          mapboxAccessToken: config.mapboxAccessToken,
        });

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
        setResults({
          groups: [],
          items: [everywhereItem],
        });
      }
    });

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [locationInputValue, focusedInput, config.mapboxAccessToken]);
};
