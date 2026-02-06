export type SearchCmsConfig = {
  primaryColor: string;
  borderRadius: string;
  domain: string;
  texts?: {
    title?: string | null;
    queryInputPlaceholder?: string | null;
    locationInputPlaceholder?: string | null;
    noResultsFallbackText?: string | null;
  };
  resultsLimit: number;
  radiusSelectValues: number[];
  defaultRadius: number;
  suggestions: {
    value: string;
    taxonomies: string;
    id?: string | null;
  }[];
  subtopics: {
    name: string;
    topicName: string;
    queryType: "link" | "text" | "taxonomy";
    query: string | null;
    openInNewTab: boolean | null;
    href: string | null;
  }[];
};
