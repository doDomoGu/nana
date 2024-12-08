import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = '/api'

const request = (options: AxiosRequestConfig): Promise<AxiosResponse> => {
  const instance = axios.create({
    baseURL,
    timeout: 1000 * 10
    // headers: {
    //   'Content-Type': 'application/json' // 设置Content-Type为application/json
    // }
  })

  // 请求拦截器
  instance.interceptors.request.use(
    (config) => {
      config.headers['Content-Type'] = 'application/json'
      // 可以在这里添加例如token等请求头
      if (sessionStorage.getItem('token')) {
        config.headers['Authorization'] =
          `Bearer ${sessionStorage.getItem('token')}`
      }
      return config
    },
    (error) => {
      // 请求错误处理
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 对响应数据做处理，例如只返回data部分
      return response.data
    },
    (error) => {
      // 响应错误处理
      return Promise.reject(error)
    }
  )

  return instance(options)
}

export default request
