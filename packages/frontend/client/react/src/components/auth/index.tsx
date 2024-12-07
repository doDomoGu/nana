import { useState, useEffect } from 'react'
import { Dialog, Button, Mask, SpinLoading } from 'antd-mobile'

import AutoLoginVerifying from './AutoLoginVerifying'
import LoginForm from './LoginForm'
// import RegisterForm from './RegisterForm'
import Logout from './Logout'

import * as UserApi from '@/api/user'

// type Props = {}

const Auth = (/*props: Props*/) => {
  const [status, setStatus] = useState('') // verifying / loggedIn / notLoggedIn

  const token = sessionStorage.getItem('token')

  // const [isLoading, setIsLoading] = useState(false)
  // const [visible, setVisible] = useState(false)

  // const [token, setToken] = useState(sessionStorage.getItem('token'))
  // const [isAuth, setIsAuth] = useState(false)

  const autoLogin = async () => {
    if (!token) {
      setStatus('notLoggedIn')
      return
    }

    try {
      setStatus('verifying')
      const res = await UserApi.verify(token)
      if (res.code == 200) {
        console.log(res.data)
        setStatus('loggedIn')
      }
    } catch (err) {
      setStatus('notLoggedIn')
      sessionStorage.removeItem('token')
    }
  }

  useEffect(() => {
    autoLogin()
  }, [])

  switch (status) {
    case 'verifying':
      return <AutoLoginVerifying />
    case 'loggedIn':
      return <Logout onSuccess={() => setStatus('notLoggedIn')} />
    default:
      return (
        <Dialog
          visible={status == 'notLoggedIn'}
          content={<LoginForm onSuccess={() => setStatus('loggedIn')} />}
        />
      )
  }
  // if (status == 'verifying') {

  // }

  // if (status == 'loggedIn') {

  // }

  // return (

  // )
}

export default Auth
