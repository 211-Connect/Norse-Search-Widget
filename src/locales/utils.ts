import {
  distanceTranslations,
  textTranslations,
  otherTranslations,
} from "./translations";
import {
  DistanceTranslations,
  TextTranslations,
  OtherTranslations,
  Locale,
} from "./types";

export const getTranslations = (locale: string): DistanceTranslations => {
  return distanceTranslations[locale as Locale] || distanceTranslations.en;
};

export const getTextTranslations = (locale: string): TextTranslations => {
  return textTranslations[locale as Locale] || textTranslations.en;
};

export const getOtherTranslations = (locale: string): OtherTranslations => {
  return otherTranslations[locale as Locale] || otherTranslations.en;
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
