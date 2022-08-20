type IsString<T> = T extends string ? true : false

type A = IsString<string>

type Without<T, U> = T extends U ? never : T

type A1 = Without<boolean | number | string, boolean>

type ElementType<T> = T extends (infer U)[] ? U : T
type A2 = ElementType<number[]>

type SecondArg<F> = F extends (a: any, b: infer B) => any ? B : never
type F = typeof Array['prototype']['slice']
type A3 = SecondArg<F>
