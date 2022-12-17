import { ModalForm, ProFormText } from '@ant-design/pro-components'
import React, { useState } from 'react'

const Models = () => {
  const [open, setOpen] = useState(true)

  return (
    <ModalForm
      title="注册模型"
      layout="horizontal"
      open={open}
      onFinish={async () => {}}
      onOpenChange={setOpen}
    >
      <ProFormText
        name="name"
        label="模型名称"
        fieldProps={{ maxLength: 200, showCount: true }}
        rules={[
          { required: true, message: '模型名称必填' },
          {
            pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
            message: '只支持中文、字母、数字及下划线',
          },
          // {
          //   validator: async (rule, value) => {
          //     const existed = models?.find((item) => item.name === value)
          //     if (existed) {
          //       throw new Error('模型名称已存在，请重新输入')
          //     }
          //   },
          // },
        ]}
      />
      <ProFormText name="version" label="版本" />
    </ModalForm>
  )
}

export default Models
