const el = document.querySelector('input')!

el.addEventListener('change', (e) => {
  console.log(el.files)

  const img = document.createElement('img')
  img.src = window.URL.createObjectURL(el.files![0])
  document.body.appendChild(img)

  const reader = new FileReader()

  reader.readAsDataURL(el.files![0].slice(0, 100))

  reader.onerror = function () {
    console.log(reader.error)
  }
  reader.onprogress = function (event) {
    console.log(event)
    console.log(reader.result)
    reader.abort()
  }
  reader.onload = function () {
    console.log(reader.result)
  }
})
