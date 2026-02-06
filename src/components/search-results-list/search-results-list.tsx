import { useSearchContext } from "../../context/search-context";
import { SearchResultItem } from "../../types/search-results";
import * as styles from "./search-results-list.css";

type SearchResultListItemProps = {
  item: SearchResultItem;
};

const SearchResultListItem = ({ item }: SearchResultListItemProps) => (
  <div className={styles.item} onClick={item.onClick}>
    {item.Icon && (
      <div className={styles.iconWrapper}>
        <item.Icon size={16} />
      </div>
    )}
    <span className={styles.itemText}>{item.text}</span>
    {item.badge && <span className={styles.badge}>{item.badge}</span>}
  </div>
);

export const SearchResultsList = () => {
  const { results } = useSearchContext();

  const hasResults =
    (results.groups && results.groups.length > 0) ||
    (results.items && results.items.length > 0);

  if (!hasResults) {
    return null;
  }

  return (
    <div id="search-results-list" className={styles.container}>
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
    </div>
  );
};
