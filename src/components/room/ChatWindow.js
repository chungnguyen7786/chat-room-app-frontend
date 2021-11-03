import { useContext, useEffect, useState, useRef } from 'react'
import { Button, Avatar, Tooltip, Form, Input, Alert, Spin } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import Message from './Message'
import { RoomContext } from '../../contexts/RoomContext'

const ChatWindow = () => {
  const {
    socket,
    roomState: { room },
    messageState,
    setMessageState,
    setShowInviteMembersModal,
    getMessages,
    sendMessage,
  } = useContext(RoomContext)
  const { messages, messagesLoading } = messageState
  const [inputValue, setInputValue] = useState('')
  const [form] = Form.useForm()
  const inputRef = useRef(null)
  const messageListRef = useRef(null)

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleOnSubmit = () => {
    sendMessage(inputValue)
    form.resetFields(['message'])

    // Focus to input again after submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus()
      })
    }
  }

  socket.on('serverSendMessage', (data) => {
    setMessageState({
      ...messageState,
      messages: messages.concat([data]),
    })
  })

  useEffect(() => getMessages(), [room])

  // Scroll to bottom after message changed
  useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50
    }
  }, [messages])

  const messagesList = messagesLoading ? (
    <Spin />
  ) : (
    messages.map((message) => (
      <Message
        key={message._id}
        text={message.text}
        avatarUrl={message.sender.avatarUrl}
        displayName={message.sender.username}
        createdAt={message.createdAt}
      />
    ))
  )
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
              <Button
                icon={<UserAddOutlined />}
                type='text'
                onClick={() => setShowInviteMembersModal(true)}
              >
                Invite
              </Button>
              <Avatar.Group size='medium' maxCount={2}>
                {room.members.map((member) => (
                  <Tooltip key={member._id} title={member.username}>
                    <Avatar src={member.avatarUrl}>
                      {member.avatarURL
                        ? ''
                        : member.username?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </div>
          </div>
          <div className='content'>
            <div className='message-list' ref={messageListRef}>
              {messagesList}
            </div>
            <Form className='chat-form' size='large' form={form}>
              <Form.Item name='message'>
                <Input
                  ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  autoComplete='off'
                  placeholder='Type message here...'
                />
              </Form.Item>
              <Button className='button' onClick={handleOnSubmit}>
                Send
              </Button>
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
