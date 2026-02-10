import { API_URL } from "../env";

export type UserLocation = {
  placeName: string;
  coordinates: [number, number]; // [longitude, latitude]
};

export const getUserLocation = (locale: string): Promise<UserLocation> => {
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
          const params = new URLSearchParams({
            coordinates: `${longitude},${latitude}`,
            locale,
          });

          const response = await fetch(
            `${API_URL}/geocoding/reverse?${params.toString()}`,
            {
              headers: { "x-api-version": "1" },
            },
          );

          if (!response.ok) {
            throw new Error("Reverse geocoding request failed");
          }

          const data = await response.json();

          const placeName =
            data[0]?.address ||
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
