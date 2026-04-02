const CODE_PATTERN = /^[a-zA-Z]{1,2}(-\d{1,4}([.-]\d{1,4}){0,3})?$/i;
const JSON_PATTERN = /^\{.*\}$/;

function isTaxonomyQuery(value: string): boolean {
  if (JSON_PATTERN.test(value)) {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object";
    } catch {
      return false;
    }
  }

  return value.split(",").every((part) => CODE_PATTERN.test(part));
}

export function deriveQueryType(
  textInput: string,
  hybridSemanticSearchEnabled: boolean,
): string {
  if (isTaxonomyQuery(textInput)) {
    return "taxonomy";
  }

  return hybridSemanticSearchEnabled ? "hybrid" : "text";
}
