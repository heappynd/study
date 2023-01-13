function Model(sex, underwear) {
  this.sex = sex
  this.underwear = underwear
}
Model.prototype.takePhoto = function () {
  console.log('sex= ' + this.sex + ' underwear=' + this.underwear)
}
// actions
for (var i = 1; i <= 50000; i++) {
  var maleModel = new Model('male', 'underwear' + i)
  maleModel.takePhoto()
}
