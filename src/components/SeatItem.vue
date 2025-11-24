<template>
  <div 
    class="seat-item" 
    :class="[statusClass, { 'is-window': isWindow }]"
    :data-seat="seatId"
    @click="handleClick"
  >
    {{ row }}{{ col }}
    <v-tooltip activator="parent" location="top">
      {{ isWindow ? '창가' : '복도' }} - {{ seatStatusText }}
    </v-tooltip>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  row: { type: Number, required: true },
  col: { type: String, required: true }, // A, B, C, D
  status: { type: String, default: 'available' } // available, occupied, selected
});

const seatId = ref( `${props.row}${props.col}`);

// 창가 좌석 구분 (A, D)
const isWindow = computed(() => props.col === 'A' || props.col === 'D');

const statusClass = computed(() => `seat-status-${props.status}`);

const emit = defineEmits(['update:seatStatus'])

const seatStatusText = computed(() => {
  switch (props.status) {
    case 'available': return '선택 가능';
    case 'occupied': return '예약 완료';
    case 'selected': return '내가 선택한 좌석';
    default: return '';
  }
});

const handleClick = () => {
    if (props.status !== 'occupied') {
        const newStatus = props.status === 'selected' ? 'available' : 'selected'

        emit('update:seatStatus', seatId.value, newStatus)
    }
};
</script>

<style scoped>
.seat-item {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85em;
  font-weight: bold;
  border-radius: 4px; /* 좌석의 각진 형태 */
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* --- 상태별 CSS --- */

/* 1. 예약 가능 (Available) - 기본 상태 */
.seat-status-available {
  background-color: #e0f2f1; /* Light Teal */
  color: #00796b; /* Dark Teal text */
}

.seat-status-available:hover {
  background-color: #b2dfdb; /* Darker Teal on hover */
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

/* 2. 선택 완료 (Selected) - 현재 사용자가 선택한 좌석 */
.seat-status-selected {
  background-color: #9fa8da; /* Medium Indigo */
  color: white;
  border: 2px solid #5c6bc0; /* Darker Indigo border */
  transform: scale(1.05); /* 약간 강조 */
}

/* 3. 예약 불가 (Occupied) - 다른 사람이 예약한 좌석 */
.seat-status-occupied {
  background-color: #f5f5f5; /* Light Grey */
  color: #9e9e9e; /* Grey text */
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.8;
  text-decoration: line-through;
}

/* --- 창가/복도 추가 스타일 (옵션) --- */

.is-window {
  /* 창가 좌석에 약간의 음영을 주어 창문 느낌 강조 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>