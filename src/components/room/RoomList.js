import React from 'react'
import { Collapse, Typography, Button } from 'antd'
import { PlusSquareOutlined } from '@ant-design/icons'

const { Panel } = Collapse

const RoomInfo = () => {
  return (
    <Collapse ghost defaultActiveKey={['1']}>
      <Panel header='Room list' key='1'>
        <Typography.Link>
          <p>Room 1</p>
        </Typography.Link>
        <Typography.Link>
          <p>Room 2</p>
        </Typography.Link>
        <Typography.Link>
          <p>Room 3</p>
        </Typography.Link>
        <Button type='text' icon={<PlusSquareOutlined />} className='add-room'>
          Add Room
        </Button>
      </Panel>
    </Collapse>
  )
}

export default RoomInfo
