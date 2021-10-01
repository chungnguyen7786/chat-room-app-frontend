import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Form, Input, Button } from 'antd'
import { Link } from 'react-router-dom'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
  // Load context
  const { registerUser } = useContext(AuthContext)

  const [alert, setAlert] = useState(null)

  // Handle the register process
  const register = async (event) => {
    try {
      const registerData = await registerUser(event)
      console.log(registerData)
      if (registerData.success) {
        setAlert({ type: 'error', message: registerData.message })
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
        name='register'
        wrapperCol={{
          offset: 8,
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={register}
        autoComplete='off'
      >
        <Form.Item>
          <AlertMessage alert={alert} />
        </Form.Item>
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
