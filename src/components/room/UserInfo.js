import { useContext, useEffect } from 'react'
import { Button, Avatar, Typography } from 'antd'
import { AuthContext } from '../../contexts/AuthContext'

const UserInfo = () => {
  const {
    authState: { user },
    loadUser,
    logoutUser,
  } = useContext(AuthContext)
  useEffect(() => loadUser(), [])

  return (
    <div className='userinfo'>
      <div>
        <Avatar src={user.avatarUrl} />
        <Typography.Text className='username'>{user.username}</Typography.Text>
      </div>
      <Button ghost onClick={() => logoutUser()}>
        Logout
      </Button>
    </div>
  )
}

export default UserInfo
