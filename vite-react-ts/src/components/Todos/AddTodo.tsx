import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import todo from '../../api/todo'

const AddTodo = () => {
  // Access the client
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newTodo) => {
      return axios.post('https://jsonplaceholder.typicode.com/posts', newTodo)
    },
    {
      onMutate(variables) {
        // 修改即将发生！
        console.log('onMutate', variables)
        // （可选）返回包含回滚时使用的数据的上下文
        return { id: 1 }
      },
      onError(error, variables, context) {
        // 错误触发！
        console.log('onError', error, variables, context)
      },
      onSuccess: (data, variables, context) => {
        // Boom baby!
        console.log('onSuccess', data, variables, context)

        queryClient.invalidateQueries(['todos'], {
          exact: false,
          // predicate(query) {
          // },
        })
      },
      onSettled: (data, error, variables, context) => {
        // 错误或成功……这并不重要
        console.log('onSettled', data, error, variables, context)
      },
    }
  )

  return (
    <div>
      <h2>{mutation.status}</h2>

      <button onClick={() => mutation.reset()}>reset</button>

      <button
        onClick={() => {
          mutation.mutate({ id: 1, title: 'Do Laundry' })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}

export default AddTodo
