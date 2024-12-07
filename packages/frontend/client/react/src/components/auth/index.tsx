import { useState, useEffect } from 'react'
import { Dialog, Button, Mask, SpinLoading } from 'antd-mobile'

import AutoLoginVerifying from './AutoLoginVerifying'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Logout from './Logout'

import * as UserApi from '@/api/user'

// type Props = {}

const Auth = (/*props: Props*/) => {
  const [status, setStatus] = useState('') // verifying / loggedIn / notLoggedIn
  const [dialog, setDialog] = useState('Login') // Login / Register
  const hasToken = () => {
    if (!sessionStorage.getItem('token')) {
      setStatus('notLoggedIn')
    } else {
      setStatus('verifying')
    }
  }

  useEffect(() => {
    hasToken()
  }, [])

  switch (status) {
    case 'verifying':
      return (
        <AutoLoginVerifying
          onSuccess={() => setStatus('loggedIn')}
          onFailed={() => setStatus('notLoggedIn')}
        />
      )
    case 'loggedIn':
      return <Logout onSuccess={() => setStatus('notLoggedIn')} />
    case 'notLoggedIn':
      return (
        <Dialog
          visible={true}
          content={
            dialog == 'Login' ? (
              <LoginForm
                onSuccess={() => setStatus('loggedIn')}
                onToRegister={() => setDialog('Register')}
              />
            ) : (
              <RegisterForm
                onSuccess={() => setDialog('Login')}
                onToLogin={() => setDialog('Login')}
              />
            )
          }
        />
      )
    default:
      return <>auth error</>
  }
}

export default Auth
