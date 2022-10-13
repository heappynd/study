interface Shape {}
declare function getShape(): Shape

interface PaintOptions {
  shape: Shape
  xPos?: number
  yPos?: number
}

// setting defaults for unspecified values
// a destructuring pattern
function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log('x coordinate at', xPos)
  console.log('y coordinate at', yPos)
}
