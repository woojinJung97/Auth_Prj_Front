// axiosInstance.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

// 요청/응답 로깅(디버그용)
api.interceptors.request.use(cfg => { console.debug('[API REQ]', cfg.method, cfg.url, cfg.withCredentials); return cfg })

// 응답 인터셉터 - Access Token 만료 시 자동 갱신
api.interceptors.response.use(
  res => {
    console.debug('[API RES]', res.status, res.config?.url)
    return res
  },
  async (error) => {
    console.error('[API ERR]', error?.response?.status, error?.config?.url)
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      // 우선 localStorage에 저장된 refreshToken 확인, 없으면 쿠키에서 읽어본다
      let refreshToken = null
      try {
        refreshToken = localStorage.getItem('refreshToken')
      } catch (e) {
        // ignore
      }
      if (!refreshToken) {
        const cookieMatch = document.cookie.split('; ').find(v => v.startsWith('refreshToken='))
        refreshToken = cookieMatch?.split('=')[1]
      }

      if (refreshToken) {
        try {
          const { data } = await axios.post('http://localhost:8080/api/token', { refreshToken }, { withCredentials: true })
          if (data?.accessToken) {
            // 새 access token 설정
            api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`
            originalRequest.headers = originalRequest.headers || {}
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
            return api(originalRequest)
          }
        } catch (e) {
          console.error('[REFRESH FAIL]', e)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api
