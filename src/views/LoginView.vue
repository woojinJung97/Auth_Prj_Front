<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-card class="pa-8" width="400" elevation="8" rounded="xl">
      <v-card-title class="text-h5 font-weight-bold mb-6 text-center">
        로그인
      </v-card-title>

      <v-form @submit.prevent="login" class="d-flex flex-column gap-4">
        <v-text-field
          v-model="email"
          label="아이디"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          density="comfortable"
          required
        />

        <v-text-field
          v-model="password"
          label="비밀번호"
          variant="outlined"
          type="password"
          prepend-inner-icon="mdi-lock"
          density="comfortable"
          required
        />

        <v-btn
          type="submit"
          color="primary"
          size="large"
          class="mt-4"
          block
          elevation="2"
        >
          로그인
        </v-btn>

        <v-btn
          color="secondary"
          variant="outlined"
          size="large"
          class="mt-3"
          block
          @click="goToSignup"
        >
          회원가입
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/useAuthStore';

const router = useRouter();

const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const login = async () => {
  try {
    await authStore.login(email.value, password.value)
  } catch (error) {
    console.error('Login failed', error)
    alert('Login failed!')
  }
}

const goToSignup = () => {
  router.push('/signup')
}

</script>
