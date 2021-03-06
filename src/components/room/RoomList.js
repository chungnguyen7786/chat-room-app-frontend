import { useContext, useEffect } from 'react'
import { Collapse, Typography, Button, Spin } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'
import { RoomContext } from '../../contexts/RoomContext'

const { Panel } = Collapse

const RoomList = () => {
  const {
    socket,
    roomState: { room, rooms, roomsLoading },
    setShowAddRoomModal,
    getRooms,
    selectRoom,
  } = useContext(RoomContext)

  // Start: Get all rooms
  useEffect(() => {
    getRooms()
  }, [])

  const handleSelectedRoom = (roomId) => {
    const oldRoom = { ...room }
    socket.emit('oldRoom', oldRoom)
    selectRoom(roomId)
  }

  if (!rooms) {
    return (
      <Button type='text' icon={<PlusSquareOutlined />} className='add-room'>
        Add Room
      </Button>
    )
  }

  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <Panel header='Room list' key='1'>
        {roomsLoading ? (
          <Spin />
        ) : (
          rooms.map((room) => (
            <Typography.Link
              key={room._id}
              onClick={() => handleSelectedRoom(room._id)}
            >
              <p>{room.roomName}</p>
            </Typography.Link>
          ))
        )}
        <Button
          type='text'
          className='add-room'
          icon={<PlusSquareOutlined />}
          onClick={() => setShowAddRoomModal(true)}
        >
          Add Room
        </Button>
      </Panel>
    </Collapse>
  )
}

export default RoomList
