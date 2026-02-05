import { createContext } from "preact";
import {
  useContext,
  useState,
  useMemo,
  StateUpdater,
  Dispatch,
} from "preact/hooks";
import { SearchResults } from "../types/search-results";

type SearchResultsContextType = {
  results: SearchResults;
  setResults: Dispatch<StateUpdater<SearchResults>>;
};

const SearchResultsContext = createContext<SearchResultsContextType | null>(
  null,
);

export const useSearchResults = () => {
  const context = useContext(SearchResultsContext);
  if (!context) {
    throw new Error(
      "useSearchResults must be used within SearchResultsProvider",
    );
  }
  return context;
};

type SearchResultsProviderProps = {
  children: preact.ComponentChildren;
};

export const SearchResultsProvider = ({
  children,
}: SearchResultsProviderProps) => {
  const [results, setResults] = useState<SearchResults>({
    groups: [],
    items: [],
  });

  const value = useMemo(() => ({ results, setResults }), [results]);

  return (
    <SearchResultsContext.Provider value={value}>
      {children}
    </SearchResultsContext.Provider>
  );
};
