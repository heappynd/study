class CustomError extends Error {
  constructor(message) {
    super(message)
    this.name = 'CustomError'
    this.message = message
  }
}

try {
  throw new CustomError('my fault')
} catch (error) {
  console.log(error)
}

console.log(1)

try {
  // window.someNonexistentFunction()
  let a = x
} catch (error) {
  console.log(error)
  console.dir(error)
  if (error instanceof TypeError) {
    console.log('TypeError')
  }
}
