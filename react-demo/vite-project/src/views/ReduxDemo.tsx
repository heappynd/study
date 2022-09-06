import React, { useEffect, useState } from 'react'
import { listCreator } from '../redux/actionCreator/posts'
import store from '../redux/store'

export default function ReduxDemo() {
  function test() {
    store.dispatch(listCreator())
  }

  const [posts, setPosts] = useState<any[]>(store.getState().postsReducer.list)

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setPosts(store.getState().postsReducer.list)
    })

    return () => {
      // 取消订阅
      unsub()
    }
  }, [])

  return (
    <div>
      ReduxDemo
      <button onClick={test}>test</button>
      <ol>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}
