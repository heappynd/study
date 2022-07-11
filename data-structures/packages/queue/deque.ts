import { IDeque } from "./inferface";

export class Deque<T> implements IDeque<T> {
  items: { [count: string]: T };
  lowestCount: number;
  count: number;

  constructor() {
    this.items = {};
    this.lowestCount = 0;
    this.count = 0;
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  size(): number {
    return this.count - this.lowestCount;
  }
  clear(): void {
    this.items = {};
    this.lowestCount = 0;
    this.count = 0;
  }
  toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
  addFront(element: T): void {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }
  addBack(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }
  // queue dequeue
  removeFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  // stack pop
  removeBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.count - 1];
    delete this.items[this.count - 1];
    this.count--;
    return result;
  }
  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  peekBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
}
