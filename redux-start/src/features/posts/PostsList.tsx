import React from 'react'
import { useGetPostsQuery } from '../api/apiSlice'

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetPostsQuery()

  console.log(posts)

  return (
    <div>
      {isFetching ? <h1>Loading...</h1> : <h1>PostsList</h1>}

      <button onClick={refetch}>refetch</button>
    </div>
  )
}

export default PostsList
