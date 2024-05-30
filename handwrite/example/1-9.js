function throttle(fn, ms) {
  let timer = null

  return function (...args) {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, ms)
  }
}

function log(e) {
  console.log(1, e, this)
}

const dLog = throttle(log, 1000)

window.addEventListener('resize', dLog)
