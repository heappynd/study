const performanceS = function (salary) {
  return salary * 4
}
const performanceA = function (salary) {
  return salary * 3
}
const performanceB = function (salary) {
  return salary * 2
}

const calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return performanceS(salary)
  }
  if (performanceLevel === 'A') {
    return performanceA(salary)
  }
  if (performanceLevel === 'B') {
    return performanceB(salary)
  }
}

calculateBonus('S', 1000)
