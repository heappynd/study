import inquire from 'inquirer'

function make({
  choices,
  defaultValue,
  message = '请选择',
  type = 'list',
  required = true,
  mask = '*',
  validate,
  pageSize,
  loop,
}) {
  const options = {
    name: 'name',
    default: defaultValue,
    message,
    type,
    required,
    mask,
    validate,
    pageSize,
    loop,
  }
  if (type === 'list') {
    options.choices = choices
  }
  return inquire.prompt(options).then((answer) => {
    return answer.name
  })
}

export function makeList(params) {
  return make({ ...params })
}

export function makeInput(params) {
  return make({ type: 'input', ...params })
}