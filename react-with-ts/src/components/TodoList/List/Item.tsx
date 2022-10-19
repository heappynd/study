import React, { FC, ReactElement } from 'react'
import { ITodo } from '../typings'

interface IProps {
  todo: ITodo
  toggleTodo(id: number): void
  removeTodo(id: number): void
}

const TdItem: FC<IProps> = ({ todo, toggleTodo, removeTodo }): ReactElement => {
  const { id, content, completed } = todo

  return (
    <div>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {content}
      </span>
      <button onClick={() => removeTodo(id)}>-</button>
    </div>
  )
}

export default TdItem
