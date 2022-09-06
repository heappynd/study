function createMyStore(reducer) {
  const list = []
  let state = reducer(undefined, {})

  function subscribe(callback) {
    list.push(callback)
  }
  function dispatch(action) {
    state = reducer(state, action)
    for (const cb of list) {
      cb && cb()
    }
  }

  function getState() {
    return state
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}
