import {notification} from 'antd';

const Notification = (type,message) => {
  notification.open({
    type: type === true ? 'success' : 'error',
    message: message
  })
}

export default Notification;