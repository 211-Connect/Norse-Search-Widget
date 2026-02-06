import { useEffect } from "preact/hooks";
import { debounce } from "radash";
import { useSearchContext } from "../context/search-context";
import { useConfigContext } from "../context/config-context";
import { SearchIcon } from "../icons";
import { fetchTaxonomies } from "../services/fetch-taxonomies";

export const useFetchTaxonomiesOnInputChange = () => {
  const { tenantId, locale } = useConfigContext();
  const {
    setResults,

    setQueryConfig,

    focusedInput,
    setFocusedInput,

    queryInputValue,
    setQueryInputValue,
  } = useSearchContext();

  useEffect(() => {
    if (focusedInput !== "query" || !queryInputValue.length) {
      return;
    }

    const debouncedFetch = debounce({ delay: 1000 }, async () => {
      try {
        const data = await fetchTaxonomies({
          locale,
          tenantId,
          query: queryInputValue,
        });

        setResults((val) => ({
          items: [],
          groups: [
            // Remove existing taxonomies group if present
            ...(val.groups || []).filter((g) => g.id !== "taxonomies"),
            ...(data.items.length
              ? [
                  {
                    id: "taxonomies",
                    title: "Taxonomies",
                    items: data.items.map((item) => ({
                      id: item.id,
                      text: item.name,
                      badge: item.code,
                      Icon: SearchIcon,
                      onClick: () => {
                        setQueryInputValue(item.name);
                        setFocusedInput(null);
                        setQueryConfig({
                          query: item.code,
                          queryLabel: item.name,
                          queryType: "taxonomy",
                        });
                      },
                    })),
                  },
                ]
              : []),
          ],
        }));
      } catch (error) {
        console.error("Failed to fetch taxonomies:", error);
      }
    });

    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [queryInputValue, focusedInput, locale, tenantId]);
};
