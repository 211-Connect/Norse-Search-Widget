import { useState } from "preact/hooks";
import { useWidgetConfig } from "./context/widget-context";
import { SearchModal } from "./components/search-modal/search-modal";
import { Input } from "./components/input/input";
import { SearchIcon } from "./icons";
import * as styles from "./search-widget.css";

export const SearchWidget = () => {
  const config = useWidgetConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div id="sw-container" className={styles.container}>
        <h2 id="sw-title" className={styles.title}>
          {config.texts?.title || "How can we help?"}
        </h2>
        <Input
          id="sw-search-input"
          size="md"
          placeholder={config.texts?.queryInputPlaceholder || undefined}
          onClick={() => setIsModalOpen(true)}
          readOnly
          Icon={SearchIcon}
        />
      </div>

      {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};
