function MyPromise(executor) {
  this.PromiseState = 'pending'
  this.PromiseResult = undefined
  // this.callbackFn = {}
  this.callbackFn = []

  const _resolve = (value) => {
    if (this.PromiseState !== 'pending') {
      return
    }
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value

    this.callbackFn.forEach((item) => {
      item.onFulfilled()
    })
  }

  const _reject = (err) => {
    // console.log(this)
    if (this.PromiseState !== 'pending') {
      return
    }
    this.PromiseState = 'rejected'
    this.PromiseResult = err

    this.callbackFn.forEach((item) => {
      item.onRejected()
    })
  }

  try {
    executor(_resolve, _reject)
  } catch (error) {
    this.PromiseState = 'rejected'
    this.PromiseResult = error
  }
}

Object.assign(MyPromise.prototype, {
  then(onFulfilled, onRejected) {
    // then方法如果省略了成功的回调函数,则默认成功的回调函数为value=>value
    // then方法如果省略了失败的回调函数，则默认失败的回调函数为reason=>{throw reason}

    if (!(onFulfilled instanceof Function)) {
      onFulfilled = (value) => value
    }

    if (!(onRejected instanceof Function)) {
      onRejected = (reason) => {
        throw reason
      }
    }

    // console.log('this', this)
    return new MyPromise((resolve, reject) => {
      const _common = (callback) => {
        // 修改成异步的
        setTimeout(() => {
          try {
            const res = callback(this.PromiseResult)
            // console.log('res', res)
            if (res instanceof MyPromise) {
              res.then(resolve, reject)
            } else {
              resolve(res)
            }
          } catch (error) {
            reject(error)
          }
        }, 0)
      }

      if (this.PromiseState === 'fulfilled') {
        // 修改成异步的
        _common(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        _common(onRejected)
      } else {
        // Pending
        this.callbackFn.push({
          onFulfilled: _common.bind(this, onFulfilled),
          onRejected: _common.bind(this, onRejected),
        })
      }
    })
  },
  catch(onRejected) {
    return this.then(undefined, onRejected)
  },
})

MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) {
    return value
  } else {
    return new MyPromise((resolve) => {
      resolve(value)
    })
  }
}

// Promise reject 不受参数影响 这点和 resolve 不一样
MyPromise.reject = function (value) {
  return new MyPromise((resolve, reject) => {
    reject(value)
  })
}

MyPromise.all = function (promiseArr) {
  let count = 0
  let successArr = new Array(promiseArr.length)
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      const promise = promiseArr[i]
      promise.then(
        (value) => {
          count++
          successArr[i] = value
          //
          if (count === promiseArr.length) {
            resolve(successArr)
          }
        },
        (reason) => {
          // 有一个是失败的状态 则整体都是失败的
          reject(reason)
        }
      )
    }
  })
}

MyPromise.race = function (promiseArr) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promiseArr.length; i++) {
      const promise = promiseArr[i]
      promise.then(
        (value) => {
          resolve(value)
        },
        (reason) => {
          reject(reason)
        }
      )
    }
  })
}

const p1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})
const p2 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})
const p3 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(3)
  }, 3000)
})

// const pAll = MyPromise.all([p1, p2, p3])

// pAll
//   .then((value) => {
//     console.log('value', value)
//   })
//   .catch((reason) => {
//     console.log('reason', reason)
//   })

const pRace = MyPromise.race([p1, p2, p3])

pRace
  .then((value) => {
    console.log('value', value)
  })
  .catch((reason) => {
    console.log('reason', reason)
  })

// let p = new MyPromise((resolve, reject) => {
//   console.log('promise')
//   // resolve('ok')
//   // reject('Something has bug')
//   // throw 'err info'

//   setTimeout(() => {
//     resolve(1000)
//     // reject(1000)
//   }, 1000)
// })
// console.log('start')
// console.log('p', p)

// p.then((value) => {
//   console.log(value)
//   return 2000
// })
//   .then((value) => {
//     throw '异常'
//   })
//   .then((value) => {
//     console.log(value)
//     return 4000
//   })
//   .then((value) => {
//     console.log(value)
//     return 5000
//   })
//   .catch((reason) => {
//     console.log(reason)
//   })

// p.catch((reason) => {
//   console.log('失败', reason)
// })

// p.then(
//   () => {
//     console.log('成功1')
//   },
//   () => {
//     console.log('失败1')
//   }
// )

// p.then(
//   () => {
//     console.log('成功2')
//   },
//   () => {
//     console.log('失败2')
//   }
// )

// const p2 = p.then(
//   (value) => {
//     console.log(value)
//     // return [1, 2]
//     // return new MyPromise((resolve) => {
//     //   resolve(1)
//     // })
//     // return new MyPromise((resolve, reject) => {
//     //   reject(-1)
//     // })
//     throw '异常3'
//   },
//   (reason) => {
//     console.log(reason)
//     // return reason + '111'
//     // return new MyPromise((resolve) => {
//     //   resolve(1)
//     // })
//     // return new MyPromise((resolve, reject) => {
//     //   reject(-1)
//     // })
//     throw '异常4'
//   }
// )

console.log('end')

// console.log('p2', p2)

// let realP = Promise.resolve('realOk')
// realP
//   .then(() => Promise.resolve('s1'))
//   .then((res) => {
//     console.log('res', res)
//   })
