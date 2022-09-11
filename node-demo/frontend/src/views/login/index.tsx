import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import request from '../../utils/request'

const Login: React.FC = () => {
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    request
      .post('/api/login', values)
      .then(({ data }) => {
        console.log(data)
        navigate('/home')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div style={{ margin: '50px' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
