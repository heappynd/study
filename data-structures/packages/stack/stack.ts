import { IStack } from "./interface";

export class Stack<T> implements IStack<T> {
  items: { [count: string]: T };
  count: number;

  constructor() {
    this.items = {};
    this.count = 0;
  }
  push(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }
  pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }
  isEmpty(): boolean {
    return this.count === 0;
  }
  clear(): void {
    this.items = {};
    this.count = 0;
    // 遵循LIFO清空
    while (!this.isEmpty()) {
      this.pop();
    }
  }
  size(): number {
    return this.count;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
