import { useEffect, useRef } from "preact/hooks";
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

  // ref is necessary to access the latest value of focusedInput inside the debounced function
  const focusedInputRef = useRef(focusedInput);

  useEffect(() => {
    focusedInputRef.current = focusedInput;
  }, [focusedInput]);

  useEffect(() => {
    if (focusedInput !== "query" || !queryInputValue.length) {
      return;
    }

    setResults((val) => ({
      items: [],
      groups: [
        ...(val.groups || []).filter((g) => g.id !== "taxonomies"),
        {
          id: "taxonomies",
          title: "Taxonomies",
          items: [{ id: "loading", text: "Loading...", isLoading: true }],
        },
      ],
    }));

    const debouncedFetch = debounce({ delay: 1000 }, async () => {
      if (focusedInputRef.current !== "query") {
        return;
      }

      try {
        const data = await fetchTaxonomies({
          locale,
          tenantId,
          query: queryInputValue,
        });

        if (focusedInputRef.current !== "query") {
          return;
        }

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
