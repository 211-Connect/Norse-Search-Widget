import { useRef, useState } from "preact/hooks";
import { useCmsConfig, useConfigContext } from "./context/config-context";
import { SearchModal } from "./components/search-modal/search-modal";
import { Input } from "./ui/input/input";
import { Button } from "./ui/button/button";
import { SearchIcon, TargetIcon } from "./icons";
import * as styles from "./search-widget.css";
import { SearchProvider, useSearchContext } from "./context/search-context";
import { getOtherTranslations, getTextTranslations } from "./locales";

const SearchWidgetComponent = () => {
  const config = useCmsConfig();
  const { locale } = useConfigContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setFocusedInput, queryInputValue, locationInputValue } =
    useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const fallbackTexts = getTextTranslations(locale);
  const otherTexts = getOtherTranslations(locale);

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
          {config.texts?.title ?? fallbackTexts?.title}
        </h2>
        <Input
          id="sw-search-input"
          size="md"
          value={queryInputValue}
          placeholder={
            config.texts?.queryInputPlaceholder ??
            fallbackTexts?.queryInputPlaceholder
          }
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
          {locationInputValue || otherTexts.addMyLocation}
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
