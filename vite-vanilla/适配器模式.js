class AMap {
  display() {
    console.log('map')
  }
}

class BMap {
  show() {
    console.log('map')
  }
}

class BMapAdapter extends BMap {
  constructor() {
    super()
  }
  display() {
    super.show()
  }
}

function renderMap(map) {
  map.display()
}
