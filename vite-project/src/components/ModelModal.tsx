import { useBoolean, useRequest } from 'ahooks'
import {
  Col,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import * as api from './api'
import options from './options'
import { IModel } from './types'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

interface IProps {
  onClose(): void
  project_type: string
  project_id: number
  username: string
}

type Values = {
  description: string
  domain: number
  framework: string
  name: string
  task_domain: string
  task_type: string
  version: string
}

const ModelModal: React.FC<IProps> = ({
  onClose,
  project_type,
  project_id,
  username,
}) => {
  // project_type === 'ITM项目'
  const isItm = true

  const [form] = Form.useForm<Values>()

  const [isModalOpen, setIsModalOpen] = useState(true)

  const [isUpdate, { set: setIsUpdate }] = useBoolean(false)
  // 是否是回显
  const [isFill, setIsFill] = useState(false)

  // itm项目下获取模型列表
  const { data: noRegisterModels } = useRequest(
    api.getNoRegisterModelsByProjectId,
    { ready: isItm }
  )
  const options1 = noRegisterModels?.map((item) => ({
    label: item.name,
    value: item.name,
  }))
  // 非itm项目下获取模型列表
  const { data: models } = useRequest(api.getAllModels, {
    defaultParams: [username, project_id],
    ready: !isItm,
  })
  const options2 = models?.map((item) => ({
    label: item.name,
    value: item.name,
  }))

  const name = Form.useWatch('name', form)
  const task_domain = Form.useWatch('task_domain', form)

  useEffect(() => {
    form.resetFields()
    if (!isUpdate) {
      form.setFieldValue('version', '1.0.0')
    }
  }, [isUpdate])

  const seleted = noRegisterModels?.find((item) => item.name === name)

  const fill = ({
    version,
    task_domain,
    framework,
    description,
    task_type,
  }: IModel) => {
    form.getFieldValue('task_domain') !== task_domain && setIsFill(true)
    form.setFieldsValue({
      description,
      framework,
      task_domain,
      task_type,
      version,
    })
  }

  useEffect(() => {
    if (seleted) {
      // 如果模型未投产过 refModelId为null
      if (seleted.refModelId === null) {
        form.setFieldsValue({
          description: '',
          framework: '',
          task_domain: '',
          task_type: '',
          version: '1.0.0',
        })
      }
      // 如果模型投产过 refModelId为模型id
      if (seleted.refModelId) {
        api.getModel(username, project_id, seleted.refModelId).then(fill)
      }
      form.setFieldValue('domain', seleted.domainId)
    }
  }, [seleted])

  const selected2 = isUpdate
    ? models?.find((item) => item.name === name)
    : undefined

  useEffect(() => {
    if (selected2) {
      api.getModel(username, project_id, selected2.id).then(fill)
    }
  }, [selected2])

  const [messageApi, contextHolder] = message.useMessage()

  const handleOk = () => {
    const origin = window.location.origin
    const path = '/research/#/model-manage/model-repository'
    const url = origin + path

    messageApi.open({
      type: 'success',
      content: (
        <>
          注册模型提交成功，
          <Typography.Link href={url}>查看模型</Typography.Link>。
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
  }

  // 任务类型 根据 任务领域动态获取
  const [taskTypeOptions, setTaskTypeOptions] = useState([])
  useEffect(() => {
    if (!isFill) {
      form.setFieldValue('task_type', '')
    }
    const o = options.task_type[task_domain] || []
    setTaskTypeOptions(o)
    setIsFill(false)
  }, [task_domain])

  return (
    <>
      {contextHolder}
      <Modal
        title="注册模型"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={onClose}
        destroyOnClose
      >
        {!isItm && (
          <Row style={{ marginBottom: 8 }}>
            <Col span={20} offset={4}>
              <Radio.Group
                value={isUpdate}
                onChange={(e) => setIsUpdate(e.target.value)}
              >
                <Radio value={false}>新建模型</Radio>
                <Radio value={true}>更新模型</Radio>
              </Radio.Group>
            </Col>
          </Row>
        )}
        <Form {...layout} form={form} preserve={false}>
          {!isItm && !isUpdate ? (
            <Form.Item
              name="name"
              label="模型名称"
              rules={[
                { required: true, message: '模型名称必填' },
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
              rules={[{ required: true, message: '模型名称必填' }]}
            >
              <Select options={isItm ? options1 : options2} showSearch />
            </Form.Item>
          )}

          <Form.Item name="version" label="版本" rules={[{ required: true }]}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="domain"
            label="所属领域"
            rules={[{ required: true, message: '所属领域必填' }]}
          >
            <Select disabled={isItm} options={options.domain} />
          </Form.Item>

          <Form.Item name="task_domain" label="任务领域">
            <Select options={options.task_domain} />
          </Form.Item>

          <Form.Item name="task_type" label="任务类型">
            <Select options={taskTypeOptions} />
          </Form.Item>

          <Form.Item
            name="framework"
            label="模型框架"
            rules={[{ required: true, message: '模型框架必填' }]}
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
