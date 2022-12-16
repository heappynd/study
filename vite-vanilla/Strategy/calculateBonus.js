const calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 5
  }
  if (performanceLevel === 'A') {
    return salary * 3
  }
  if (performanceLevel === 'B') {
    return salary * 2
  }
}

calculateBonus('S', 1000)
