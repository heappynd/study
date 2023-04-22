const defaultState = {
  count: 0,
}

let countReducer = (state = defaultState, action) => {
  // dispatch 会触发这里
  console.log('trigger reducer2')

  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'plus':
      newState.count++
      break
    default:
      break
  }

  return newState
}

export default countReducer
