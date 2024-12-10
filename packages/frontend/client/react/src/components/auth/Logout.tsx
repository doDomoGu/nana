import { Button, Dialog } from 'antd-mobile'
import * as UserApi from '@/api/user'

const Logout = ({ onSuccess }) => {
  const handleLogout = () => {
    return Dialog.confirm({
      content: '确认要登出吗?',
      onCancel: () => {},
      onConfirm: async () => {
        const res = await UserApi.logout()
        if (res.code == 200 && res.data == true) {
          // setToken(null)
          // setStatus('notLoggedIn')
          sessionStorage.removeItem('token')
          onSuccess()
        }
      }
    })
  }

  return (
    <>
      <Button
        size="mini"
        color="danger"
        onClick={() => {
          handleLogout()
        }}
      >
        登出
      </Button>
    </>
  )
}

export default Logout
