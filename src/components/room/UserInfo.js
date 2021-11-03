import { useContext, useEffect } from 'react'
import { Button, Avatar, Typography } from 'antd'
import { AuthContext } from '../../contexts/AuthContext'
import { RoomContext } from '../../contexts/RoomContext'

const UserInfo = () => {
  const {
    authState: { user },
    loadUser,
    logoutUser,
  } = useContext(AuthContext)

  const { clearState } = useContext(RoomContext)

  useEffect(() => loadUser(), [])

  return (
    <div className='userinfo'>
      <div>
        <Avatar src={user.avatarUrl}>
          {user.avatarUrl ? '' : user.username?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{user.username}</Typography.Text>
      </div>
      <Button
        ghost
        onClick={() => {
          clearState()
          logoutUser()
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default UserInfo
