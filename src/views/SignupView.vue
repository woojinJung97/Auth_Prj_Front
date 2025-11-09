<template>
  <v-container class="fill-height d-flex justify-center align-center" fluid>
    <v-card class="pa-8" width="440" elevation="8" rounded="xl">
      <v-card-title class="text-h5 font-weight-bold mb-6 text-center">
        회원가입
      </v-card-title>

      <v-form v-model="valid" @submit.prevent="onSubmit" class="d-flex flex-column gap-3">
        <v-text-field
          v-model="email"
          label="이메일"
          variant="outlined"
          prepend-inner-icon="mdi-email"
          :rules="[rules.required, rules.email]"
          clearable
          density="comfortable"
          required
          @blur="checkEmail"
        />

        <v-text-field
          v-model="nickname"
          label="닉네임"
          variant="outlined"
          prepend-inner-icon="mdi-account"
          :rules="[rules.required, rules.min2]"
          clearable
          density="comfortable"
          required
          @blur="checkNickname"
        />

        <v-text-field
          v-model="password"
          :type="showPw ? 'text' : 'password'"
          label="비밀번호"
          variant="outlined"
          prepend-inner-icon="mdi-lock"
          :append-inner-icon="showPw ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPw = !showPw"
          :rules="[rules.required, rules.pw]"
          density="comfortable"
          required
        />

        <v-text-field
          v-model="passwordConfirm"
          :type="showPw2 ? 'text' : 'password'"
          label="비밀번호 확인"
          variant="outlined"
          prepend-inner-icon="mdi-lock-check"
          :append-inner-icon="showPw2 ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPw2 = !showPw2"
          :rules="[rules.required, matchPassword]"
          density="comfortable"
          required
        />

        <v-checkbox
          v-model="agree"
          :rules="[v => !!v || '약관에 동의해주세요.']"
          label="서비스 약관 및 개인정보 처리방침에 동의합니다."
          density="compact"
        />

        <v-btn
          type="submit"
          color="primary"
          size="large"
          class="mt-2"
          block
          :disabled="!valid || loading"
          :loading="loading"
        >
          회원가입
        </v-btn>

        <v-btn
          variant="text"
          size="small"
          class="mt-2"
          block
          @click="goLogin"
        >
          이미 계정이 있으신가요? 로그인
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>
<script setup>
import { useAuthStore } from '@/store/useAuthStore';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter()
const valid = ref(false)
const loading = ref(false)

const email = ref('')
const nickname = ref('')
const password = ref('')
const passwordConfirm = ref('')
const agree = ref(false)

const showPw = ref(false)
const showPw2 = ref(false)

const emailAvailable = ref(true)
const nicknameAvailable = ref(true)
const emailMessage = ref('')
const nicknameMessage = ref('')

// 필수입력 체크
const rules = {
    required: v => (!!v || v === 0) || '필수 항목입니다.',
    email: v => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.',
    min2: v => (v && v.length >= 2) || '2자 이상 입력해주세요.',
    pw: v =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/.test(v) ||
        '비밀번호는 영문+숫자 포함 8자 이상이어야 합니다.',
}

const matchPassword = computed(() => (v) =>
    v === password.value || '비밀번호가 일치하지 않습니다.'
)

// 이메일 중복 확인
const checkEmail = async () => {
  if (!email.value) return
  const result = await authStore.checkEmail(email.value)
  emailAvailable.value = result.available
  emailMessage.value = result.message
}

// 닉네임 중복 확인
const checkNickname = async () => {
  if (!nickname.value) return
  const result = await authStore.checkNickname(nickname.value)
  nicknameAvailable.value = result.available
  nicknameMessage.value = result.message
}

watch(email, () => {
  emailAvailable.value = true
  emailMessage.value = ''
})

watch(nickname, () => {
  nicknameAvailable.value = true
  nicknameMessage.value = ''
})

const onSubmit = async () => {
    if (!valid.value) return

    if (!emailAvailable.value) {
      alert('이미 사용 중인 이메일입니다.')
      return
    }
    if (!nicknameAvailable.value) {
      alert('이미 사용 중인 닉네임입니다.')
      return
    }
    
    loading.value = true
    try {
        await authStore.signup({
            email: email.value,
            nickname: nickname.value,
            password: password.value,
        })
        router.push('/login')
    } catch (error) {
        console.error(error)
    }
}

const goLogin = () => {
    router.push('/login')
}
</script>