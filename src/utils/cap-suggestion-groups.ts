import { SearchResultGroup } from "../types/search-results";

const MAX_ITEMS_PER_GROUP = 6;

export const capSuggestionGroups = (
  groups: SearchResultGroup[],
): SearchResultGroup[] => {
  const nonEmptyGroups = groups.filter((group) => group.items.length > 0);

  if (nonEmptyGroups.length < 2) {
    return groups;
  }

  return groups.map((group) => ({
    ...group,
    items: group.items.slice(0, MAX_ITEMS_PER_GROUP),
  }));
};
