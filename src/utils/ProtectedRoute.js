import { Route, Redirect } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Spin } from 'antd'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { authLoading, isAuthenticated },
    loadUser,
  } = useContext(AuthContext)

  useEffect(() => loadUser(), [])

  if (authLoading)
    return (
      <div className='spinner-container'>
        <Spin />
      </div>
    )

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  )
}

export default ProtectedRoute
