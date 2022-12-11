class Subject {
  constructor() {
    this.observers = []
  }

  add(ob) {
    this.observers.push(ob)
  }

  notify() {
    this.observers.forEach((ob) => ob.update())
  }

  remove(observer) {
    this.observers = this.observers.filter((ob) => ob !== observer)
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }
  update() {
    console.log(this.name, 'updated')
  }
}
// 当一个对象发生改变时，依赖它的对象得到通知并自动更新
const subject = new Subject()
const observer1 = new Observer('observer1')
const observer2 = new Observer('observer2')

subject.add(observer1)
subject.add(observer2)

setTimeout(() => {
  subject.remove(observer2)
}, 2000)

setTimeout(() => {
  subject.notify()
}, 2000)
