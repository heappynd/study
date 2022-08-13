function fpp() {
  return new Promise((resolve, reject) => {
    console.log(100)
    resolve(100)
  })
}

await fpp()
