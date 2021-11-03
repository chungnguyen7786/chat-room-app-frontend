import React from 'react'
import { Avatar, Typography } from 'antd'

const Message = ({ text, displayName, createdAt, avatarUrl }) => {
  return (
    <div className='message'>
      <div>
        <Avatar size='medium' src={avatarUrl}>
          {avatarUrl ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='sender'>{displayName}</Typography.Text>
        <Typography.Text className='chat-time'>{createdAt}</Typography.Text>
      </div>
      <div>
        <Typography.Text className='content'>{text}</Typography.Text>
      </div>
    </div>
  )
}

export default Message
