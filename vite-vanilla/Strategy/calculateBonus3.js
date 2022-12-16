const strategy = {
  S(salary) {
    return salary * 4
  },
  A(salary) {
    return salary * 3
  },
}

function calculateBonus(level, salary) {
  return strategy[level](salary)
}
