function request(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url, true)

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return
      }
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.statusText))
      }
    }

    xhr.onerror = function () {
      reject(new Error(xhr.statusText))
    }

    // xhr.setRequestHeader('', '')
    xhr.responseType = 'json'
    xhr.send(null)
  })
}

request('https://httpbin.org/500')
  .then((res) => {
    console.log('res', res)
  })
  .catch((err) => {
    console.log('err', err)
  })
