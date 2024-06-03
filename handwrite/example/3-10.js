class Route {
  constructor() {
    this.routes = {}
    this.currentHash = ''
    this.freshRoute = this.freshRoute.bind(this)

    window.addEventListener('load', this.freshRoute, false)
    window.addEventListener('hashchange', this.freshRoute, false)
  }

  storeRoute(path, cb) {
    this.routes[path] = cb || function () {}
  }

  freshRoute() {
    console.log(location.href)
    this.currentHash = location.hash.slice(1) || '/'
    this.routes[this.currentHash]()
  }
}

let route = new Route()

route.storeRoute('/', () => {
  console.log('home')
})
route.storeRoute('/about', () => {
  console.log('about', route.currentHash)
})
