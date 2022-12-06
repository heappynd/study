import React from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import music from '../../api/music'
import { Button, List } from 'antd'

const fetchMusic = async ({ pageParam = 1 }) => {
  const limit = 10
  const res = await music.search({
    keywords: 'music',
    limit,
    offset: (pageParam - 1) * limit,
  })
  return res.songs
}

const InfiniteList = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(['musics'], fetchMusic, {
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage, pages)
      return true
    },
  })

  console.log('xx', data)

  const loadMore = !isFetching ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button
        onClick={() => {
          fetchNextPage()
        }}
      >
        loading more
      </Button>
    </div>
  ) : null

  return (
    <div>
      <List
        loading={isFetching}
        dataSource={data?.pages}
        renderItem={(group) => {
          return group.map((item) => (
            <List.Item key={item.id}>{item.name}</List.Item>
          ))
        }}
        loadMore={loadMore}
      ></List>
    </div>
  )
}

export default InfiniteList
