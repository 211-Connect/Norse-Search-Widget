export type QueryConfig =
  | {
      href: string;
      openInNewTab: boolean;
    }
  | {
      query: string;
      queryLabel: string;
      queryType: "suggestion" | "topic" | "taxonomy" | "text";
    };
