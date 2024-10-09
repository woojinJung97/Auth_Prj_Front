import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // API 요청이 '/api'로 시작되면 Spring Boot 서버로 프록시
      '/api': {
        target: 'http://localhost:8080', // Spring Boot 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // '/api' 제거하고 프록시
      }
    }
  }
})