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

  return (
    <div>
      <TdInput addTodo={addTodo} todoList={state.todoList} />
      <TdList />
    </div>
  )
}

export default TodoList
