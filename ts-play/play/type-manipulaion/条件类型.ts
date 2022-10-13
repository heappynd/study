export function a() {
  interface IdLabel {
    id: number /* some fields */
  }
  interface NameLabel {
    name: string /* other fields */
  }

  function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
    throw 'unimplemented'
  }
  // 如果T是联合类型 会拆开一个一个去判断 其结果也是联合类型
  // 会被分发 不想被分发 [T] extends [number]
  type NameOrId<T extends string | number> = T extends number
    ? IdLabel
    : NameLabel

  let c = createLabel(Math.random() ? 'hello' : 42)
}

export function b() {
  type MessageOf<T> = T extends { message: unknown } ? T['message'] : never

  interface Email {
    message: string
  }
  type EmailMessageContents = MessageOf<Email>
}

export function c() {
  // type Flatten<T> = T extends unknown[] ? T[number] : T
  type Flatten<T> = T extends Array<infer Item> ? Item : T

  type Str = Flatten<string[]>

  type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
    ? Return
    : never
}
