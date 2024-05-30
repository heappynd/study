function getType(val) {
  // console.log(Object.prototype.toString.call(val)) // [object XXXX]
  console.log(Object.prototype.toString.call(val).slice(8, -1)) // [object XXXX]

  // return Object.prototype.toString.call(val)
}

getType(1)
getType('str')
getType(true)
getType(false)
getType(undefined)
getType(null)
getType(100n)
getType(Symbol())
getType([])
getType({})
getType(new Date())
getType(() => 1)

// number string boolean undefined null   symbol bigint
// object
