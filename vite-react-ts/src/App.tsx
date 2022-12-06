import { useState } from 'react'
import InfiniteList from './components/Music/InfiniteList'
import SearchList from './components/Music/SearchList'
import AddTodo from './components/Todos/AddTodo'
import TodoList from './components/Todos/TodoList'
import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostsList'

function App() {
  return (
    <div className="App">
      <AddTodo />
      {/* <SearchList /> */}
      {/* <InfiniteList /> */}
    </div>
  )
}

export default App
