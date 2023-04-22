const defaultState = {
  num: 20,
}

export function addAsync() {
  console.log(1);
  
  return (dispatch) => {
    setTimeout(() => {
      dispatch({ type: 'add' })
    })
  }
}

let reducer = (state = defaultState, action) => {
  // dispatch 会触发这里
  console.log('trigger reducer')

  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case 'add':
      newState.num++

      break
    case 'add2':
      newState.num += action.value
      break
    default:
      break
  }

  return newState
}

export default reducer
