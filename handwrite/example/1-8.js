function debounce(fn, ms) {
  let timer = null

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}

function log(e) {
  console.log(1, e, this)
}

const dLog = debounce(log, 300)

window.addEventListener('resize', dLog)
