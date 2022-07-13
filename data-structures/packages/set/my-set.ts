import { IMySet } from './interface'

export class MySet<T extends string | number> implements IMySet<T> {
  items: any = {}

  add(element: T): boolean {
    if (!this.has(element)) {
      this.items[element] = element
      return true
    }
    return false
  }
  delete(element: T) {
    if (this.has(element)) {
      delete this.items[element]
      return true
    }
    return false
  }
  has(element: T): boolean {
    return Object.prototype.hasOwnProperty.call(this.items, element)
  }
  clear(): void {
    this.items = {}
  }
  size(): number {
    return Object.keys(this.items).length
  }
  values(): T[] {
    return Object.values(this.items)
  }

  union(otherSet: IMySet<T>): IMySet<T> {
    const unionSet = new MySet<T>()
    this.values().forEach((value) => unionSet.add(value)) // {2}
    otherSet.values().forEach((value) => unionSet.add(value)) // {3}
    return unionSet
  }

  intersection(otherSet: IMySet<T>): IMySet<T> {
    const set = new MySet<T>()
    this.values().forEach((value) => {
      if (otherSet.has(value)) {
        set.add(value)
      }
    })
    return set
  }

  difference(otherSet: IMySet<T>): IMySet<T> {
    const set = new MySet<T>()
    this.values().forEach((value) => {
      if (!otherSet.has(value)) {
        set.add(value)
      }
    })
    return set
  }

  isSubsetOf(otherSet: IMySet<T>): boolean {
    if (this.size() > otherSet.size()) {
      return false
    }
    let count = 0
    otherSet.values().forEach((value) => {
      if (this.has(value)) {
        count++
      }
    })
    return count === this.size()
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const values = this.values()
    let objString = `${values[0]}`
    for (let i = 1; i < values.length; i++) {
      objString = `${objString},${values[i].toString()}`
    }
    return objString
  }
}
