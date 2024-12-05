import React, { useState, useRef } from 'react'
import { Dialog } from 'antd-mobile'
import LoginForm from './Form'

type Props = {}

const Login = (props: Props) => {
  // const token = sessionStorage.getItem('token')

  const [visible, setVisible] = useState(true)
  return (
    <Dialog
      visible={visible}
      content={
        <LoginForm
          onSuccess={() => {
            setVisible(false)
          }}
        />
      }
    />
  )
}

export default Login
