export function formatAmount(
  value: string | number | null | undefined,
  fallback = "0",
): string {
  const amount = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(amount)) return fallback;
  const isInteger = Number.isInteger(amount);
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
