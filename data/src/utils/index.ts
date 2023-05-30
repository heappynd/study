export function swap<T>(array: T[], a: number, b: number) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}