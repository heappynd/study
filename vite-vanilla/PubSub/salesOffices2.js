const eventObj = {
  clientList: {},
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger(key, ...args) {
    const fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach((fn) => {
      fn.apply(this, args)
    })
  },
}

eventObj.remove = function (key, fn) {
  const fns = this.clientList[key]
  if (!fns) {
    return false
  }
  if (!fn) {
    // remove all listeners
    fns && (fns.length = 0)
  } else {
    for (let l = fns.length - 1; l >= 0; l--) {
      const _fn = fns[l]
      if (_fn === fn) {
        fns.splice(l, 1)
      }
    }
  }
}

const installEvent = (obj) => {
  for (const i in eventObj) {
    obj[i] = eventObj[i]
  }
}

const salesOffices = {}
installEvent(salesOffices)

const fn1 = (price) => {
  console.log('1', price)
}

salesOffices.listen('88', fn1)
salesOffices.listen('88', (price) => {
  console.log('2', price)
})

salesOffices.remove('88', fn1)

salesOffices.trigger('88', 50000)
