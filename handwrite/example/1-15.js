function ajax(options = {}) {
  const { method = 'GET', url } = options
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)

  xhr.onreadystatechange = function () {
    // xhr.DONE 4
    if (xhr.readyState !== 4) {
      return
    }
    if (xhr.status === 200) {
      console.log(xhr.response)
    } else {
      console.error(xhr.statusText)
    }
  }

  xhr.onerror = function () {
    console.log(xhr.statusText)
  }

  xhr.responseType = 'json'
  // xhr.setRequestHeader('Accept', 'application/json')
  xhr.send(null)
}

ajax({
  url: 'https://httpbin.org/get',
})
