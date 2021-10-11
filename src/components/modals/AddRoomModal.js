import { useContext } from 'react'
import { Form, Modal, Input } from 'antd'
import { RoomContext } from '../../contexts/RoomContext'

const AddRoomModal = () => {
  const { showAddRoomModal, setShowAddRoomModal, addRoom } =
    useContext(RoomContext)

  const [form] = Form.useForm()

  const handleOk = () => {
    addRoom(form.getFieldsValue())
    form.resetFields()
    setShowAddRoomModal(false)
  }

  const handleCancel = () => {
    form.resetFields()
    setShowAddRoomModal(false)
  }

  return (
    <Modal
      title='Add new chat room'
      visible={showAddRoomModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout='vertical'>
        <Form.Item label='Room name' name='roomName'>
          <Input />
        </Form.Item>
        <Form.Item label='Description' name='desc'>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddRoomModal
