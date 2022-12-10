class Tab {
  init() {}
  getData() {}
  render() {}
}

class Creator {
  startBuild(builder) {
    builder.init()
    builder.getData()
    builder.render()
  }
}

let op = new Creator()
op.startBuild(new Tab())
