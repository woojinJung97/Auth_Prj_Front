<template>
  <v-container fluid class="pa-6">
    <v-card class="mx-auto" elevation="5" max-width="800">

      <v-card-title class="pa-5 d-flex align-center justify-space-between primary darken-1 white--text">
        <div class="d-flex align-center">
          <v-icon large color="white" class="mr-3">mdi-train-variant</v-icon>
          <span class="text-h5 font-weight-bold">{{ trainDetail?.traingradename }}</span>
        </div>
        <v-chip color="white" variant="outlined" size="large" class="font-weight-bold">
          열차 번호: {{ trainDetail?.trainno }}
        </v-chip>
      </v-card-title>

      <v-divider></v-divider>
      
      <v-card-text class="pa-6">
        <v-row align="center">
          <v-col cols="12" sm="5" class="text-center">
            <v-icon x-large color="blue-grey darken-2">mdi-map-marker-outline</v-icon>
            <div class="text-h4 mt-2 font-weight-black">{{ trainDetail?.depplacename }}</div>
            <div class="text-subtitle-1 grey--text text--darken-1 mt-1">출발역</div>
          </v-col>

          <v-col cols="12" sm="2" class="text-center d-flex flex-column align-center justify-center">
            <v-icon x-large color="grey">mdi-arrow-right-thin</v-icon>
            <div class="text-caption mt-1 grey--text">직행</div>
          </v-col>

          <v-col cols="12" sm="5" class="text-center">
            <v-icon x-large color="red darken-2">mdi-map-marker</v-icon>
            <div class="text-h4 mt-2 font-weight-black">{{ trainDetail?.arrplacename }}</div>
            <div class="text-subtitle-1 grey--text text--darken-1 mt-1">도착역</div>
          </v-col>
        </v-row>

        <v-divider class="my-6"></v-divider>

        <v-row>
          <v-col cols="12" md="6">
            <v-list density="compact">
              <v-list-item>
                <template v-slot:prepend>
                    <v-icon color="success">mdi-clock-out</v-icon>
                </template>

                <v-list-item-title class="font-weight-medium">출발 시각</v-list-item-title>
                <v-list-item-subtitle class="text-h6 font-weight-bold primary--text">
                    {{ formatDateTime(trainDetail?.depplandtime) }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon color="error">mdi-clock-in</v-icon>
                </template>

                <v-list-item-title class="font-weight-medium">도착 시각</v-list-item-title>
                <v-list-item-subtitle class="text-h6 font-weight-bold error--text">
                  {{ formatDateTime(trainDetail?.arrplandtime) }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6" class="d-flex align-center justify-center">
            <v-card variant="tonal" color="teal" class="pa-4 text-center">
              <div class="text-subtitle-1 font-weight-medium">성인 운임 (1인)</div>
              <div class="text-h3 font-weight-black teal--text text--darken-2 mt-1">
                {{ formatCharge(trainDetail?.adultcharge) }}
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="pa-5 bg-grey-lighten-3">
        <v-spacer></v-spacer>
        <v-btn color="primary" size="large" elevation="3">
          <v-icon left>mdi-ticket-confirmation</v-icon>
          예약하기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useTrainStore } from '@/store/useTrainStore'
import { storeToRefs } from 'pinia'

const trainStore = useTrainStore();

const props = defineProps({
  trainno: {
    type: [String, Number],
    required: true
  }
})

const { trainDetail, defaultDepPlaceId, defaultArrPlaceId, defaultDepPlandTime } = storeToRefs(trainStore)

const detailParam = ref({
    depPlaceId : defaultDepPlaceId.value,
    arrPlaceId : defaultArrPlaceId.value,
    depPlandTime : defaultDepPlandTime.value,
    trainno: props.trainno
})

onMounted(async () => {
    await trainStore.fetchTrainDetails(detailParam.value);
});

// ---------------------------------------------------------------------
// 2. 유틸리티 함수 정의 (시간 및 운임 포맷팅)
// ---------------------------------------------------------------------

/**
 * YYYYMMDDHHMMSS 형태의 숫자를 'MM/DD (요일) HH:MM' 문자열로 포맷팅합니다.
 */
const formatDateTime = (datetime) => {
  if (!datetime) return '-';
  const s = String(datetime);
  if (s.length < 14) return s; // 데이터 길이가 맞지 않으면 원본 반환
  
  const year = s.substring(0, 4);
  const month = s.substring(4, 6);
  const day = s.substring(6, 8);
  const hour = s.substring(8, 10);
  const minute = s.substring(10, 12);

  // Date 객체 생성을 위해 ISO 형식으로 변환 (YYYY-MM-DDTHH:MM:SS)
  const dateString = `${year}-${month}-${day}T${hour}:${minute}:00`;
  const date = new Date(dateString);

  // 요일 배열 (한국어)
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = days[date.getDay()];

  return `${month}/${day} (${dayOfWeek}) ${hour}:${minute}`;
};

/**
 * 숫자를 쉼표가 포함된 화폐 단위 문자열로 포맷팅합니다.
 */
const formatCharge = (charge) => {
  if (typeof charge !== 'number') return '0 원';
  return charge.toLocaleString('ko-KR') + ' 원';
};

// ---------------------------------------------------------------------
// 3. Pinia/라우터에서 데이터를 로드하는 로직이 추가될 수 있습니다.
// onMounted(() => { /* API 호출 로직 */ });
// ---------------------------------------------------------------------

// setup 스크립트는 별도의 반환 없이 변수와 함수를 템플릿에 직접 노출합니다.
</script>