import { useState, useEffect } from 'react'
import { Dialog, Button } from 'antd-mobile'
import LoginForm from './Form'

import * as UserApi from '@/api/user'

type Props = {}

const Login = (props: Props) => {
  const [status, setStatus] = useState('') // verifying / loggedIn / notLoggedIn

  const token = sessionStorage.getItem('token')

  // const [isLoading, setIsLoading] = useState(false)
  // const [visible, setVisible] = useState(false)

  // const [token, setToken] = useState(sessionStorage.getItem('token'))
  // const [isAuth, setIsAuth] = useState(false)

  const autoLogin = async () => {
    if (!token) {
      // setVisible(true)
      setStatus('notLoggedIn')
      return
    }

    try {
      // setIsLoading(true)
      setStatus('verifying')
      const res = await UserApi.verify(token)
      if (res.code == 200) {
        console.log(res.data)
        // setIsAuth(true)
        setStatus('loggedIn')
      }
    } catch (err) {
      setStatus('notLoggedIn')
      sessionStorage.removeItem('token')
      // setVisible(true)
      // } finally {
      //   setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    const res = await UserApi.logout()
    if (res.code == 200 && res.data == true) {
      // setToken(null)
      setStatus('notLoggedIn')
      sessionStorage.removeItem('token')
    }
  }

  useEffect(() => {
    autoLogin()
  }, [])

  if (status == 'verifying') {
    return <div>Loading...</div>
  }

  if (status == 'loggedIn') {
    return <Button onClick={handleLogout}>登出</Button>
  }

  return (
    <Dialog
      visible={status == 'notLoggedIn'}
      content={
        <LoginForm
          onSuccess={() => {
            // setToken(token)
            // setVisible(false)
            setStatus('loggedIn')
          }}
        />
      }
    />
  )
}

export default Login
