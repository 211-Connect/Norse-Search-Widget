import { useState } from "preact/hooks";
import { useWidgetConfig } from "../context/WidgetContext";
import { Input } from "./Input";
import { Button } from "./Button";
import { ChevronLeftIcon, SearchIcon } from "../icons";
import * as styles from "./SearchModal.css";

type SearchModalProps = {
  onClose: () => void;
};

export const SearchModal = ({ onClose }: SearchModalProps) => {
  const config = useWidgetConfig();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.open(
        `${config.domain}?search=${encodeURIComponent(searchQuery)}`,
        "_blank",
      );
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    } else if (e.key === "Escape") {
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
          id="search-modal-input"
          size="sm"
          onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
          onKeyDown={handleKeyDown}
          placeholder={config?.texts?.queryInputPlaceholder || undefined}
          autoFocus
          className={styles.focusInput}
          Icon={SearchIcon}
        />
      </div>
    </div>
  );
};
