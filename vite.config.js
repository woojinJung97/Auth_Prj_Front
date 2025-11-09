import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 이거 없으면 @ 안 먹음
    },
  },
  server: {
    proxy: {
      // API 요청이 '/api'로 시작되면 Spring Boot 서버로 프록시
      '/api': {
        target: 'http://localhost:8080', // Spring Boot 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // '/api' 제거하고 프록시
      }
    }
  },
  build: {
    outDir: '../SpringBootPrj/src/main/resources/static',
    emptyOutDir: true
  }
})