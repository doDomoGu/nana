import { Button } from 'antd-mobile'
import * as UserApi from '@/api/user'

const Logout = ({ onSuccess }) => {
  const handleLogout = async () => {
    const res = await UserApi.logout()
    if (res.code == 200 && res.data == true) {
      // setToken(null)
      // setStatus('notLoggedIn')
      sessionStorage.removeItem('token')
      onSuccess()
    }
  }

  return <Button onClick={handleLogout}>登出</Button>
}

export default Logout
