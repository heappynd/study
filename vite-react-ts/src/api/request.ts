import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 30000,
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  () => {
    return Promise.reject(new Error('Request timeout'))
  }
)

service.interceptors.response.use(
  (response) => {
    const { data } = response
    if (data.code === 200) {
      return data.result
    } else {
      return Promise.reject(new Error(data.msg))
    }
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default service
