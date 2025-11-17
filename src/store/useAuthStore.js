import { defineStore } from "pinia";
import router from "@/components/router";
import api from "@/lib/axiosInstance";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async login(email, password) {
            try {
                const {data} = await api.post('/api/login', { email, password }, { withCredentials: true })
                if (data?.accessToken) {
                    // Persist token so it survives refresh
                    try { localStorage.setItem('accessToken', data.accessToken) } catch (e) { console.warn('localStorage write failed', e) }
                    if (data?.refreshToken) {
                        try { localStorage.setItem('refreshToken', data.refreshToken) } catch (e) { console.warn('localStorage write failed', e) }
                    }

                    // Set default Authorization for subsequent requests
                    api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`

                    // Try to populate user from server (server may return user in login response)
                    if (!data.user) {
                        try {
                            const me = await api.get('/api/me', { withCredentials: true })
                            this.user = me.data.user
                        } catch (e) {
                            console.warn('me fetch after login failed', e)
                            this.user = null
                        }
                    } else {
                        this.user = data.user
                    }
                     // optionally store non-sensitive user info in store
                    
                     this.isAuthenticated = true
                     router.push('/home')
                 } else {
                     // fallback: fetchUser() 호출하여 상태 복원 시도
                     await this.fetchUser()
                 }
             } catch (error) {
                 console.error(error)
                 throw new Error('로그인 실패')
             }
         },

        async fetchUser() {
            try {
                const { data } = await api.get('/api/me', { withCredentials: true })
                this.user = data.user
                this.isAuthenticated = true
            } catch (error) {
                console.error(error)
                this.user = null
                this.isAuthenticated = false
                throw new Error('사용자 정보 가져오기 실패')
            }
        },

        async signup(payload) {
            try {
                await api.post('/api/signup', payload)
                alert('회원가입이 완료되었습니다.')
            } catch (error) {
                console.error(error)
                throw new Error('회원가입 실패')
            }
        },

        async logout() {
            try {
                await api.post('/api/logout', {}, { withCredentials: true })
                this.user = null
                this.isAuthenticated = false
                document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                router.push('/login')
            } catch (error) {
                console.error(error)
                throw new Error('로그아웃 실패')
            }
        },

        async checkEmail(email) {
            try {
                const { data } = await api.get(`/api/check-email`, {params: {email}})
                return data
            } catch (error) {
                console.log(error);
            }
        },

        async checkNickname(nickname) {
            try {
                const { data } = await api.get(`/api/check-nickname`, { params: {nickname}})
                return data
            } catch (error) {
                console.log(error);
                
            }
        },

    }
})