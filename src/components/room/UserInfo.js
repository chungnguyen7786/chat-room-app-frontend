import React from 'react'
import { Button, Avatar, Typography } from 'antd'

const UserInfo = () => {
  return (
    <div className='userinfo'>
      <div>
        <Avatar>A</Avatar>
        <Typography.Text className='username'>ABC</Typography.Text>
      </div>
      <Button ghost>Logout</Button>
    </div>
  )
}

export default UserInfo
