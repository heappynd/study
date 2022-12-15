const MyApp = {}

MyApp.namespace = function (name) {
  const parts = name.split('.')
  let current = MyApp
  for (const item of parts) {
    if (!current[item]) {
      current[item] = {}
    }
    current = current[item]
  }
}

MyApp.namespace('event')
MyApp.namespace('dom.style.a.b')
MyApp.namespace('css')

console.log(JSON.stringify(MyApp, null, 2))
