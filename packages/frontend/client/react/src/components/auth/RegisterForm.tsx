import { useState } from 'react'
import { Form, Input, Button } from 'antd-mobile'

import * as UserApi from '@/api/user'

const RegisterForm = ({ onSuccess, onToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (val, key) => {
    setFormData({
      ...formData,
      [key]: val
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('handleSubmit', formData)
    // 简单校验
    if (
      formData.username == '' ||
      formData.email == '' ||
      formData.password == '' ||
      formData.confirmPassword == ''
    ) {
      setErrorMsg('请填写完整!')
      return
    }

    if (formData.password != formData.confirmPassword) {
      setErrorMsg('二次密码不一致!')
      return
    }
    try {
      const response = await UserApi.register(
        formData.username,
        formData.password,
        formData.email
      )
      if (response.code == 200) {
        // 注册成功后的操作，跳回登录框
        onToLogin()
      } else {
        setErrorMsg(response.msg)
        console.error('注册失败:', response.msg)
      }
    } catch (error) {
      setErrorMsg('注册失败:' + error)
      console.error('注册失败:', error)
      // 注册失败的操作
    }
  }

  return (
    <Form layout="vertical">
      <Form.Item label="用户名" name="username">
        <Input
          onChange={(val) => handleChange(val, 'username')}
          value={formData.username}
          autoComplete="on"
          placeholder="请输入用户名"
          clearable
        />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input
          onChange={(val) => handleChange(val, 'email')}
          value={formData.email}
          autoComplete="on"
          placeholder="请输入邮箱"
          clearable
        />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input
          onChange={(val) => handleChange(val, 'password')}
          value={formData.password}
          autoComplete="on"
          placeholder="请输入密码"
          clearable
          type="password"
        />
      </Form.Item>
      <Form.Item label="密码确认" name="confirmPassword">
        <Input
          onChange={(val) => handleChange(val, 'confirmPassword')}
          value={formData.confirmPassword}
          autoComplete="on"
          placeholder="请输入密码(二次确认)"
          clearable
          type="password"
        />
      </Form.Item>
      <Form.Item>
        <div style={{ color: 'red' }}>{errorMsg}</div>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="submit"
          color="primary"
          size="large"
          onClick={handleSubmit}
        >
          提交注册
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="submit"
          color="default"
          size="large"
          onClick={() => onToLogin()}
        >
          返回登录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm
