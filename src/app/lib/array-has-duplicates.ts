export function arrayHasDuplicates(list: number[]): boolean {
  return new Set(list).size !== list.length;
}
