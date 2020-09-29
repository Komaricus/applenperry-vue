import axios from 'axios'
import LocalStorageService from './LocalStorageService'
const localStorageService = LocalStorageService.getService()

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? window.location.origin + '/apple-api'
      : 'http://localhost:5001/apple-api'
})

client.interceptors.request.use(
  config => {
    const token = localStorageService.getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

client.interceptors.response.use(
  response => {
    return response
  },
  function(error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      return client.get('refresh_token').then(res => {
        if (res.status === 200) {
          // 1) put token to LocalStorage
          localStorageService.setToken(res.data.token)

          // 2) Change Authorization header
          client.defaults.headers.common['Authorization'] =
            'Bearer ' + localStorageService.getToken()

          // 3) return originalRequest object with Axios.
          return client(originalRequest)
        }
      })
    }
    return Promise.reject(error)
  }
)

export default client
