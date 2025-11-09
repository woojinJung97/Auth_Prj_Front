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
                const {data} = await api.post('/api/login', { email, password })
                document.cookie = `token=${data.token}; path=/;`
                this.isAuthenticated = true
                this.user = data.user || {email}
                
                router.push('/home')
            } catch (error) {
                console.error(error)
                throw new Error('로그인 실패')
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

        logout() {
            document.cookie = 'token=; path=/; expires=Thu, 01 Jan'
            this.isAuthenticated = false
            this.user = null
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
        }
    }
})