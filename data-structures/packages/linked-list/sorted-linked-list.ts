import { Compare, defaultCompare, ICompareFunction } from '../utils'
import { LinkedList } from './linked-list'

export class SortedLinkedList<T> extends LinkedList<T> {
  compareFn: ICompareFunction<T> = defaultCompare

  push(element: T) {
    if (this.isEmpty()) {
      super.push(element)
    } else {
      const index = this.getIndexNextSortedElement(element)
      super.insert(element, index)
    }
  }

  insert(element: T, index: number = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }
    index = this.getIndexNextSortedElement(element)
    return super.insert(element, index)
  }

  private getIndexNextSortedElement(element: T) {
    let current = this.head
    let i = 0

    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element)
      if (comp === Compare.LESS_THAN) {
        return i
      }
      current = current.next
    }

    return i
  }
}
