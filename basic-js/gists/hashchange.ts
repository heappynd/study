window.addEventListener('hashchange', (e) => {
  console.log(e)

  console.log(e.oldURL)
  console.log(e.newURL)
  console.log(location.hash)
})
