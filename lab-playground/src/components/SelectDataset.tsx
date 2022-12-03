import { PlusOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import React, { FC, useState } from 'react'
import { IDataSetRes } from './api'

interface IProps {
  value: string
  record: IDataSetRes
  onClick(s: any): void
}

const SelectDataset: FC<IProps> = ({ value, record, onClick }) => {
  const options = value.split(',').map((item) => ({ label: item, value: item }))

  const [selected, setSelected] = useState<string[]>([])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Select
        value={selected}
        allowClear
        mode="multiple"
        options={options}
        placeholder="选择版本"
        onChange={setSelected}
        style={{ width: '100%', marginRight: 10 }}
      />
      <PlusOutlined
        style={{ color: 'blue', cursor: 'pointer' }}
        onClick={() =>
          onClick(
            selected.map((item) => ({
              version: item,
              name: record.name,
              baseId: record.baseId,
              key: record.baseId + item,
            }))
          )
        }
      />
    </div>
  )
}

export default SelectDataset
