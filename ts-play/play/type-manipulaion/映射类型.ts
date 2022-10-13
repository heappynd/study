export function a() {
  type OptionsFlags<Type> = {
    -readonly [Property in keyof Type]-?: boolean
  }
}

export function b() {
  // key remap
  // type MappedTypeWithNewProperties<Type> = {
  //   [Properties in keyof Type as NewKeyType]: Type[Properties]
  // }

  interface Person {
    name: string
    age: number
    location: string
  }
  type Getters<Type> = {
    [P in keyof Type as `get${Capitalize<string & P>}`]: () => Type[P]
  }
  type LazyPerson = Getters<Person>

  type RemoveField<T, Field> = {
    [P in keyof T as Exclude<P, Field>]: T[P]
  }
  type Kindless = RemoveField<Person, 'name'>
}
