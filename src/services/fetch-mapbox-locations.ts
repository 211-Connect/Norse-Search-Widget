import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

export type MapboxLocation = {
  id: string;
  placeName: string;
  coordinates: [number, number]; // [longitude, latitude]
};

type FetchMapboxLocationsParams = {
  query: string;
  mapboxAccessToken: string;
};

export const fetchMapboxLocations = async ({
  query,
  mapboxAccessToken,
}: FetchMapboxLocationsParams): Promise<MapboxLocation[]> => {
  try {
    const geocodingClient = mbxGeocoding({ accessToken: mapboxAccessToken });

    const response = await geocodingClient
      .forwardGeocode({
        query,
        limit: 9, // Get 9 locations (Everywhere + 9 other proposals)
        autocomplete: true,
      })
      .send();

    if (!response.body?.features) {
      return [];
    }

    return response.body.features.map((feature) => ({
      id: feature.id,
      placeName: feature.place_name,
      coordinates: feature.center as [number, number],
    }));
  } catch (error) {
    console.error("Failed to fetch Mapbox locations:", error);
    return [];
  }
};
