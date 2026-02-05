import { useEffect, useState } from "preact/hooks";
import { useWidgetConfig } from "../../context/widget-context";
import {
  SearchResultsProvider,
  useSearchResults,
} from "../../context/search-results-context";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { SearchResultsList } from "../search-results-list/search-results-list";
import { SearchResults } from "../../types/search-results";
import { ChevronLeftIcon, SearchIcon, PlaceIcon } from "../../icons";
import * as styles from "./search-modal.css";

const getMockResults = (query: string, location: string): SearchResults => {
  if (!query.trim() && !location.trim()) {
    return { groups: [], items: [] };
  }

  if (location) {
    return {
      items: [
        {
          id: "location-result-1",
          text: `Results for location: ${location}`,
          Icon: PlaceIcon,
        },
        {
          id: "location-result-2",
          text: `Another result for location: ${location}`,
          Icon: PlaceIcon,
        },
      ],
    };
  }

  return {
    groups: [
      {
        id: "suggestions",
        title: "Suggestions",
        items: [
          {
            id: "suggestion-1",
            text: "I need help paying my utility (gas/electric/heating fuel/water) bill.",
            Icon: SearchIcon,
          },
        ],
      },
      {
        id: "taxonomies",
        title: "Taxonomies",
        items: [
          {
            id: "taxonomy-1",
            text: "Assistance Programs",
            badge: "BD-8540.200",
          },
        ],
      },
      {
        id: "topics",
        title: "Topics",
        items: [
          {
            id: "topic-1",
            text: "Utility Assistance",
            Icon: SearchIcon,
          },
          {
            id: "topic-2",
            text: "Utility Line Location Information/811 Services",
            Icon: SearchIcon,
          },
          {
            id: "topic-3",
            text: "Utility Bill Payment Plan Negotiation Assistance",
            Icon: SearchIcon,
          },
          {
            id: "topic-4",
            text: "Utility Disconnection Protection",
            Icon: SearchIcon,
          },
        ],
      },
    ],
  };
};

type SearchModalProps = {
  onClose: () => void;
};

const SearchModalContent = ({ onClose }: SearchModalProps) => {
  const config = useWidgetConfig();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const { setResults } = useSearchResults()!;

  useEffect(() => {
    setResults(getMockResults(searchQuery, locationQuery));
  }, [searchQuery, locationQuery, setResults]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.open(
        `${config.domain}?search=${encodeURIComponent(searchQuery)}`,
        "_blank",
      );
      onClose();
    }
  };

  return (
    <div id="search-modal" className={styles.overlay}>
      <div id="search-modal-content" className={styles.content}>
        <div id="search-modal-button-row" className={styles.buttonRow}>
          <Button
            id="search-modal-back-button"
            onClick={onClose}
            size="md"
            variant="secondary"
            Icon={ChevronLeftIcon}
          >
            Back
          </Button>
          <Button
            id="search-modal-search-button"
            onClick={handleSearch}
            size="md"
            variant="primary"
          >
            Search
          </Button>
        </div>

        <Input
          value={searchQuery}
          id="search-modal-query-input"
          size="sm"
          onInput={setSearchQuery}
          placeholder={config?.texts?.queryInputPlaceholder || undefined}
          autoFocus
          Icon={SearchIcon}
        />

        <Input
          value={locationQuery}
          id="search-modal-location-input"
          size="sm"
          onInput={setLocationQuery}
          placeholder={config.texts?.locationInputPlaceholder || undefined}
          Icon={PlaceIcon}
        />

        <SearchResultsList />
      </div>
    </div>
  );
};

export const SearchModal = ({ onClose }: SearchModalProps) => {
  return (
    <SearchResultsProvider>
      <SearchModalContent onClose={onClose} />
    </SearchResultsProvider>
  );
};
