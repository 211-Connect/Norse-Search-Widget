import { useState } from "preact/hooks";
import { SearchWidgetConfig } from "./types/search-widget-config";
import { useWidgetConfig } from "./context/WidgetContext";
import { SearchModal } from "./components/SearchModal";
import { Input } from "./components/Input";
import { SearchIcon } from "./icons";
import * as styles from "./search-widget.css";

export const SearchWidget = ({}: SearchWidgetConfig) => {
  const config = useWidgetConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div id="sw-container" className={styles.container}>
        <h2 id="sw-title" className={styles.title}>
          {config.texts.title}
        </h2>
        <Input
          id="sw-search-input"
          size="md"
          placeholder={config.texts.queryInputPlaceholder}
          onClick={() => setIsModalOpen(true)}
          readOnly
          Icon={SearchIcon}
        />
      </div>

      {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
