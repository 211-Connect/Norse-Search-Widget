import { API_URL } from "../env";

export type MapboxLocation = {
  id: string;
  placeName: string;
  coordinates: [number, number]; // [longitude, latitude]
  /**
   * Set when the place is an area (state, county, city or ZIP) that Norse can
   * search as a shape, e.g. `county:53033`. See docs/area-search.md in Norse.
   */
  regionId: string | null;
};

/** `state:WA`, `county:53033`, `place:5363000` or `zip:98101`. */
const REGION_ID_PATTERN =
  /^(state:[A-Z]{2}|county:\d{5}|place:\d{7}|zip:\d{5})$/;

type FetchMapboxLocationsParams = {
  query: string;
  locale: string;
};

export const fetchMapboxLocations = async ({
  query,
  locale,
}: FetchMapboxLocationsParams): Promise<MapboxLocation[]> => {
  const params = new URLSearchParams({
    address: query,
    locale,
    limit: "9", // Get 9 locations (Everywhere + 9 other proposals)
  });

  const response = await fetch(
    `${API_URL}/geocoding/forward?${params.toString()}`,
    {
      headers: {
        "x-api-version": "1",
      },
    },
  );

  if (!response.ok) {
    console.error("Forward geocoding request failed:", response.statusText);
    return [];
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item, index) => ({
    id: `location-${index}`,
    placeName: item.address,
    coordinates: item.coordinates,
    regionId:
      typeof item.region_id === "string" &&
      REGION_ID_PATTERN.test(item.region_id)
        ? item.region_id
        : null,
  }));
};
