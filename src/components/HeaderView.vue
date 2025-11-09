<template>
  <v-navigation-drawer
    app
    permanent
    class="custom-drawer"
  >
    <!-- 로고 영역 -->
    <div class="drawer-header">
      <v-icon size="36" color="primary">mdi-airplane</v-icon>
      <h2 class="drawer-title">Travel<span>Mate</span></h2>
    </div>

    <v-divider class="mb-4" />

    <!-- 메뉴 리스트 -->
    <v-list nav density="compact">
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :class="{ active: currentRoute === item.path }"
        @click="goTo(item.path)"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const menuItems = [
  { title: "권한관리", icon: "mdi-shield-account", path: "/auth" },
  { title: "Supervisors", icon: "mdi-account-supervisor-circle", path: "/supervisors" },
  { title: "Clock-in", icon: "mdi-clock-start", path: "/clockin" },
  { title: "설정", icon: "mdi-cog", path: "/settings" },
];

const goTo = (path) => {
  router.push(path);
};

const currentRoute = route.path;
</script>

<style scoped lang="scss">
.custom-drawer {
  width: 250px;
  background: linear-gradient(180deg, #1a237e, #283593, #3949ab);
  color: white;
  border-right: none;
  box-shadow: 3px 0 8px rgba(0, 0, 0, 0.2);
  padding-top: 20px;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 20px;
}

.drawer-title {
  font-weight: 700;
  font-size: 20px;
  color: white;
  margin-top: 6px;
}
.drawer-title span {
  color: #ffca28;
}

.v-list-item {
  border-radius: 10px;
  margin: 4px 12px;
  transition: all 0.2s ease;
  color: #e0e0e0;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.v-list-item.active {
  background-color: #3949ab;
  color: #fff;
  font-weight: 600;
  box-shadow: inset 2px 0 0 #ffca28;
}
</style>
