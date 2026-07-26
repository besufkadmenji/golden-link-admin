const formatLocalDateParts = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return { y, m, d };
};

/** Local calendar day → UTC midnight ISO (e.g. 2026-07-23T00:00:00.000Z) */
export const toApiStartDateIso = (date: Date): string => {
  const { y, m, d } = formatLocalDateParts(date);
  return `${y}-${m}-${d}T00:00:00.000Z`;
};

/** Local calendar day → UTC end-of-day ISO (e.g. 2026-12-31T23:59:59.999Z) */
export const toApiEndDateIso = (date: Date): string => {
  const { y, m, d } = formatLocalDateParts(date);
  return `${y}-${m}-${d}T23:59:59.999Z`;
};
