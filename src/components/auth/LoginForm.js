import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
  // load context
  const { loginUser } = useContext(AuthContext)

  const [alert, setAlert] = useState(null)

  // Handle the login process
  const login = async (event) => {
    try {
      const loginData = await loginUser(event)
      console.log(loginData)
      if (!loginData.success) {
        setAlert({ type: 'error', message: loginData.message })
        //alert will disapper after 5s
        setTimeout(() => setAlert(null), 5000)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Form
        name='login'
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={login}
        autoComplete='off'
      >
        <Form.Item>
          <AlertMessage alert={alert} />
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
            Login
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <p>
            Don't have an account? &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to='/register'>
              <Button
                type='primary'
                style={{ background: 'purple', border: 'purple' }}
              >
                Register
              </Button>
            </Link>
          </p>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
