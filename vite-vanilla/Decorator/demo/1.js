var Plane = function () {}
Plane.prototype.fire = function () {
  console.log('发射普通子弹')
}
var MissileDecorator = function (plane) {
  this.plane = plane
}
MissileDecorator.prototype.fire = function () {
  this.plane.fire()
  console.log('发射导弹')
}
var AtomDecorator = function (plane) {
  this.plane = plane
}
AtomDecorator.prototype.fire = function () {
  this.plane.fire()
  console.log('发射原子弹')
}
var plane = new Plane()
plane = new MissileDecorator(plane)
plane = new AtomDecorator(plane)
plane.fire()
// 分别输出： 发射普通子弹、发射导弹、发射原子弹
