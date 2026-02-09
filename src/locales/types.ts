import { locales } from "./locales";

export type Locale = (typeof locales)[number];

export type DistanceTranslations = {
  distanceUnit: {
    singular: string;
    plural: string;
  };
  any: string;
  radius: string;
};
