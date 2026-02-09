export type QueryConfig = {
  location?: string | null;
  coords?: string | null;
  distance?: number | null;
} & (
  | {
      href: string;
      openInNewTab: boolean;
    }
  | {
      query: string;
      queryLabel: string;
      queryType: "suggestion" | "topic" | "taxonomy" | "text";
    }
);
