<template>
  <v-app>
    <v-container fluid>
      <v-card class="mb-6" elevation="3">
        <v-card-title class="text-h5 primary white--text">
          <v-icon left>mdi-train-car</v-icon>
          기차 조회
        </v-card-title>
        <v-card-text class="pa-4">
          <v-form ref="searchForm">
            <v-row>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="searchCriteria.depPlaceId"
                  :items="stationList"
                  item-title="nodename"
                  item-value="nodeid"
                  label="출발지 (역 코드)"
                  placeholder="예: 서울"
                  prepend-icon="mdi-map-marker-outline"
                  variant="outlined"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  v-model="searchCriteria.arrPlaceId"
                  :items="stationList"
                  item-title="nodename"
                  item-value="nodeid"
                  label="도착지 (역 코드)"
                  placeholder="예: 대전"
                  prepend-icon="mdi-map-marker"
                  variant="outlined"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="searchCriteria.depPlandTime"
                  label="출발일시 (YYYYMMDDHHMMSS)"
                  placeholder="예: 20251113050000"
                  prepend-icon="mdi-calendar-clock"
                  variant="outlined"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0 justify-end">
          <v-btn
            color="primary"
            elevation="2"
            size="large"
            @click="searchTrains"
          >
            <v-icon left>mdi-magnify</v-icon>
            열차 조회
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card elevation="3">
        <v-card-title class="text-h5 primary white--text">
          <v-icon left>mdi-format-list-bulleted</v-icon>
          조회 결과
        </v-card-title>
        <v-card-text class="pa-0">
          <v-data-table
            :headers="trainHeaders"
            :items="trainList"
            item-key="trainno"
            class="elevation-0"
            :loading="loading"      loading-text="열차 정보를 조회 중입니다..."
            no-data-text="조회된 열차 정보가 없습니다."
            @click:row="searchTrainDetails"
          >
            <template v-slot:[`item.adultcharge`]="{ item }">
              <span class="font-weight-bold">{{ item.adultcharge.toLocaleString() }} 원</span>
            </template>
            <template v-slot:[`item.traingradename`]="{ item }">
              <v-chip :color="getTrainGradeColor(item.traingradename)" small label>
                {{ item.traingradename }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTrainStore } from '@/store/useTrainStore'
import { storeToRefs } from 'pinia'; // 상태 반응성 유지를 위해 필요
import { useRouter } from 'vue-router';

// pinia store 인스턴스 생성
const trainStore = useTrainStore();

const router = useRouter();
// pinia store의 상태를 참조
const { trainList, stationList, loading } = storeToRefs(trainStore);

// 열차 목록 조회 조건
const searchCriteria = ref({
  depPlaceId: trainStore.defaultDepPlaceId,
  arrPlaceId: trainStore.defaultArrPlaceId,
  depPlandTime: trainStore.defaultDepPlandTime,
});

const searchTrains = async () => {
  try {
    await trainStore.fetchUserTrains(searchCriteria.value);
  } catch (error) {
    console.error('열차 조회 중 오류 발생:', error);
  }
}

const searchTrainDetails = (event, { item }) => {
    const trainno = item.trainno;
    router.push({ name: 'TrainDetailView', params: { trainno } });
}

onMounted(() => {
    trainStore.fetchStationList();
    // 초기 열차 조회
    searchTrains();
})

const trainHeaders = [
      { title: '열차 번호', align: 'start', key: 'trainno' },
      { title: '열차 종류', align: 'start', key: 'traingradename' },
      { title: '출발역', align: 'start', key: 'depplacename' },
      { title: '도착역', align: 'start', key: 'arrplacename' },
      { title: '출발 시간', align: 'end', key: 'depplandtime' },
      { title: '도착 시간', align: 'end', key: 'arrplandtime' },
      { title: '운임 (성인)', align: 'end', key: 'adultcharge' },
];

const getTrainGradeColor = (grade) => {
  if (!grade) return 'grey-lighten-1';
  if (grade.includes('KTX')) return 'red-lighten-2';
  if (grade.includes('새마을')) return 'blue-lighten-2';
  if (grade.includes('무궁화')) return 'green-lighten-2';
  return 'grey-lighten-1';
};
</script>

<style scoped>
.primary {
  background-color: #1976D2 !important;
}
.white--text {
  color: white !important;
}
</style>