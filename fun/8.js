foo(typeof a)
function foo(p) {
  console.log(this)
  console.log(p)
  console.log(typeof b)
  let b = 0
}

// window
// undefined
// throw error ReferenceError: Cannot access 'b' before initialization
