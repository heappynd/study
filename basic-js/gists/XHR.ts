function addURLParam(url: string, name: string, value: string | number) {
  url += url.indexOf('?') === -1 ? '?' : '&'
  url += encodeURIComponent(name) + '=' + encodeURIComponent(value)
  return url
}

const xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
  // console.log(xhr.readyState)
  // if (xhr.readyState === 4) {
  //   if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
  //     console.log(xhr.responseText)
  //   } else {
  //     console.error(xhr.status)
  //   }
  //   console.log(xhr.getAllResponseHeaders())
  //   console.log(xhr.getResponseHeader('content-Type'))
  // }
}
xhr.onload = function () {
  console.log(xhr.status)
}
xhr.onprogress = function (ev) {
  console.log(ev)
  console.log(ev.lengthComputable)
  console.log(ev.total, ev.loaded)
}
let url = 'https://jsonplaceholder.typicode.com/users'
// url = addURLParam(url, 'username', 'andy')
// url = addURLParam(url, 'age', 12)

xhr.open('get', url, true)

xhr.setRequestHeader('MyHeader', 'Value')

xhr.timeout = 1000
xhr.ontimeout = function () {
  console.error('timeout')
}
xhr.overrideMimeType('text/html')
xhr.send(null)

// console.log(xhr.responseText)
// console.log(xhr.readyState)
// console.log(xhr.statusText)

console.log(1)
