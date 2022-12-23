const salesOffices = {
  clientList: {},
  listen(key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = []
    }
    this.clientList[key].push(fn)
  },
  trigger() {
    const key = Array.prototype.shift.call(arguments)
    const fns = this.clientList[key]
    if (!fns || fns.length === 0) {
      return false
    }
    fns.forEach((fn) => {
      fn.apply(this, arguments)
    })
  },
}

salesOffices.listen('squareMeter88', function (price) {
  console.log('this', this)
  console.log('price', price)
})

salesOffices.listen('squareMeter100', function (price) {
  console.log('this', this)
  console.log('price', price)
})

salesOffices.trigger('squareMeter88', 20000)
salesOffices.trigger('squareMeter88', 22000)
