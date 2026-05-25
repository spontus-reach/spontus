export function optionalInteger(value: string): number | undefined {
  if (value.trim() === "") return undefined;

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? undefined : parsed;
}
