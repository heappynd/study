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

const TodoList: FC = (): ReactElement => {
  // const [todoList, setTodoList] = useState<ITodo[]>([])
  const [state, dispatch] = useReducer(todoReducer, initialState)

  useEffect(() => {
    console.log(state.todoList)
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
