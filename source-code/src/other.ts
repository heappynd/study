export const jobQueue = new Set<() => any>()
const p = Promise.resolve()

let isFlusing = false
export function flushJob() {
  if (isFlusing) {
    return
  }
  isFlusing = true
  p.then(() => {
    jobQueue.forEach((job) => job())
  }).finally(() => {
    isFlusing = false
  })
}
