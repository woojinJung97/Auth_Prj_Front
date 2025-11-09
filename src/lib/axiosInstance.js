// axiosInstance.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

// 응답 인터셉터 - Access Token 만료 시 자동 갱신
api.interceptors.response.use(
  res => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = document.cookie.split('; ').find(v => v.startsWith('refreshToken='))?.split('=')[1]

      if (refreshToken) {
        const { data } = await axios.post('http://localhost:8080/api/token', { refreshToken })
        document.cookie = `accessToken=${data.accessToken}; path=/;`
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return api(originalRequest)
      }
    }

    return Promise.reject(error)
  }
)

export default api
