import request from '@/utils/request'

export const login = async (username: string, password: string) => {
  return await request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export const register = async (
  username: string,
  password: string,
  email: string
) => {
  return await request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      email
    }
  })
}

export const verify = async (token: string) => {
  return await request({
    url: '/user/verify',
    method: 'post',
    data: {
      token
    }
  })
}

export const logout = async () => {
  return await request({
    url: '/user/logout',
    method: 'post'
  })
}
