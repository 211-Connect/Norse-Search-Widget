import { ComponentType } from "preact";
import { IconProps } from "../icons/types";

export type SearchResultItem = {
  id: string;
  text: string;
  onClick?: () => void;
  Icon?: ComponentType<IconProps>;
  badge?: string;
  isLoading?: boolean;
  isError?: boolean;
};

export type SearchResultGroup = {
  id: string;
  title: string;
  items: SearchResultItem[];
};

export type SearchResults = {
  groups?: SearchResultGroup[];
  items?: SearchResultItem[];
};
