import { useState } from "preact/hooks";
import { Button } from "../../ui/button/button";
import { TargetIcon, LoaderIcon } from "../../icons";
import { useCmsConfig } from "../../context/config-context";
import { useSearchContext } from "../../context/search-context";
import { getUserLocation } from "../../services/get-user-location";

type UseMyLocationButtonProps = {
  onError: (error: string) => void;
};

export const UseMyLocationButton = ({ onError }: UseMyLocationButtonProps) => {
  const config = useCmsConfig();
  const { setLocationInputValue, setLocationCoords, setFocusedInput } =
    useSearchContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    onError("");

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
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      id="search-modal-use-location-button"
      variant="link"
      size="sm"
      onClick={handleClick}
      Icon={isLoading ? LoaderIcon : TargetIcon}
      iconPosition="left"
      disabled={isLoading}
    >
      {isLoading ? "Getting location..." : "Use My Location"}
    </Button>
  );
};
