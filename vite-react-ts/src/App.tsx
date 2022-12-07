import { useState } from 'react'
import InfiniteList from './components/Music/InfiniteList'
import SearchList from './components/Music/SearchList'
import TaskApp from './components/TaskApp'
import AddTodo from './components/Todos/AddTodo'
import TodoList from './components/Todos/TodoList'
import UseContext from './components/UseContext'
import UseReducer from './components/UseReducer'
import AddPostForm from './features/posts/AddPostForm'
import PostsList from './features/posts/PostsList'

function App() {
  return (
    <div className="App">
      {/* <UseReducer /> */}
      {/* <UseContext /> */}
      {/* <AddTodo /> */}
      {/* <SearchList /> */}
      {/* <InfiniteList /> */}
      <TaskApp />
    </div>
  )
}

export default App
