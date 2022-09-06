export function postsReducer(prevState = { list: [] }, action) {
  switch (action.type) {
    case 'get-list':
      return { list: action.list }
    default:
      return prevState
  }
}
