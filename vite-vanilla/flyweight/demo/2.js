function Model(sex) {
  this.sex = sex
}
Model.prototype.takePhoto = function () {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}
// actions
for (var i = 1; i <= 50000; i++) {
  var maleModel = new Model('male', 'underwear' + i)
  maleModel.takePhoto()
}
var maleModel = new Model('male'),
  femaleModel = new Model('female')
for (var i = 1; i <= 50; i++) {
  maleModel.underwear = 'underwear' + i
  maleModel.takePhoto()
}
for (var j = 1; j <= 50; j++) {
  femaleModel.underwear = 'underwear' + j
  femaleModel.takePhoto()
}
