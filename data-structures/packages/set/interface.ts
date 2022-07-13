export interface IMySet<T> {
  items: any

  add(element: T): boolean
  delete(element: T): boolean
  has(element: T): boolean
  clear(): void
  size(): number
  values(): T[]

  isEmpty(): boolean

  union(otherSet: IMySet<T>): IMySet<T>
  intersection(otherSet: IMySet<T>): IMySet<T>
  difference(otherSet: IMySet<T>): IMySet<T>
  isSubsetOf(otherSet: IMySet<T>): boolean

  toString(): string
}
