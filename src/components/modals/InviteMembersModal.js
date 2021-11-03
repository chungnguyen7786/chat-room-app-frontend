import { useContext, useState, useMemo } from 'react'
import { Form, Modal, Select, Spin, Avatar } from 'antd'
import { RoomContext } from '../../contexts/RoomContext'
import { debounce } from 'lodash'
import { apiUrl } from '../../utils/constants'
import axios from 'axios'

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]) //no option at first
      setFetching(true) //start fetching

      fetchOptions(value).then((newOptions) => {
        setOptions(newOptions) //have result options
        setFetching(false) //stop fetching
      })
    }

    return debounce(loadOptions, debounceTimeout) //debounce for 300ms
  }, [debounceTimeout, fetchOptions])

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      {...props}
    >
      {options
        ? options.map((opt) => (
            <Select.Option key={opt._id} value={opt._id} title={opt.username}>
              <Avatar size='small' src={opt.avatarUrl}>
                {opt.avatarUrl ? '' : opt.username?.charAt(0)?.toUpperCase()}
              </Avatar>
              {` ${opt.username}`}
            </Select.Option>
          ))
        : null}
    </Select>
  )
}

const InviteMembersModal = () => {
  const {
    roomState: { room },
    showInviteMembersModal,
    setShowInviteMembersModal,
    inviteUsers,
  } = useContext(RoomContext)

  const fetchUserList = async (content) => {
    try {
      const response = await axios.get(`${apiUrl}/search/users?q=${content}`)
      if (response.data.success) {
        const result = response.data.foundUsers
        const currentUserIds = room.members.map((member) => member._id)
        return result.filter((item) => !currentUserIds.includes(item._id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const [value, setValue] = useState([])
  const [form] = Form.useForm()

  const handleOk = () => {
    // reset form value
    form.resetFields()
    setValue([])

    // update members in current room
    const invitedMemberIds = value.map((member) => member.value)
    console.log(invitedMemberIds)
    inviteUsers(invitedMemberIds)

    setShowInviteMembersModal(false)
  }

  const handleCancel = () => {
    // reset form value
    form.resetFields()
    setValue([])

    setShowInviteMembersModal(false)
  }

  return (
    <div>
      <Modal
        title='Invite member'
        visible={showInviteMembersModal}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form form={form} layout='vertical'>
          <DebounceSelect
            mode='multiple'
            name='select-user'
            label='Members'
            value={value}
            placeholder='Search members here'
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            style={{ width: '100%' }}
          />
        </Form>
      </Modal>
    </div>
  )
}

export default InviteMembersModal
