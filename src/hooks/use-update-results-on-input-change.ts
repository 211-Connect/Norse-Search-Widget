import { useEffect } from "preact/hooks";
import { useSearchContext } from "../context/search-context";
import { useCmsConfig } from "../context/config-context";
import { SearchIcon } from "../icons";
import { SearchResults } from "../types/search-results";
import { SearchCmsConfig } from "src/types/search-cms-config";

export const useUpdateResultsOnInputChange = () => {
  const config = useCmsConfig();
  const {
    setResults,

    setQueryConfig,

    focusedInput,
    setFocusedInput,

    queryInputValue,
    setQueryInputValue,
  } = useSearchContext();

  const toSuggestionGroup = (suggestions: SearchCmsConfig["suggestions"]) => ({
    id: "suggestions",
    title: "Suggestions",
    items: suggestions.map((suggestion, index) => ({
      id: `suggestion-${suggestion.value}-${index}`,
      text: suggestion.value,
      Icon: SearchIcon,
      onClick: () => {
        setQueryInputValue(suggestion.value);
        setFocusedInput(null);
        setQueryConfig({
          query: suggestion.taxonomies,
          queryLabel: suggestion.value,
          queryType: "taxonomy",
        });
      },
    })),
  });

  useEffect(() => {
    if (focusedInput !== "query") {
      return;
    }

    if (!queryInputValue.length) {
      return setResults({
        groups: [toSuggestionGroup(config.suggestions)],
        items: [],
      });
    }

    const filteredSuggestions = config.suggestions.filter((suggestion) =>
      suggestion.value.toLowerCase().includes(queryInputValue.toLowerCase()),
    );
    const filteredSubtopics = config.subtopics.filter((subtopic) =>
      subtopic.name.toLowerCase().includes(queryInputValue.toLowerCase()),
    );
    const newResults: SearchResults = {
      groups: [],
      items: [],
    };

    if (filteredSuggestions.length > 0) {
      newResults.groups!.push(toSuggestionGroup(filteredSuggestions));
    }

    if (filteredSubtopics.length > 0) {
      newResults.groups!.push({
        id: "topics",
        title: "Topics",
        items: filteredSubtopics.map((subtopic, index) => ({
          id: `topic-${subtopic.name}-${index}`,
          text: subtopic.name,
          Icon: SearchIcon,
          onClick: () => {
            if (subtopic.queryType === "link") {
              if (!subtopic.href) {
                return console.warn(
                  `Subtopic "${subtopic.name}" is missing 'href' for link type.`,
                );
              }

              setQueryInputValue(subtopic.name);
              setFocusedInput(null);
              return setQueryConfig({
                href: subtopic.href,
                openInNewTab: subtopic.openInNewTab || false,
              });
            }

            if (!subtopic.query && subtopic.queryType !== "text") {
              return console.warn(
                `Subtopic "${subtopic.name}" ("${subtopic.topicName}") is missing 'query' for topic type.`,
              );
            }

            setQueryInputValue(subtopic.name);
            setFocusedInput(null);
            setQueryConfig({
              query: subtopic.query || subtopic.name,
              queryLabel: subtopic.name,
              queryType: subtopic.queryType || "text",
            });
          },
        })),
      });
    }

    setResults(newResults);
  }, [queryInputValue, focusedInput]);
};
