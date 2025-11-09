<template>
  <v-container
    fluid
    class="home-container d-flex flex-column align-center justify-center"
  >
    <!-- 헤더 영역 -->
    <div class="text-center mb-10">
      <h1 class="display-1 font-weight-bold white--text mb-2">
        여행을 떠나볼까요? ✈️
      </h1>
      <p class="subtitle white--text">
        항공권과 숙소를 한 번에 예약하고 특별한 여행을 시작하세요.
      </p>
    </div>

    <!-- 카드 섹션 -->
    <v-row class="justify-center" dense>
      <!-- 항공권 -->
      <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
        <v-card class="service-card" elevation="8">
          <v-img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=60"
            height="180px"
            cover
          ></v-img>

          <v-card-title class="text-h6 font-weight-bold">항공권 예약</v-card-title>
          <v-card-text class="text-body-2">
            전 세계 어디든, 최저가 항공권을 손쉽게 찾아보세요.
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" block rounded="lg" @click="goToFlight">
              항공권 찾기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- 숙박 -->
      <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
        <v-card class="service-card" elevation="8">
          <v-img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=60"
            height="180px"
            cover
          ></v-img>

          <v-card-title class="text-h6 font-weight-bold">숙박 예약</v-card-title>
          <v-card-text class="text-body-2">
            전 세계 다양한 숙소를 검색하고 간편하게 예약하세요.
          </v-card-text>

          <v-card-actions>
            <v-btn color="secondary" block rounded="lg" @click="goToHotel">
              숙소 찾기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goToFlight = () => {
  router.push("/flight"); // 항공권 페이지 이동
};

const goToHotel = () => {
  router.push("/hotel"); // 숙소 페이지 이동
};
</script>

<style scoped lang="scss">
.home-container {
  background: linear-gradient(135deg, #1e88e5, #64b5f6);
  text-align: center;
  min-height: 100vh;
  padding: 60px 0;
}

.service-card {
  width: 320px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fff;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.subtitle {
  font-size: 18px;
  opacity: 0.9;
}
</style>
