<!-- eslint-disable vue/valid-v-else -->
<template>
  <v-card class="seat-picker-card" elevation="5">
    <v-card-title class="bg-blue-grey-lighten-4 text-h6 font-weight-bold py-3">
      <v-icon icon="mdi-armchair-outline" class="mr-2"></v-icon>
      열차 좌석 선택 (1호차)
    </v-card-title>

    <div class="seat-map-container pa-4">
      
      <div class="d-flex justify-space-between mb-4 text-caption text-grey-darken-1">
        <v-chip size="small" color="teal-lighten-1" label class="font-weight-medium">
          <span class="seat-legend-dot teal-lighten-1"></span> 선택 가능
        </v-chip>
        <v-chip size="small" color="indigo-lighten-1" label class="font-weight-medium">
          <span class="seat-legend-dot indigo-lighten-1"></span> 선택 완료
        </v-chip>
        <v-chip size="small" color="grey-lighten-1" label class="font-weight-medium">
          <span class="seat-legend-dot grey-lighten-1"></span> 예약 불가
        </v-chip>
      </div>

      <div class="seat-layout">
        <div class="seat-row seat-labels text-caption text-grey-darken-2 font-weight-bold">
          <div class="seat-group">A(창가)</div>
          <div class="seat-group">B(복도)</div>
          <div class="aisle-spacer">복도</div>
          <div class="seat-group">C(복도)</div>
          <div class="seat-group">D(창가)</div>
        </div>

        <div v-for="row in 15" :key="row" class="seat-row">
          
          <div class="row-number">{{ row }}</div>

          <div class="seat-group seat-group-ab">
            <SeatItem :row="row" col="A" :status="seatStates[`${row}A`]" 
                @update:seatStatus="handleStatusUpdate" />
            <SeatItem :row="row" col="B" :status="seatStates[`${row}B`]" 
                @update:seatStatus="handleStatusUpdate" />
          </div>

          <div class="aisle-spacer"></div>

          <div class="seat-group seat-group-cd">
            <SeatItem :row="row" col="C" :status="seatStates[`${row}C`]" 
                @update:seatStatus="handleStatusUpdate" />
            <SeatItem :row="row" col="D" :status="seatStates[`${row}D`]" 
                @update:seatStatus="handleStatusUpdate" />
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import SeatItem from '@/components/SeatItem.vue';
import { ref } from 'vue';

const seatStates = ref({})

// 초기 좌석 데이터 할당
const initSeats = () => {
    const states = [];
    for (let row =1; row <= 15; row++) {
        for (const col of ['A', 'B', 'C', 'D']) {
            const id = `${row}${col}`
            states[id] = seatStates.value
        }
    }
}
initSeats()

const handleStatusUpdate = (seatId, newStatus) => {
    if (seatStates.value[seatId] !== 'occupied') {
        seatStates.value[seatId] = newStatus
    }
}
</script>

<style scoped>
.seat-picker-card {
  max-width: 600px;
  margin: 2rem auto;
  border-radius: 12px !important;
  overflow: hidden;
}

.seat-map-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.seat-layout {
  width: 100%;
  max-width: 450px; /* 좌석도의 최대 폭 설정 */
}

.seat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px; /* 행 간 간격 */
}

.seat-labels {
  margin-bottom: 15px;
  padding: 0 5px;
}

.row-number {
  width: 25px; /* 행 번호 영역 */
  text-align: right;
  font-weight: bold;
  font-size: 0.9em;
  color: #616161;
}

.seat-group {
  display: flex;
  gap: 8px; /* 그룹 내 좌석 간격 */
}

.seat-group-ab, .seat-group-cd {
  padding: 0 4px; /* 그룹 외곽 여백 */
}

.aisle-spacer {
  width: 40px; /* 복도 공간 넓이 */
  text-align: center;
  font-size: 0.8em;
  color: #9e9e9e;
  border-left: 1px dashed #e0e0e0;
  border-right: 1px dashed #e0e0e0;
  height: 35px; /* 복도 높이 */
  line-height: 35px; /* 복도 텍스트 중앙 정렬 */
  margin: 0 8px;
  box-sizing: border-box;
}

.seat-legend-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 4px;
}
</style>