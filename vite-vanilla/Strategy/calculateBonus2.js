const PerformanceS = function () {}

PerformanceS.prototype.calculate = function (salary) {
  return salary * 4
}

const PerformanceA = function () {}

PerformanceA.prototype.calculate = function (salary) {
  return salary * 3
}

const Bonus = function () {
  this.salary = null
  this.strategy = null
}

Bonus.prototype.setSalary = function (salary) {
  this.salary = salary
}

Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}

Bonus.prototype.getBonus = function () {
  if (!this.strategy) {
    throw new Error('strategy property not set')
  }
  return this.strategy.calculate(this.salary)
}

const bonus = new Bonus()
bonus.setSalary(10000)
bonus.setStrategy(new PerformanceS())

console.log(bonus.getBonus())
