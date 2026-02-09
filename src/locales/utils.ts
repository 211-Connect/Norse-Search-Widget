import { translations } from "./translations";
import { DistanceTranslations, Locale } from "./types";

export const getTranslations = (locale: string): DistanceTranslations => {
  return translations[locale as Locale] || translations.en;
};

export const getDistanceLabel = (distance: number, locale: string): string => {
  const t = getTranslations(locale);
  const unitLabel =
    distance === 1 ? t.distanceUnit.singular : t.distanceUnit.plural;
  return `${distance} ${unitLabel}`;
};

export const getAnyDistanceLabel = (locale: string): string => {
  return getTranslations(locale).any;
};

export const getRadiusLabel = (locale: string): string => {
  return getTranslations(locale).radius;
};

export const getEverywhereLabel = (locale: string): string => {
  return getTranslations(locale).everywhere;
};
