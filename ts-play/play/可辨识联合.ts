// 可辨识联合
// When every type in a union contains a common property with literal types,
// TypeScript considers that to be a discriminated union,
// and can narrow out the members of the union.
interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'square'
  sideLength: number
}

type Shape = Circle | Square
// ---cut---
function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  }
}

export {}
