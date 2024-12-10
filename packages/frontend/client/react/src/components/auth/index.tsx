import { useState, useEffect } from 'react'
import { Dialog, Button, Mask, SpinLoading } from 'antd-mobile'

import AutoLoginVerifying from './AutoLoginVerifying'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Logout from './Logout'

import { useUser } from '@/context/User.tsx'

// type Props = {}

const Auth = (/*props: Props*/) => {
  const [status, setStatus] = useState('') // verifying / notLoggedIn / loggedIn
  const [dialog, setDialog] = useState('Login') // Login / Register
  const [userState, dispatch] = useUser()

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
          onSuccess={(user) => {
            setStatus('loggedIn')
            dispatch({ type: 'LOGIN', payload: user })
          }}
          onFailed={() => {
            setStatus('notLoggedIn')
            dispatch({ type: 'LOGOUT' })
          }}
        />
      )
    case 'notLoggedIn':
      return (
        <Dialog
          visible={true}
          content={
            dialog == 'Login' ? (
              <LoginForm
                onSuccess={(user) => {
                  setStatus('loggedIn')
                  dispatch({ type: 'LOGIN', payload: user })
                }}
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
    case 'loggedIn':
      return (
        <>
          ID:{userState.user.id}/name:{userState.user.name}
          <Logout
            onSuccess={() => {
              setStatus('notLoggedIn')
              dispatch({ type: 'LOGOUT' })
            }}
          />
        </>
      )

    default:
      return <>auth error</>
  }
}

export default Auth
