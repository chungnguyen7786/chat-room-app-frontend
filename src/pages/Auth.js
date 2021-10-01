import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Spin } from 'antd'

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
    loadUser,
  } = useContext(AuthContext)
  let body

  useEffect(() => loadUser(), [])

  if (authLoading) body = <Spin />
  if (isAuthenticated) return <Redirect to='/chatroom' />
  else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}
        {authRoute === 'register' && <RegisterForm />}
      </>
    )
  return (
    <div className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1>Welcome to TechRoom!</h1>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth
