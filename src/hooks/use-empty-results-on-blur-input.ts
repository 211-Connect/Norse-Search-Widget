import { useEffect } from "preact/hooks";
import { useSearchContext } from "../context/search-context";

export const useEmptyResultsOnBlurInput = () => {
  const { setResults, focusedInput } = useSearchContext();

  useEffect(() => {
    if (!focusedInput) {
      return setResults({
        groups: [],
        items: [],
      });
    }
  }, [focusedInput]);
};
