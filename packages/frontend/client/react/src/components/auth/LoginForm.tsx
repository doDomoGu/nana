import { useState } from 'react'
import { Dialog, Form, Input, Button } from 'antd-mobile'

import * as UserApi from '@/api/user'

const LoginForm = ({ onSuccess }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await UserApi.login(
        credentials.username,
        credentials.password
      )
      if (response.code == 200) {
        const { token } = response.data
        sessionStorage.setItem('token', token)
        onSuccess(token)
      } else {
        setErrorMsg('用户名/密码错误!')
        // setErrorMsg(response.msg)
        // console.error('登录失败:', response.msg)
      }

      // 登录成功后的操作，比如页面跳转
      // window.location.href = window.location.href
    } catch (error) {
      console.error('登录失败:', error)
      // 登录失败的操作
    }
  }

  return (
    <Form
      layout="vertical"
      footer={
        <Button
          block
          type="submit"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          提交
        </Button>
      }
    >
      <Form.Item label="用户名" name="username">
        <Input
          onChange={(val) => setCredentials({ ...credentials, username: val })}
          value={credentials.username}
          autoComplete="on"
          placeholder="请输入用户名"
          clearable
        />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input
          onChange={(val) => setCredentials({ ...credentials, password: val })}
          value={credentials.password}
          autoComplete="on"
          placeholder="请输入密码"
          clearable
          type="password"
        />
      </Form.Item>
      <Form.Item>
        <div style={{ color: 'red' }}>{errorMsg}</div>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
