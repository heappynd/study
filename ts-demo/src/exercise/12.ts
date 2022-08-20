let a = [1, '2'] as const

function tuple<T extends unknown[]>(...ts: T): T {
  return ts
}

let b = tuple(1, '2')
