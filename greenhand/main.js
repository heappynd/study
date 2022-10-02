let url = 'xxx'
var asss = 'sss'

function buildUrl() {
  let qs = '?debug=true'
  with (location) {
    let url = href + qs
  }
  return url
}

buildUrl()
