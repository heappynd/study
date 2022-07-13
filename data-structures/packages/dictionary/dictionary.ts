import { ValuePair } from '../models/value-pair'
import { defaultToString } from '../utils'
import { IDictionary } from './interface'

export class Dictionary<K, V> implements IDictionary<K, V> {
  toStrFn: (key: K) => string
  table: { [key: string]: ValuePair<K, V> }

  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  hasKey(key: K): boolean {
    return this.table[this.toStrFn(key)] != null
  }
  set(key: K, value: V): boolean {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }
  remove(key: K): boolean {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }
  get(key: K): V | undefined {
    const valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }
  keyValues(): ValuePair<K, V>[] {
    return Object.values(this.table)
  }
  keys(): K[] {
    return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.key)
  }
  values(): V[] {
    return this.keyValues().map((valuePair: ValuePair<K, V>) => valuePair.value)
  }
  forEach(callbackFn: (key: K, value: V) => any): void {
    const valuePairs = this.keyValues()
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      if (result === false) {
        break
      }
    }
  }
  size(): number {
    return Object.keys(this.table).length
  }
  isEmpty(): boolean {
    return this.size() === 0
  }
  clear(): void {
    this.table = {}
  }
  toString(): string {
    if (this.isEmpty()) {
      return ''
    }
    const valuePairs = this.keyValues()
    let objString = `${valuePairs[0].toString()}`
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`
    }
    return objString
  }
}
