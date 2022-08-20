function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
  return o[k]
}

type Get = {
  <O extends object, K1 extends keyof O>(obj: O, key1: K1): O[K1]

  <O extends object, K1 extends keyof O, K2 extends keyof O[K1]>(
    obj: O,
    key1: K1,
    key2: K2
  ): O[K1][K2]

  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(
    obj: O,
    key1: K1,
    key2: K2,
    key3: K3
  ): O[K1][K2][K3]
}
