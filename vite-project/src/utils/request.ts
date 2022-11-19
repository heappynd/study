import axios, { AxiosRequestConfig } from 'axios'

const mockBase = 'http://127.0.0.1:4523/m1/1836948-0-default'

const service = axios.create({ baseURL: mockBase, timeout: 8000 })

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
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
    const url = response.config.url
    console.log('url', url)
    // handle special url
    if (url && url.startsWith('/sso')) {
      if (res.success) {
        return res.data
      } else {
        return Promise.reject(new Error(res.message || 'Error'))
      }
    } else if (url && url.startsWith('/v1')) {
      if (res.status === 0) {
        return res.data
      } else {
        return Promise.reject(new Error(res.message || 'Error'))
      }
    } else {
      if (res.code === 200) {
        return res.data
      } else {
        return Promise.reject(new Error(res.message || 'Error'))
      }
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export function request<R = any, D = any>(config: AxiosRequestConfig<D>) {
  return service.request<any, R>(config)
}
