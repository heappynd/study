import React, { useEffect, useState } from 'react'
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Typography,
  message,
  Radio,
} from 'antd'
import ReactDOM from 'react-dom'
import { useRequest } from 'ahooks'
import * as api from './api'
import options from './options'

console.log(options)

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

//

const ModelModal: React.FC<{ onClose: any; project_type: string }> = ({
  onClose,
  project_type,
}) => {
  const isITM = true || project_type === 'ITM项目'

  const [form] = Form.useForm<{ task_domain: string }>()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()

  const { data: noRegisterModels } = useRequest(
    api.getNoRegisterModelsByProjectId
  )
  const options1 = noRegisterModels?.map((item) => ({
    label: item.name,
    value: item.name,
  }))

  const { data: models } = useRequest(api.getAllModels, {
    defaultParams: ['xx', 1],
  })
  const options2 = models?.map((item) => ({
    label: item.name,
    value: item.name,
  }))

  const name = Form.useWatch('name', form)
  const task_domain = Form.useWatch('task_domain', form)
  const is_update = Form.useWatch('is_update', form)

  useEffect(() => {
    // form.resetFields()
    form.setFieldValue('version', '1.0.0')
  }, [is_update])

  const seleted = noRegisterModels?.find((item) => item.name === name)

  useEffect(() => {
    seleted &&
      seleted.refModelId === null &&
      form.setFieldValue('version', 'v1.0.0')

    if (seleted && seleted.refModelId) {
      api
        .getModel('x', 222, seleted.id)
        .then(({ version, task_domain, framework, description, task_type }) => {
          form.setFieldValue('version', version)
          form.setFieldValue('task_domain', task_domain)
          form.setFieldValue('framework', framework)
          form.setFieldValue('description', description)
          form.setFieldValue('task_type', task_type)
        })
      form.setFieldValue('domain', seleted.domainId)
    }

    return () => {}
  }, [seleted])

  const selected2 = models?.find((item) => item.name === name)
  useEffect(() => {
    if (selected2) {
      api
        .getModel('x', 222, selected2.id)
        .then(({ version, task_domain, framework, description, task_type }) => {
          form.setFieldValue('version', version)
          form.setFieldValue('task_domain', task_domain)
          form.setFieldValue('framework', framework)
          form.setFieldValue('description', description)
          form.setFieldValue('task_type', task_type)
        })
      // form.setFieldValue('domain', selected2.domainId)
    }

    return () => {}
  }, [selected2])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    messageApi.open({
      type: 'success',
      content: (
        <>
          注册模型提交成功，<Typography.Link>查看模型</Typography.Link>。
        </>
      ),
    })
    form.validateFields().then((values) => {
      console.log(values)
    })
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
    onClose()
  }

  const [value, setValue] = useState(0)

  const [taskType, setTaskType] = useState([])
  useEffect(() => {
    form.setFieldValue('task_type', '')
    const o = options.task_type[task_domain]
    setTaskType(o ?? [])
  }, [task_domain])

  return (
    <>
      {contextHolder}

      <Modal
        title="注册模型"
        open={true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          initialValues={{ is_update: false }}
        >
          {isITM && (
            <Form.Item name="is_update" wrapperCol={{ offset: 4 }}>
              <Radio.Group>
                <Radio value={false}>新建模型</Radio>
                <Radio value={true}>更新模型</Radio>
              </Radio.Group>
            </Form.Item>
          )}

          {isITM && !is_update ? (
            <Form.Item
              name="t100"
              label="模型名称"
              rules={[
                { required: true },
                {
                  pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                  message: '只支持中文、字母、数字及下划线',
                },
                {
                  validator: async (rule, value) => {
                    const existed = models?.find((item) => item.name === value)
                    if (existed) {
                      throw new Error('模型名称已存在，请重新输入')
                    }
                  },
                },
              ]}
            >
              <Input maxLength={200} showCount />
            </Form.Item>
          ) : (
            <Form.Item
              name="name"
              label="模型名称"
              rules={[{ required: true }]}
            >
              <Select options={isITM ? options2 : options1} showSearch />
            </Form.Item>
          )}

          <Form.Item name="version" label="版本" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="domain"
            label="所属领域"
            rules={[{ required: true }]}
          >
            <Select disabled options={options.domain} />
          </Form.Item>
          <Form.Item name="task_domain" label="任务领域">
            <Select options={options.task_domain} />
          </Form.Item>
          <Form.Item name="task_type" label="任务类型">
            <Select options={taskType} />
          </Form.Item>
          <Form.Item
            name="framework"
            label="模型框架"
            rules={[{ required: true }]}
          >
            <Select options={options.framework} />
          </Form.Item>
          <Form.Item
            name="description"
            label="模型描述"
            extra={
              <Typography.Text type="danger">请求内容验证失败</Typography.Text>
            }
          >
            <Input.TextArea
              maxLength={400}
              showCount
              autoSize={{ minRows: 2 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModelModal
