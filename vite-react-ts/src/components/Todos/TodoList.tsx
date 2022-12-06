import {
  useQuery,
  QueryFunctionContext,
  QueryFunction,
} from '@tanstack/react-query'
import React from 'react'
import todo from '../../api/todo'
import { Table, Button } from 'antd'

const fetchTodoList: QueryFunction = ({ queryKey }) => {
  console.log(queryKey)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(100)
    }, 2000)
  })
}

const TodoList = () => {
  // Queries
  const {
    data,
    error,
    status,
    isLoading,
    isError,
    isSuccess,
    fetchStatus,
    isFetching,
    refetch,
    isInitialLoading,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: todo.listAll,
    // enabled: false,
  })

  // if (isLoading) {
  //   return <span>Loading...</span>
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  return (
    <div>
      <div>
        <Button onClick={() => refetch()}>refetch</Button>
      </div>

      {isFetching ? <div>Refreshing...</div> : null}

      <Table
        loading={isLoading}
        rowKey="id"
        columns={[
          { title: '标题', dataIndex: 'title' },
          { title: '内容', dataIndex: 'body' },
        ]}
        dataSource={data?.data}
      />
    </div>
  )
}

export default TodoList
