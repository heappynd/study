import React, {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react'
import TdInput from './Input'
import TdList from './List'
import { todoReducer } from './reducer'
import { ACTION_TYPE, IState, ITodo } from './typings'

const initialState: IState = {
  todoList: [],
}

function init(initTodoList: ITodo[]): IState {
  return {
    todoList: initTodoList,
  }
}

const TodoList: FC = (): ReactElement => {
  // const [todoList, setTodoList] = useState<ITodo[]>([])
  // const [state, dispatch] = useReducer(todoReducer, initialState)
  // 惰性初始化 只有执行的时候才才创建
  const [state, dispatch] = useReducer(todoReducer, [], init)

  useEffect(() => {
    const todoList = JSON.parse(localStorage.getItem('todolist') || '[]')
    dispatch({ type: ACTION_TYPE.INIT_TODOLIST, payload: todoList })
  }, [])

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(state.todoList))
  }, [state.todoList])

  const addTodo = useCallback((todo: ITodo) => {
    console.log(todo)
    // setTodoList((todoList) => [...todoList, todo])
    dispatch({ type: ACTION_TYPE.ADD_TODO, payload: todo })
  }, [])

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: ACTION_TYPE.REMOVE_TODO, payload: id })
  }, [])
  const toggleTodo = useCallback((id: number) => {
    dispatch({ type: ACTION_TYPE.TOGGLE_TODO, payload: id })
  }, [])

  return (
    <div>
      <TdInput addTodo={addTodo} todoList={state.todoList} />
      <TdList
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  )
}

export default TodoList
