const jobQueue = new Set()

let isFlushing = false
const p = Promise.resolve()

function flushJob() {
  if (isFlushing) {
    return
  }
  isFlushing = true
  p.then(() => {
    jobQueue.forEach((fn) => fn())
  })
    .catch(() => {})
    .finally(() => {
      isFlushing = false
    })
}

console.log('-----start-----')

const fn = () => {
  console.log(1)
}

for (let i = 0; i < 3; i++) {
  jobQueue.add(fn)
  flushJob()
}

console.log('-----end-----')
