export function listCreator() {
  // return a function
  return (dispatch) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        dispatch({
          type: 'get-list',
          list: json,
        })
      })
  }
}
