import { ValuePair } from '../models/value-pair'

export interface IDictionary<K, V> {
  toStrFn: (key: K) => string
  table: { [key: string]: ValuePair<K, V> }

  hasKey(key: K): boolean

  set(key: K, value: V): boolean

  remove(key: K): boolean

  get(key: K): V | undefined

  keyValues(): ValuePair<K, V>[]

  keys(): K[]

  values(): V[]

  forEach(callbackFn: (key: K, value: V) => any): void

  size(): number

  isEmpty(): boolean

  clear(): void

  toString(): string
}
