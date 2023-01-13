var toolTipFactory = (function () {
  var toolTipPool = [] // toolTip 对象池
  return {
    create: function () {
      if (toolTipPool.length === 0) {
        // 如果对象池为空
        var div = document.createElement('div') // 创建一个 dom
        document.body.appendChild(div)
        return div
      } else {
        // 如果对象池里不为空
        return toolTipPool.shift() // 则从对象池中取出一个 dom
      }
    },
    recover: function (tooltipDom) {
      return toolTipPool.push(tooltipDom) // 对象池回收 dom
    },
  }
})()

var ary = []
debugger
for (var i = 0, str; (str = ['A', 'B'][i++]); ) {
  var toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
  ary.push(toolTip)
}
for (var i = 0, toolTip; (toolTip = ary[i++]); ) {
  toolTipFactory.recover(toolTip)
}
for (var i = 0, str; (str = ['A', 'B', 'C', 'D', 'E', 'F'][i++]); ) {
  var toolTip = toolTipFactory.create()
  toolTip.innerHTML = str
}
