import { useSearchContext } from "../../context/search-context";
import { useConfigContext } from "../../context/config-context";
import { getOtherTranslations } from "../../locales";
import { SearchResultItem } from "../../types/search-results";
import { SearchNotFoundIcon, LoaderIcon, AlertCircleIcon } from "../../icons";
import * as styles from "./search-results-list.css";

type SearchResultListItemProps = {
  item: SearchResultItem;
};

const SearchResultListItem = ({ item }: SearchResultListItemProps) => (
  <div
    className={item.isError ? styles.errorItem : styles.item}
    onClick={item.isLoading || item.isError ? undefined : item.onClick}
  >
    {item.Icon && (
      <div className={styles.iconWrapper}>
        <item.Icon size={16} />
      </div>
    )}
    {item.isLoading && (
      <div className={styles.iconWrapper}>
        <LoaderIcon size={16} />
      </div>
    )}
    {item.isError && (
      <div className={styles.errorIconWrapper}>
        <AlertCircleIcon size={16} />
      </div>
    )}
    <span className={item.isError ? styles.errorText : styles.itemText}>
      {item.text}
    </span>
    {item.badge && <span className={styles.badge}>{item.badge}</span>}
  </div>
);

export const SearchResultsList = () => {
  const { locale } = useConfigContext();
  const { results, queryInputValue, focusedInput } = useSearchContext();

  const otherTexts = getOtherTranslations(locale);

  const hasResults =
    (results.groups && results.groups.length > 0) ||
    (results.items && results.items.length > 0);

  const showPlaceholder =
    focusedInput === "query" && queryInputValue.length > 0 && !hasResults;

  if (!hasResults && !showPlaceholder) {
    return null;
  }

  return (
    <div id="search-results-list" className={styles.container}>
      {showPlaceholder ? (
        <div
          id="search-results-list-placeholder"
          className={styles.placeholder}
        >
          <SearchNotFoundIcon size={36} />
          {otherTexts.noSuggestionsFound}
        </div>
      ) : (
        <>
          {results.groups?.map((group) => (
            <div key={group.id} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.title}</h3>
              <div className={styles.itemsList}>
                {group.items.map((item) => (
                  <SearchResultListItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}

          {results.items && results.items.length > 0 && (
            <div className={styles.itemsList}>
              {results.items.map((item) => (
                <SearchResultListItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
