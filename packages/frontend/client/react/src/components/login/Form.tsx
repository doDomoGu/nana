import React, { useState } from 'react'
import request from '@/utils/request'
import {
  Form,
  Input,
  Button,
  Dialog,
  TextArea,
  DatePicker,
  Selector,
  Slider,
  Stepper,
  Switch
} from 'antd-mobile'

const LoginForm = ({ onSuccess }) => {
  // const [credentials, setCredentials] = useState({
  //   username: 'admin',
  //   password: '123123'
  // })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // const handleChange = (val, field) => {
  //   console.log('handleChange', val, field)
  //   setCredentials({ ...credentials, [field]: val })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await request({
        url: '/user/login',
        method: 'post',
        data: {
          username,
          password
        }
      })
      if (response.code == 200) {
        const { token } = response.data
        sessionStorage.setItem('token', token)
        onSuccess()
      } else {
        console.error('登录失败:', response.msg)
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
      initialValues={{
        username: 'admin',
        password: '123123'
      }}
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
          onChange={(val) => setUsername(val)}
          value={username}
          placeholder="请输入用户名"
          clearable
        />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input
          onChange={(val) => setPassword(val)}
          value={password}
          placeholder="请输入密码"
          clearable
          type="password"
        />
      </Form.Item>
    </Form>
  )
}

export default LoginForm
