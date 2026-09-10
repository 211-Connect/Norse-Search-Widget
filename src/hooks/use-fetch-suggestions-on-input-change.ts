import { useEffect, useRef } from "preact/hooks";
import { debounce } from "radash";
import { useSearchContext } from "../context/search-context";
import { useConfigContext } from "../context/config-context";
import { SearchIcon } from "../icons";
import { fetchSuggestions } from "../services/fetch-suggestions";
import {
  SuggestionOrganizationItem,
  SuggestionTaxonomyItem,
} from "../services/fetch-suggestions";
import { SearchResultGroup, SearchResultItem } from "../types/search-results";
import { capSuggestionGroups } from "../utils";

const formatOrganizationLocation = (
  item: SuggestionOrganizationItem,
): string | undefined => {
  const parts = [item.city, item.state].filter(Boolean);
  return parts.length > 0 ? parts.join(", ") : undefined;
};

const buildTaxonomyGroup = (
  items: SuggestionTaxonomyItem[],
  onClick: (item: SuggestionTaxonomyItem) => void,
): SearchResultGroup => ({
  id: "taxonomies",
  title: "Taxonomies",
  items: items.map(
    (item): SearchResultItem => ({
      id: item.id,
      text: item.name,
      badge: item.code,
      Icon: SearchIcon,
      onClick: () => onClick(item),
    }),
  ),
});

const buildOrganizationGroup = (
  items: SuggestionOrganizationItem[],
  onClick: (item: SuggestionOrganizationItem) => void,
): SearchResultGroup => ({
  id: "organizations",
  title: "Organizations",
  items: items.map(
    (item): SearchResultItem => ({
      id: item.organization_id,
      text: item.name,
      badge: formatOrganizationLocation(item),
      Icon: SearchIcon,
      onClick: () => onClick(item),
    }),
  ),
});

export const useFetchSuggestionsOnInputChange = () => {
  const { tenantId, locale } = useConfigContext();
  const {
    setResults,

    setQueryConfig,

    focusedInput,
    setFocusedInput,

    queryInputValue,
    setQueryInputValue,
  } = useSearchContext();

  const focusedInputRef = useRef(focusedInput);

  useEffect(() => {
    focusedInputRef.current = focusedInput;
  }, [focusedInput]);

  useEffect(() => {
    if (focusedInput !== "query" || !queryInputValue.length) {
      return;
    }

    setResults((val) => ({
      ...val,
      items: [{ id: "loading", text: "Loading...", isLoading: true }],
    }));

    const debouncedFetch = debounce({ delay: 1000 }, async () => {
      if (focusedInputRef.current !== "query") {
        return;
      }

      try {
        const data = await fetchSuggestions({
          locale,
          tenantId,
          query: queryInputValue,
        });

        if (focusedInputRef.current !== "query") {
          return;
        }

        setResults((val) => {
          const baseGroups = (val.groups || []).filter(
            (g) => g.id !== "taxonomies" && g.id !== "organizations",
          );

          const groups: SearchResultGroup[] = [...baseGroups];

          if (data.taxonomies.length) {
            groups.push(
              buildTaxonomyGroup(data.taxonomies, (item) => {
                setQueryInputValue(item.name);
                setFocusedInput(null);
                setQueryConfig({
                  query: item.code,
                  queryLabel: item.name,
                  queryType: "taxonomy",
                });
              }),
            );
          }

          if (data.organizations.length) {
            groups.push(
              buildOrganizationGroup(data.organizations, (item) => {
                setQueryInputValue(item.name);
                setFocusedInput(null);
                setQueryConfig({
                  query: "",
                  queryLabel: item.name,
                  queryType: "text",
                  organizationId: item.organization_id,
                });
              }),
            );
          }

          return {
            groups: capSuggestionGroups(groups),
            items: [],
          };
        });
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);

        if (focusedInputRef.current !== "query") {
          return;
        }

        setResults((val) => ({
          ...val,
          items: [
            {
              id: "error",
              text: "Failed to load suggestions. Please try again.",
              isError: true,
            },
          ],
        }));
      }
    });

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [queryInputValue, focusedInput, locale, tenantId]);
};
