import React, { FC, ReactElement } from 'react'
import { ITodo } from '../typings'
import TdItem from './Item'

interface IProps {
  todoList: ITodo[]
  toggleTodo(id: number): void
  removeTodo(id: number): void
}

const TdList: FC<IProps> = ({
  todoList,
  toggleTodo,
  removeTodo,
}): ReactElement => {
  return (
    <div>
      {todoList &&
        todoList.map((todo) => (
          <TdItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />
        ))}
    </div>
  )
}

export default TdList
