import { Button, message, Table, Image } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import request from '../../utils/request'

interface DataType {
  username: string
  age: number
  avatar: string
}
const columns: ColumnsType<DataType> = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    render: (text) => {
      return <Image width={80} src={`http://localhost:3000${text}`} />
    },
  },
]

function Home() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    showQuickJumper: true,
    total: 0,
  })

  const fetchData = () => {
    setLoading(true)
    request
      .get('/api/users', {
        params: {
          current: pagination?.current,
          pageSize: pagination?.pageSize,
        },
      })
      .then(({ data }) => {
        setData(data.data)
        setLoading(false)
        setPagination({
          ...pagination,
          total: data.total,
        })
      })
  }

  useEffect(() => {
    fetchData()

    return () => {}
  }, [JSON.stringify(pagination)])

  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination)
    setPagination(pagination)
  }

  const logout = () => {
    request.post('/api/logout').then(() => {
      console.log('退出成功！')
      navigate('/login')
      message.success('退出成功！')
    })
  }

  return (
    <div style={{ margin: '50px' }}>
      <Button type="primary" onClick={logout}>
        logout
      </Button>
      <Table
        rowKey="_id"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={pagination}
        onChange={handleTableChange}
      ></Table>
    </div>
  )
}

export default Home
