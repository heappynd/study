import React, { useState } from 'react'
import {
  Table,
  PaginationProps,
  Input,
  Progress,
  TableColumnsType,
  Typography,
} from 'antd'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import music, { Song } from '../../api/music'

const columns: TableColumnsType<Song> = [
  {
    title: '音乐标题',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '歌手',
    dataIndex: 'ar',
    render: (value: { name: string }[]) =>
      value.map((item) => item.name).join('/'),
  },
  {
    title: '专辑',
    dataIndex: ['al', 'name'],
    ellipsis: true,
  },
  {
    title: '热度',
    dataIndex: 'pop',
    width: 300,
    render: (value: number) => <Progress percent={value} showInfo={false} />,
  },
]

const SearchList = () => {
  const [keywords, setKeywords] = useState('')
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
    isInitialLoading,
    isPreviousData,
    isFetching,
    status,
    fetchStatus,
  } = useQuery({
    queryKey: ['list', current, keywords],
    queryFn: () =>
      music.search({
        keywords,
        limit: pageSize,
        offset: (current - 1) * pageSize,
      }),

    keepPreviousData: true,
    enabled: !!keywords,
    // refetchInterval: 1000
    // placeholderData: () => {
    //   return queryClient.getQueryData(['list'])
    // },
    initialData: [
      {
        songCount: 1,
        songs: [
          { id: 1, name: 'test', al: { name: 'test' }, ar: [{ name: 'test' }] },
        ],
      },
    ],
  })

  const handleChange = (page: PaginationProps) => {
    console.log(page)

    setCurrent(page.current!)
    setPageSize(page.pageSize!)
  }

  return (
    <div>
      <div style={{ padding: 30 }}>
        <Typography.Title level={3}>Status: {status}</Typography.Title>
        <Typography.Title level={4}>
          FetchStatus: {fetchStatus}
        </Typography.Title>

        <Input.Search
          allowClear
          style={{ marginBottom: 16 }}
          onSearch={(value) => setKeywords(value)}
        />

        <Table
          loading={isInitialLoading}
          rowKey="id"
          dataSource={data?.songs}
          columns={columns}
          pagination={{
            current,
            pageSize,
            total: data?.songCount,
            disabled: isPreviousData,
          }}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default SearchList
