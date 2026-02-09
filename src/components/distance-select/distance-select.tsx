import { Select } from "../../ui/select/select";
import { useCmsConfig } from "../../context/config-context";
import { useConfigContext } from "../../context/config-context";
import { useSearchContext } from "../../context/search-context";
import {
  getDistanceLabel,
  getAnyDistanceLabel,
  getRadiusLabel,
} from "../../locales";
import * as styles from "./distance-select.css";

export const DistanceSelect = () => {
  const config = useCmsConfig();
  const configContext = useConfigContext();
  const { distance, setDistance, locationCoords } = useSearchContext();

  return (
    <div className={styles.radiusGroup}>
      <label
        htmlFor="search-modal-distance-select"
        className={styles.radiusLabel}
      >
        {getRadiusLabel(configContext.locale)}
      </label>
      <Select
        id="search-modal-distance-select"
        value={distance ?? "any"}
        onChange={(value) =>
          setDistance(value === "any" ? null : Number(value))
        }
        options={[
          {
            value: "any",
            label: getAnyDistanceLabel(configContext.locale),
          },
          ...config.radiusSelectValues.map((radius) => ({
            value: radius,
            label: getDistanceLabel(radius, configContext.locale),
          })),
        ]}
        size="sm"
        className={styles.distanceSelect}
        disabled={!locationCoords}
      />
    </div>
  );
};
