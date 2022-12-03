import {
  Modal,
  Form,
  Row,
  Col,
  Tag,
  Select,
  Table,
  Input,
  Typography,
} from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { getTypeList, findDataSet, IDataSet } from './api'
import { useRequest } from 'ahooks'
import SelectDataset from './SelectDataset'
import { message } from 'antd'

function buildOptions(arr: any[], label: string, value: string) {
  return arr.map((item) => ({ label: item[label], value: item[value] }))
}

function uniqBy<T>(arr: T[], predicate: any): T[] {
  const cb = typeof predicate === 'function' ? predicate : (o) => o[predicate]

  return [
    ...arr
      .reduce((map, item) => {
        const key = item === null || item === undefined ? item : cb(item)

        map.has(key) || map.set(key, item)

        return map
      }, new Map())
      .values(),
  ]
}

const ImportDataset = () => {
  const { data: typeList } = useRequest(getTypeList)

  const typeListOptions =
    typeList &&
    Object.keys(typeList).map((key) => ({ label: typeList[key], value: key }))

  const [datasets, setDatasets] = useState<IDataSet[]>([])

  const datasetsLength = datasets.length
  const datasetsMaxLength = 10

  const handleAdd = (s: IDataSet[]) => {
    const sets = uniqBy([...datasets, ...s], 'key')
    if (sets.length > datasetsMaxLength) {
      return message.warning(`最多选 ${datasetsMaxLength} 个`)
    }
    setDatasets(sets)
  }

  const handleDelete = (key: string) => {
    const sets = datasets.filter((item) => item.key !== key)
    setDatasets(sets)
  }

  const { data: datasetList, mutate } = useRequest(findDataSet)

  const [type, setType] = useState<string | undefined>(undefined)
  const [name, setName] = useState('')

  const datasetFilterList = useMemo(() => {
    let list = datasetList || []
    if (type) list = list.filter((item) => item.type === type)
    if (name) list = list.filter((item) => item.name.includes(name))
    return list
  }, [type, name, datasetList])

  return (
    <Modal open title="导入数据集" width={680}>
      <Row gutter={16}>
        <Col span={4} style={{ textAlign: 'right' }}>
          <Typography.Text>数据集</Typography.Text>
        </Col>
        <Col span={20}>
          <div>
            已选 {datasetsLength} 个，最多选 {datasetsMaxLength} 个
          </div>
          <div className={datasetsLength > 0 ? 'mt' : undefined}>
            <Row gutter={[8, 8]}>
              {datasets.map((item) => (
                <Col key={item.key}>
                  <Tag
                    closable
                    color="blue"
                    onClose={() => handleDelete(item.key)}
                    style={{ padding: '4px 16px' }}
                  >
                    {item.name} {item.version}
                  </Tag>
                </Col>
              ))}
            </Row>
          </div>

          <div className="mt">
            <Row gutter={8}>
              <Col span={10}>
                <Select
                  value={type}
                  onChange={setType}
                  options={typeListOptions}
                  placeholder="数据类型"
                  allowClear
                  style={{ width: '100%' }}
                />
              </Col>
              <Col span={14}>
                <Input
                  allowClear
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="输入数据集名称搜索"
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          </div>

          <Table
            rowKey="baseId"
            className="mt"
            pagination={false}
            size="middle"
            columns={[
              { title: '数据集名称', dataIndex: 'name', width: 200 },
              { title: '数据类型', dataIndex: 'type', width: 100 },
              {
                title: '选择版本',
                dataIndex: 'versions',
                render: (value, record, index) => (
                  <SelectDataset
                    value={value}
                    record={record}
                    c
                    onClick={handleAdd}
                  />
                ),
              },
            ]}
            dataSource={datasetFilterList}
          ></Table>
        </Col>
      </Row>
    </Modal>
  )
}

export default ImportDataset
