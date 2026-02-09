import { useRef, useState } from "preact/hooks";
import { useCmsConfig } from "./context/config-context";
import { SearchModal } from "./components/search-modal/search-modal";
import { Input } from "./components/input/input";
import { Button } from "./components/button/button";
import { SearchIcon, TargetIcon } from "./icons";
import * as styles from "./search-widget.css";
import { SearchProvider, useSearchContext } from "./context/search-context";

const SearchWidgetComponent = () => {
  const config = useCmsConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setFocusedInput, queryInputValue, locationInputValue } =
    useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const onQueryInputClick = () => {
    // blur the input to:
    // 1. prevent the on-screen keyboard from showing on mobile devices
    // 2. allow input in modal to be auto-focused
    inputRef.current?.blur();
    setFocusedInput("query");
    setIsModalOpen(true);
  };

  const onAddLocationClick = () => {
    setFocusedInput("location");
    setIsModalOpen(true);
  };

  return (
    <>
      <div id="sw-container" className={styles.container}>
        <h2 id="sw-title" className={styles.title}>
          {config.texts?.title || "How can we help?"}
        </h2>
        <Input
          id="sw-search-input"
          size="md"
          value={queryInputValue}
          placeholder={config.texts?.queryInputPlaceholder || undefined}
          onClick={onQueryInputClick}
          inputRef={inputRef}
          readOnly
          Icon={SearchIcon}
        />
        <Button
          id="sw-add-location-button"
          variant="link-white"
          size="sm"
          onClick={onAddLocationClick}
          Icon={TargetIcon}
          iconPosition="left"
        >
          {locationInputValue || "Add My Location"}
        </Button>
      </div>

      {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export const SearchWidget = () => (
  <SearchProvider>
    <SearchWidgetComponent />
  </SearchProvider>
);
