// The unknown type represents any value.
// This is similar to the any type,
// but is safer because it’s not legal to do anything with an unknown value:
function f1(a: any) {
  a.b() // OK
}
function f2(a: unknown) {
  a.b()
}
declare const someRandomString: string
// ---cut---
function safeParse(s: string): unknown {
  return JSON.parse(s)
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString)
