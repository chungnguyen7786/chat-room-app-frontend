import React from 'react'
import Sidebar from '../components/room/Sidebar'
import ChatWindow from '../components/room/ChatWindow'
import { Row, Col } from 'antd'

const ChatRoom = () => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  )
}

export default ChatRoom
