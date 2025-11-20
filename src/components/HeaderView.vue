<template>
  <v-navigation-drawer app permanent class="custom-drawer">
    <!-- Logo / Brand -->
    <div class="drawer-header" @click="goTo('/home')">
      <div class="brand-icon">
        <v-icon size="28" color="white">mdi-train</v-icon>
      </div>
      <div class="brand-text">
        <h2>Travel<span>Mate</span></h2>
        <small>기차 · 숙박 예약</small>
      </div>
    </div>

    <v-divider class="mb-4" />

    <!-- Search quick (compact) -->
    <div class="quick-search px-4 mb-3">
      <v-text-field
        dense
        hide-details
        rounded
        placeholder="도시 또는 역 검색"
        append-inner-icon="mdi-magnify"
        @click:append-inner="goTo('/search')"
      />
    </div>

    <!-- Menu -->
    <v-list nav density="compact" class="menu-list">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :class="{ active: currentRoute === item.path }"
        @click="goTo(item.path)"
      />
    </v-list>

    <div class="flex-spacer"></div>

    <!-- User area -->
    <div class="user-panel">
      <template v-if="auth.isAuthenticated">
        <div class="user-info">
          <v-avatar size="40" class="mr-3">
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          <div class="user-meta">
            <div class="user-name">{{ auth.user?.nickname || auth.user?.email || '회원' }}</div>
            <div class="user-sub">멤버십 레벨 · 일반</div>
          </div>
        </div>

        <div class="user-actions">
          <v-btn small text @click="goTo('/my-home')">내 정보</v-btn>
          <v-btn small color="secondary" @click="logout">로그아웃</v-btn>
        </div>
      </template>

      <template v-else>
        <div class="user-guest">
          <v-btn small text @click="goTo('/login')">로그인</v-btn>
          <v-btn small color="primary" @click="goTo('/signup')">회원가입</v-btn>
        </div>
      </template>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/store/useAuthStore'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const menuItems = [
  { title: '홈', icon: 'mdi-home', path: '/home' },
  { title: '기차', icon: 'mdi-train', path: '/train' },
  { title: '숙박', icon: 'mdi-hotel', path: '/hotel' },
  { title: '내 예약', icon: 'mdi-calendar-check', path: '/bookings' },
  { title: '고객센터', icon: 'mdi-headset', path: '/support' },
]

const currentRoute = computed(() => route.path)

const goTo = (path) => {
  router.push(path)
}

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.custom-drawer {
  width: 260px;
  background: linear-gradient(180deg,#0b2546 0%, #133a6b 60%);
  color: #f8fafc;
  border-right: none;
  box-shadow: 4px 0 18px rgba(2,6,23,0.28);
  padding-top: 18px;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  cursor: pointer;
}

.brand-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background: linear-gradient(90deg,#06b6d4,#3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(3,105,161,0.2);
}

.brand-text h2 { margin: 0; font-size: 18px; font-weight: 800; }
.brand-text h2 span { color: #ffd166; }
.brand-text small { color: rgba(255,255,255,0.7); }

.quick-search { padding: 0 12px; }
.quick-search .v-text-field { background: rgba(255,255,255,0.03); border-radius: 8px; }

.menu-list { padding: 6px 6px; }
.v-list-item {
  margin: 6px 10px;
  border-radius: 10px;
  color: rgba(255,255,255,0.9);
  transition: background 0.18s, transform 0.18s;
}
.v-list-item:hover { transform: translateX(4px); background: rgba(255,255,255,0.03); }
.v-list-item.active { background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); box-shadow: inset 4px 0 0 #ffd166; font-weight: 700; }

.flex-spacer { flex: 1; }

.user-panel {
  padding: 12px 14px;
  border-top: 1px solid rgba(255,255,255,0.04);
}
.user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.user-meta .user-name { font-weight: 700; color: #fff; }
.user-meta .user-sub { font-size: 12px; color: rgba(255,255,255,0.65); }
.user-actions { display:flex; gap:8px; }
.user-guest { display:flex; gap:8px; justify-content: center; }

.v-btn { font-weight: 700; }

@media (max-width: 960px) {
  .custom-drawer { width: 72px; }
  .brand-text, .quick-search, .user-meta, .tile-desc { display: none; }
  .v-list-item { margin: 6px 6px; }
}
</style>
