import axios from 'axios'
import router from '../router'
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
    return Promise.reject(error)
  }
)

let isRefreshing = false

client.interceptors.response.use(
  response => {
    return response
  },
  function(error) {
    const originalRequest = error.config
    if (error.response.status === 401) {
      if (!originalRequest._retry && !isRefreshing) {
        originalRequest._retry = true
        isRefreshing = true
        return client
          .get('refresh_token')
          .then(res => {
            if (res.status === 200) {
              localStorageService.setToken(res.data.token)
              client.defaults.headers.common['Authorization'] =
                'Bearer ' + localStorageService.getToken()
              isRefreshing = false
              return client(originalRequest)
            }
          })
          .catch(error => {
            console.error(error)
            localStorageService.clearToken()
            return Promise.reject(error)
          })
      }

      localStorageService.clearToken()
      router.replace('/apple-admin')
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default client
