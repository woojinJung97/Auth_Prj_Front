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
      <!-- 기차 -->
      <v-col cols="12" sm="6" md="4" class="d-flex justify-center">
        <v-card class="service-card" elevation="8">
          <v-img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=60"
            height="180px"
            cover
          ></v-img>

          <v-card-title class="text-h6 font-weight-bold">기차 예약</v-card-title>
          <v-card-text class="text-body-2">
            최저가 기차표를 손쉽게 찾아보세요.
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" block rounded="lg" @click="goToTrain">
              기차표 찾기
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

const goToTrain = () => {
  router.push("/train"); // 기차 페이지 이동
};

const goToHotel = () => {
  router.push("/hotel"); // 숙소 페이지 이동
};
</script>

<style scoped>
.home-container {
  position: relative;
  background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #60a5fa 100%);
  color: #fff;
  text-align: center;
  min-height: 100vh;
  padding: 80px 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* subtle decorative circles */
.home-container::before,
.home-container::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  pointer-events: none;
}
.home-container::before {
  width: 420px;
  height: 420px;
  background: rgba(255,255,255,0.08);
  left: -80px;
  top: -40px;
}
.home-container::after {
  width: 520px;
  height: 520px;
  background: rgba(255,255,255,0.06);
  right: -120px;
  bottom: -60px;
}

.text-center h1 {
  letter-spacing: -0.5px;
  font-weight: 700;
}

.subtitle {
  font-size: 18px;
  opacity: 0.95;
  margin-top: 6px;
}

/* Cards layout */
.v-row.justify-center {
  z-index: 1; /* keep cards above decorative shapes */
}

.service-card {
  width: 340px;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,0.95);
  box-shadow: 0 8px 24px rgba(2,6,23,0.25);
  transition: transform 0.35s cubic-bezier(.22,.9,.32,1), box-shadow 0.35s;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 40px rgba(2,6,23,0.28);
}

/* image area with gradient overlay */
.service-card .v-img {
  height: 200px !important;
  position: relative;
}

.service-card .v-img::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 100%);
  pointer-events: none;
}

.service-badge {
  position: absolute;
  left: 14px;
  top: 14px;
  background: linear-gradient(90deg,#ff8a65,#ff7043);
  color: #fff;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 12px;
  font-size: 12px;
  box-shadow: 0 6px 18px rgba(255,112,67,0.18);
  z-index: 2;
}

.v-card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 700;
  color: #102a43;
}

.v-card-text {
  color: #334155;
  font-size: 14px;
  padding: 0 18px 12px 18px;
}

.v-card-actions {
  padding: 16px 18px 20px 18px;
}

/* primary/secondary button styling override for a more modern look */
.service-card .v-btn {
  width: 100%;
  font-weight: 700;
  text-transform: none;
  box-shadow: none;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.service-card .v-btn:hover {
  transform: translateY(-3px);
}

/* specialized styles for primary and secondary variants */
.service-card .v-btn[color="primary"] {
  background: linear-gradient(90deg,#0066ff,#3b82f6) !important;
  color: #fff !important;
}

.service-card .v-btn[color="secondary"] {
  background: linear-gradient(90deg,#06b6d4,#3b82f6) !important;
  color: #fff !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .service-card {
    width: 92%;
    margin: 12px 0;
  }

  .home-container {
    padding: 40px 16px;
  }
}

@media (min-width: 1200px) {
  .service-card {
    width: 360px;
  }
}

/* accessibility: focus states */
.service-card .v-btn:focus {
  outline: 3px solid rgba(59,130,246,0.18);
  outline-offset: 2px;
}
</style>
