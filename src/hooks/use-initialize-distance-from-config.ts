import { useEffect } from "preact/hooks";
import { useCmsConfig } from "../context/config-context";
import { useSearchContext } from "../context/search-context";

export const useInitializeDistanceFromConfig = () => {
  const config = useCmsConfig();
  const { distance, setDistance } = useSearchContext();

  useEffect(() => {
    if (distance === null && config.defaultRadius) {
      setDistance(config.defaultRadius);
    }
  }, [config.defaultRadius, distance, setDistance]);
};
