<template>
  <v-app>
    <!-- 로그인 / 회원가입 페이지가 아닐 때만 헤더 표시 -->
    <HeaderView v-if="!isAuthPage" />
      <router-view />
  </v-app>
</template>

<script setup>
import { useRoute } from 'vue-router'
import HeaderView from '@/components/HeaderView.vue'
import { ref, watch } from 'vue'

const route = useRoute()

const isAuthPage = ref(false)

watch(
  () => route.path,
  (newPath) => {
    isAuthPage.value = ['/login', '/signup'].includes(newPath)
  },
  { immediate: true }
)
</script>
<style>
.v-application {
  background-color: #f8fafc;
}
</style>