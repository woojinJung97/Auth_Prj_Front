import api from '@/lib/axiosInstance'
import { defineStore } from 'pinia'

const getDynamicDate = () => {
    const now = new Date();
    // UTC 기준이 아닌 KST(한국 표준시)를 사용한다고 가정
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // 여기서는 YYYYMMDD를 기본으로 제공하고, 시간 입력은 사용자에게 맡기는 것이 일반적입니다.
    return `${year}${month}${day}`;
};

export const useTrainStore = defineStore('useTrain', {
    state: () => ({
        trainList: [],
        loading: false,
        error: null,
        defaultDepPlaceName: '서울',
        defaultArrPlaceName: '대전',
        defaultDepPlaceId: 'NAT010000', 
        defaultArrPlaceId: 'NAT011668',
        defaultDepPlandTime: getDynamicDate(),
        stationList: [],
        trainDetail: null,
        seatInfo: [],
    }),
    actions: {
        async fetchUserTrains(criteria) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/train/search', {
                    params: criteria
                })
                
                this.trainList = response.data
                console.log(response.data);
                
                return response.data
            } catch (error) {
                console.error('열차 정보를 불러오는 데 실패했습니다.', error)
                this.error = error
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchStationList() {
            try {
                const response = await api.get('/api/train/train-station')
                this.stationList = response.data.data
                
                // return response.data
            } catch (error) {
                console.error('열차 정보를 불러오는 데 실패했습니다.', error)
                this.error = error
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchTrainDetails(detailParam) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/train/detail', {
                    params: detailParam
                })
                
                this.trainDetail = response.data.data
            } catch (error) {
                console.error('열차 상세 정보를 불러오는 데 실패했습니다.', error)
                this.error = error
                throw error
            } finally {
                this.loading = false
            }
        },

        async fetchSeats(trainno) {
            this.loading = true
            this.error = null
            try {
                const response = await api.get('/api/train/seat-info', {
                    params: trainno
                })
                
                this.seatInfo = response.data.data

                return response.data.data
            } catch (error) {
                console.error('좌석조회에 실패했습니다.', error)
                this.error = error
            }
        },

        async reservSeats(payload) {
            this.loading = true
            this.error = null
            try {
                const response = await api.post('/api/train/reserv/train', payload)
                console.log(response);
                
            } catch (error) {
                console.error('좌석지정에 실패했습니다.', error);
                this.error = error
                throw error
            } finally {
                this.loading = false
            }
        },

    }
})