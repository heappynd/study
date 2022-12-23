const salesOffices = {
  clientList: [],
  listen(fn) {
    this.clientList.push(fn)
  },
  trigger() {
    this.clientList.forEach((fn) => {
      fn.apply(this, arguments)
    })
  },
}

salesOffices.listen(function (price, squareMeter) {
  console.log('this', this)
  console.log('price', price)
  console.log('squareMeter', squareMeter)
})

salesOffices.trigger(2000, 88)
