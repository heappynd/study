Function.prototype.myBind = function (context) {
  const self = this // 保存原函数
  return function () {
    return self.apply(context, arguments)
  }
}

const obj = {
  name: 'seven',
}

const func = function () {
  alert(this.name)
}.myBind(obj)

func()
