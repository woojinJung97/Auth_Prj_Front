import api from "@/lib/axiosInstance";
import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        userList: [],
        loading: false,
        error: null
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        email: (state) => state.user?.email || ''
    },
    actions: {
        async fetchUserInfo() {
            this.loading = true
            this.error = null
            try {
                const res = await api.get('/api/users/myhome')
                let payload = res && res.data ? res.data : res
                this.user = payload
                
                return payload
            } catch (error) {
                console.error('사용자를 찾을 수 없습니다.', error)
                this.error = error
                throw error
            } finally {
                this.loading = false
            }
        },

        async updateUserInfo(changes) {
            this.loading = true
            this.error = null
            try {
                if (!changes || Object.keys(changes).length === 0) {
                    throw new Error('변경된 정보가 없습니다.')
                }

                const { data } = await api.patch('/api/users/myhome', changes)

                this.user = { ...this.user, ...data }
                return data
            } catch (error) {
                this.error = error.response?.data || error
                throw error
            } finally {
                this.loading = false
            }
        },

        async deleteUser() {
            this.loading = true
            this.error = null
            try {
                const { data } = await api.delete('/api/users/myhome')
                console.log(data);
                
            } catch (error) {
                this.error = error.response?.data || error
                throw error
            } finally {
                this.loading = false
            }
        }

    }
})