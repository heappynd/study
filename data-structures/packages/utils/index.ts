export type IEqualsFunction<T> = (a: T, b: T) => boolean
export type ICompareFunction<T> = (a: T, b: T) => number

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0,
}

export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b
}
export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.EQUALS
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export function defaultToString(item: any): string {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString() // {1}
}

export function swap(array: any[], a: number, b: number) {
  ;[array[a], array[b]] = [array[b], array[a]]
}
