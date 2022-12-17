import type { ProFormInstance } from '@ant-design/pro-components'
import {
  ProForm,
  ProFormCascader,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components'
import { message, TreeSelect } from 'antd'
import moment from 'dayjs'
import { useRef } from 'react'

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

interface Values {
  name: string
  company?: string
  useMode?: string
}

export default () => {
  const formRef = useRef<ProFormInstance<Values>>()

  const onFinish = async (values: Values) => {
    console.log(values)
  }
  const request = async () => {
    return {
      name: '1',
      cc: 1,
    }
  }

  return (
    <ProForm<Values>
      layout="horizontal"
      onFinish={onFinish}
      initialValues={{ name: 'leo' }}
      // request={request}
    >
      <ProFormText
        label="Name"
        name="name"
        transform={(value) => value + '1'}
      />
      <ProFormSelect
        label="UseMode"
        name="useMode"
        valueEnum={{ yes: '是', no: '否' }}
      />
      <ProFormSelect
        label="Company"
        name="company"
        request={async () => [
          { label: '小米', value: 'xiaomi' },
          { label: '华为', value: 'huawei' },
        ]}
      />
    </ProForm>
  )
}
