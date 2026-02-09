import { createContext } from "preact";
import {
  useContext,
  useState,
  useMemo,
  StateUpdater,
  Dispatch,
} from "preact/hooks";
import { SearchResults } from "../types/search-results";
import { QueryConfig } from "../types/query-config";

export type FocusedInput = "query" | "location" | null;

type SearchContextType = {
  results: SearchResults;
  setResults: Dispatch<StateUpdater<SearchResults>>;

  focusedInput: FocusedInput;
  setFocusedInput: Dispatch<StateUpdater<FocusedInput>>;

  queryConfig: QueryConfig | null;
  setQueryConfig: Dispatch<StateUpdater<QueryConfig | null>>;

  queryInputValue: string;
  setQueryInputValue: Dispatch<StateUpdater<string>>;

  locationInputValue: string;
  setLocationInputValue: Dispatch<StateUpdater<string>>;

  locationCoords: [number, number] | null;
  setLocationCoords: Dispatch<StateUpdater<[number, number] | null>>;

  distance: number | null;
  setDistance: Dispatch<StateUpdater<number | null>>;
};

const SearchContext = createContext<SearchContextType | null>(null);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within SearchProvider");
  }
  return context;
};

type SearchProviderProps = {
  children: preact.ComponentChildren;
};

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [results, setResults] = useState<SearchResults>({
    groups: [],
    items: [],
  });
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
  const [queryConfig, setQueryConfig] = useState<QueryConfig | null>(null);
  const [queryInputValue, setQueryInputValue] = useState("");
  const [locationInputValue, setLocationInputValue] = useState("");
  const [locationCoords, setLocationCoords] = useState<[number, number] | null>(
    null,
  );
  const [distance, setDistance] = useState<number | null>(null);

  const value = useMemo(
    () => ({
      results,
      setResults,

      focusedInput,
      setFocusedInput,

      queryConfig,
      setQueryConfig,

      queryInputValue,
      setQueryInputValue,

      locationInputValue,
      setLocationInputValue,

      locationCoords,
      setLocationCoords,

      distance,
      setDistance,
    }),
    [
      results,
      focusedInput,
      queryConfig,
      queryInputValue,
      locationInputValue,
      locationCoords,
      distance,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
