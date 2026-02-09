import { locales } from "./locales";
import { SearchCmsConfig } from "src/types/search-cms-config";

export type Locale = (typeof locales)[number];

export type DistanceTranslations = {
  distanceUnit: {
    singular: string;
    plural: string;
  };
  any: string;
  radius: string;
  everywhere: string;
};

export type TextTranslations = Required<SearchCmsConfig["texts"]>;

export type OtherTranslations = {
  search: string;
  back: string;
  useMyLocation: string;
  gettingLocation: string;
  addMyLocation: string;
  clearInput: string;
  unableToRetrieveLocation: string;
  failedToLoadWidget: string;
  unknownError: string;
};
