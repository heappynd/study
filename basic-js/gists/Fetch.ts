fetch('https://api.github.com/users/heappynd').then((response) => {
  console.log(response)

  response.text().then((text) => {
    console.log(text)
  })
})

navigator.sendBeacon('/api/exit', 'test')
