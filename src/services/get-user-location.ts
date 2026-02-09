import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

export type UserLocation = {
  placeName: string;
  coordinates: [number, number]; // [longitude, latitude]
};

type GetUserLocationParams = {
  mapboxAccessToken: string;
};

export const getUserLocation = ({
  mapboxAccessToken,
}: GetUserLocationParams): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const coordinates: [number, number] = [longitude, latitude];

        // Try to get place name via reverse geocoding
        try {
          const geocodingClient = mbxGeocoding({
            accessToken: mapboxAccessToken,
          });

          const response = await geocodingClient
            .reverseGeocode({
              query: coordinates,
              limit: 1,
            })
            .send();

          const placeName =
            response.body?.features?.[0]?.place_name ||
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

          resolve({
            placeName,
            coordinates,
          });
        } catch (error) {
          console.error("Failed to reverse geocode:", error);
          // Fallback to coordinates if reverse geocoding fails
          resolve({
            placeName: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            coordinates,
          });
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }

        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  });
};

export const isGeolocationAvailable = (): boolean => "geolocation" in navigator;
