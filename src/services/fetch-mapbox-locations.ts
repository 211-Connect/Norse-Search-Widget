import { API_URL } from "../env";

export type MapboxLocation = {
  id: string;
  placeName: string;
  coordinates: [number, number]; // [longitude, latitude]
};

type FetchMapboxLocationsParams = {
  query: string;
  locale: string;
};

export const fetchMapboxLocations = async ({
  query,
  locale,
}: FetchMapboxLocationsParams): Promise<MapboxLocation[]> => {
  try {
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
    }));
  } catch (error) {
    console.error("Failed to fetch Mapbox locations:", error);
    return [];
  }
};
