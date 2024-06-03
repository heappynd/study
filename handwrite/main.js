let p = new MyPromise((resolve, reject) => {
  console.log('promise')
  resolve(100)
  reject()
  // throw new Error('err info')
})
console.log('start')
console.log('p', p)

p.then(
  (value) => {
    console.log(value)
  },
  (reason) => {
    console.log(reason)
  }
)

function MyPromise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = undefined

  const _resolve = (value) => {
    if (this.PromiseState !== 'pending') {
      return
    }
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
  }

  const _reject = (err) => {
    // console.log(this)
    if (this.PromiseState !== 'pending') {
      return
    }
    this.PromiseState = 'rejected'
    this.PromiseResult = err
  }

  try {
    executor(_resolve, _reject)
  } catch (error) {
    this.PromiseState = 'rejected'
    this.PromiseResult = error
  }
}
