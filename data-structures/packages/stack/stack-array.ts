import { IStack } from "./interface";

// const _items = Symbol('stackItems')

export class Stack<T> implements IStack<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }
  push(element: T): void {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
  peek() {
    return this.items[this.size() - 1];
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  clear(): void {
    this.items = [];
  }
  size(): number {
    return this.items.length;
  }
}
