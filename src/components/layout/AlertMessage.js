import { Alert } from 'antd'

const AlertMessage = ({ alert }) => {
  return alert === null ? null : (
    <Alert type={alert.type} message={alert.message} />
  )
}

export default AlertMessage
