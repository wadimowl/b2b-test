export function uniqueId(): string {
  return Math.random().toString(16).slice(2);
}
