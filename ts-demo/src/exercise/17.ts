interface Array<T> {
  zip<U>(list: U[]): [T, U][]
}

Array.prototype.zip = function <T, U>(this: T[], list: U[]) {
  return this.map((v, k) => tuple(v, list[k]))
}
