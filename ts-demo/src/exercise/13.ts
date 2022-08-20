function isString(a: unknown): a is string {
  return typeof a === 'string'
}

function parseInput(input: string | number) {
  if (isString(input)) {
    input
  }
}
