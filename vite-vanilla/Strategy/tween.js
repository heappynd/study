const tween = {
  /**
   * 线性
   * @param {*} t 动画已消耗时间
   * @param {*} b 小球原始位置
   * @param {*} c 小球目标位置
   * @param {*} d 动画持续的总时间
   * @returns 动画元素应该处在的当前位置
   */
  linear: function (t, b, c, d) {
    return (c * t) / d + b
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b
  },
  strongEaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b
  },
  strongEaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b
  },
  sineaseIn: function (t, b, c, d) {
    return c * (t /= d) * t * t + b
  },
  sineaseOut: function (t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b
  },
}

const div = document.createElement('div')
div.id = 'div'
div.style.position = 'absolute'
div.style.background = 'blue'
div.innerHTML = '我是DIV'
document.body.appendChild(div)

const Animate = function (dom) {
  this.dom = dom // 进行运动的 dom 节点
  this.startTime = 0 // 动画开始时间
  this.startPos = 0 // 动画开始时，dom 节点的位置，即 dom 的初始位置
  this.endPos = 0 // 动画结束时，dom 节点的位置，即 dom 的目标位置
  this.propertyName = null // dom 节点需要被改变的 css 属性名
  this.easing = null // 缓动算法
  this.duration = null // 动画持续时间
}

/**
 *
 * @param {*} propertyName 要改变的 CSS 属性名，比如'left'、'top'，分别表示左右移动和上下移动。
 * @param {*} endPos 小球运动的目标位置。
 * @param {*} duration 动画持续时间。
 * @param {*} easing 缓动算法
 */
Animate.prototype.start = function (propertyName, endPos, duration, easing) {
  this.startTime = +new Date() // 动画启动时间
  this.startPos = this.dom.getBoundingClientRect()[propertyName] // dom 节点初始位置
  this.propertyName = propertyName // dom 节点需要被改变的 CSS 属性名
  this.endPos = endPos // dom 节点目标位置
  this.duration = duration // 动画持续事件
  this.easing = tween[easing] // 缓动算法
  var self = this
  var timeId = setInterval(function () {
    // 启动定时器，开始执行动画
    if (self.step() === false) {
      // 如果动画已结束，则清除定时器
      clearInterval(timeId)
    }
  }, 19)
}

Animate.prototype.step = function () {
  var t = +new Date() // 取得当前时间
  if (t >= this.startTime + this.duration) {
    // (1)
    this.update(this.endPos) // 更新小球的 CSS 属性值
    return false
  }
  var pos = this.easing(
    t - this.startTime,
    this.startPos,
    this.endPos - this.startPos,
    this.duration
  )
  // pos 为小球当前位置
  this.update(pos) // 更新小球的 CSS 属性值
}
Animate.prototype.update = function (pos) {
  this.dom.style[this.propertyName] = pos + 'px'
}
var animate = new Animate(div)
animate.start('left', 500, 1000, 'strongEaseOut')
// animate.start( 'top', 1500, 500, 'strongEaseIn' );
