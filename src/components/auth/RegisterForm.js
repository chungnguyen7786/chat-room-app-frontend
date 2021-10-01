import React from 'react'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

const RegisterForm = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Form
        name='register'
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder='username' />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input placeholder='email' />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password placeholder='password' />
        </Form.Item>

        <Form.Item name='avatarUrl'>
          <Input placeholder='avatarUrl' />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button
            type='primary'
            htmlType='submit'
            style={{ background: 'purple', border: 'purple' }}
          >
            Register
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <p>
            Already have an account? &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/login'>
              <Button
                type='primary'
                style={{ background: 'purple', border: 'purple' }}
              >
                Login
              </Button>
            </Link>
          </p>
        </Form.Item>
      </Form>
    </>
  )
}

export default RegisterForm
