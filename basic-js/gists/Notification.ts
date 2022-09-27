document.querySelector('button')?.addEventListener('click', (e) => {
  Notification.requestPermission().then((permission) => {
    console.log('User responded to permission request:', permission)

    new Notification('喝开水', {
      body: '熟水好吸收',
      // image
      // vibrate,
    })
  })
})

document.addEventListener('visibilitychange', (e) => {
  console.log(document.visibilityState)
  // console.log(document.hidden)
})
