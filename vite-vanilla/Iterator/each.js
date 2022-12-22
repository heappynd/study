const each = (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    callback.call(array[i], i, array[i])
  }
}

each([1, 2, 3], (index, item) => {
  console.log(index, item)
})
