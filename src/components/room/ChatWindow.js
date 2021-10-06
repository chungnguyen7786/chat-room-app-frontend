import React from 'react'
import { Button, Avatar, Tooltip, Form, Input } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import Message from './Message'

const ChatWindow = () => {
  return (
    <div className='chat-window'>
      <div className='header'>
        <div className='room-info'>
          <p className='room-title'>Room 1</p>
          <span className='room-desc'>This is room 1</span>
        </div>
        <div className='member-info'>
          <Button icon={<UserAddOutlined />} type='text'>
            Invite
          </Button>
          <Avatar.Group size='small' maxCount={2}>
            <Tooltip title='A'>
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title='B'>
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title='C'>
              <Avatar>C</Avatar>
            </Tooltip>
            <Tooltip title='D'>
              <Avatar>D</Avatar>
            </Tooltip>
          </Avatar.Group>
        </div>
      </div>
      <div className='content'>
        <div className='message-list'>
          <Message
            text='Test'
            avatarUrl={null}
            displayName='chungnguyen'
            createdAt={1111111111}
          />
          <Message
            text='Test'
            avatarUrl={null}
            displayName='chungnguyen'
            createdAt={1111111111}
          />
          <Message
            text='Test'
            avatarUrl={null}
            displayName='chungnguyen'
            createdAt={1111111111}
          />
        </div>
        <Form className='chat-form' size='large'>
          <Form.Item>
            <Input autoComplete='off' placeholder='Type message here...' />
          </Form.Item>
          <Button className='button'>Send</Button>
        </Form>
      </div>
    </div>
  )
}

export default ChatWindow
