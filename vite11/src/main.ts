import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
// import { getCookie } from '.'
// import { ServerConnection } from '@jupyterlab/services'

// const settings = ServerConnection.makeSettings()

const settings = {
  baseUrl: 'http://www.test.com.cn/',
}

export function createRequest(baseURL = settings.baseUrl + 'api/biglab') {
  // const baseURL = 'http://127.0.0.1:4523/m1/1836948-0-default/api/biglab'

  const instance = axios.create({ baseURL, timeout: 10 * 1000 })

  // 添加请求拦截器
  instance.interceptors.request.use(
    (config) => {
      // const xsrfToken = getCookie('_xsrf')
      // if (xsrfToken !== undefined && config.headers) {
      //   config.headers['X-XSRFToken'] = xsrfToken
      // }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 添加响应拦截器
  instance.interceptors.response.use(
    (response) => {
      // 2xx 范围内的状态码都会触发该函数。
      const res = response.data
      const url = response.config.url
      console.log(response)

      console.log(url)

      if (res.code === 200) {
        return res.data
      } else {
        return Promise.reject(res.message)
      }
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  const a = <T>(cfg: AxiosRequestConfig) => instance.request<any, T>(cfg)

  return a
}

const req = createRequest('https://jsonplaceholder.typicode.com')

// req({}).get('/todos/1', { params: { id: 1 } })

type User = {
  id: number
  email: string
  first_name: string
}

type GetUsersResponse = {
  data: User[]
}
async function getUsers() {
  try {
    const data = await req<User>({ url: '/api/users' })
  } catch (error) {
    axios.isAxiosError
  }
}
