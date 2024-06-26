try {
  setTimeout(() => {
    throw new Error('err')
  }, 200)
} catch (err) {
  console.log('1', err)
}
