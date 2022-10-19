import React, { FC, ReactElement, useRef } from 'react'
import { ITodo } from '../typings'

interface IProps {
  addTodo(todo: ITodo): void
  todoList: ITodo[]
}

const TdInput: FC<IProps> = ({ addTodo, todoList }): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null)

  const addItem = (): void => {
    const val = inputRef.current!.value.trim()
    if (val.length) {
      const isExist = todoList.find((todo) => todo.content === val)
      if (isExist) {
        alert('已存在该项')
        return
      }
      addTodo({ id: Date.now(), content: val, completed: false })
      inputRef.current!.value = ''
    }
  }

  return (
    <div>
      <input type="text" placeholder="Please input" ref={inputRef} />
      <button onClick={addItem}>+</button>
    </div>
  )
}

export default TdInput
