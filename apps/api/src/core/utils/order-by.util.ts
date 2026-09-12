export function parseOrderBy(
  ordenParam?: string,
  fieldMapping?: Record<string, string | Record<string, string>>,
  defaultOrderBy?: any
): any {
  if (!ordenParam || typeof ordenParam !== 'string' || !ordenParam.trim()) {
    return defaultOrderBy;
  }

  const trimmed = ordenParam.trim();
  const isDesc = trimmed.startsWith('-');
  const fieldName = isDesc ? trimmed.substring(1) : trimmed;

  if (!fieldMapping || !(fieldName in fieldMapping)) {
    return defaultOrderBy;
  }

  const mapped = fieldMapping[fieldName];
  const direction = isDesc ? 'desc' : 'asc';

  if (typeof mapped === 'string') {
    return { [mapped]: direction };
  }

  if (typeof mapped === 'object' && mapped !== null) {
    const keys = Object.keys(mapped);
    if (keys.length > 0) {
      const topKey = keys[0];
      const subKey = (mapped as Record<string, string>)[topKey];
      return { [topKey]: { [subKey]: direction } };
    }
  }

  return defaultOrderBy;
}
