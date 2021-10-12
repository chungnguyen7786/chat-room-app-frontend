import { useContext } from 'react'
import { Button, Avatar, Tooltip, Form, Input, Alert } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import Message from './Message'
import { AuthContext } from '../../contexts/AuthContext'
import { RoomContext } from '../../contexts/RoomContext'

const ChatWindow = () => {
  const {
    roomState: { room },
  } = useContext(RoomContext)
  return (
    <div className='chat-window'>
      {room ? (
        <>
          <div className='header'>
            <div className='room-info'>
              <p className='room-title'>{room.roomName}</p>
              <span className='room-desc'>{room.desc}</span>
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
        </>
      ) : (
        <Alert
          message='Hãy chọn phòng'
          type='info'
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </div>
  )
}

export default ChatWindow
