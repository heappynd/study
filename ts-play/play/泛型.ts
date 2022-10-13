function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0]
}
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func)
}
const parsed = map(['1', '2', '3'], (n) => parseInt(n))

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
}

function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj
  } else {
    return { length: minimum }
  }
}

// When writing a function type for a callback,
// never write an optional parameter unless you intend to call the function without passing that argument
