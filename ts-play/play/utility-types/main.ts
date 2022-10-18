type P = Promise<string>
type Aw = Awaited<P> // model operation like await

interface Todo {
  title?: string
  description: string
}
type Pa = Partial<Todo>
type Re = Required<Todo>
type Rea = Readonly<Todo>
declare function freeze<Type>(obj: Type): Readonly<Type>

type Pi = Pick<Todo, 'title'>
type Om = Omit<Todo, 'title'>

type Ex = Exclude<'a' | 'b' | 'c', 'a'>
type Ext = Extract<'a' | 'b' | 'c', 'a' | 'f'>

type No = NonNullable<string | number | undefined>
export {}
