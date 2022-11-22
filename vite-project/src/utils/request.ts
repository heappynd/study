import axios, { AxiosRequestConfig } from 'axios'

const service = axios.create({ baseURL: '/', timeout: 8000 })

const mock = 'http://127.0.0.1:4523/m1/1836948-0-default'
const isMock = sessionStorage.getItem('mock')

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // override baseurl when mock
    if (isMock) {
      config.baseURL = mock
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    const res = response.data
    if (res.success || res.status === 0 || res.code === 200) {
      return res.data
    } else {
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export function request<R = any, D = any>(config: AxiosRequestConfig<D>) {
  return service.request<any, R>(config)
}
