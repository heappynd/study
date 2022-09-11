import { message } from 'antd'
import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 6000,
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data

    if (res.code === -1) {
      message.error(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
    }
  },
  (error) => {
    console.log(error)

    return Promise.reject(error)
  }
)

export default service
