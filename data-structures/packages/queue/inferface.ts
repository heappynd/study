export interface IQueue<T> {
  enqueue(element: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  isEmpty(): boolean;
  size(): number;
  clear(): void;
  toString(): string;
}

export interface IDeque<T> {
  isEmpty(): boolean;
  size(): number;
  clear(): void;
  toString(): string;
  addFront(element: T): void;
  addBack(element: T): void;
  removeFront(): T | undefined;
  removeBack(): T | undefined;
  peekFront(): T | undefined;
  peekBack(): T | undefined;
}
