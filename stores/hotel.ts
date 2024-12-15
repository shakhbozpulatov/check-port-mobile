import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'
import type { IResponse } from '@/types'
import type {
  IHotel,
  IHotelResponse,
  IHotelSearchData,
  IHotelSearchParams,
  IHotelSingle,
  IOrderCheck,
  IRoomsSearchData,
  ISingleRooms,
} from '@/types/hotel'

export const useHotelStore = defineStore('hotelStore', {
  state: () => ({
    hotelsResponse: null as IHotelResponse | null,
    hotels: [] as IHotel[],
    single: null as IHotelSingle | null,
    singleRooms: null as ISingleRooms | null,
    loading: false,
    orderCheck: null as IOrderCheck | null,
  }),
  actions: {
    getHotelOffers(data: IHotelSearchData, params: IHotelSearchParams) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IHotelResponse>('/v1/hotel/search', {
            body: data,
            params: {
              ...params,
              type: params?.type ? params?.type?.split(',') : undefined,
              hotel_themes: params?.hotel_themes
                ? params?.hotel_themes?.split(',')
                : undefined,
              category: params?.category
                ? params?.category?.split(',')
                : undefined,
              dmc_list: params?.dmc_list
                ? params?.dmc_list?.split(',')
                : undefined,
              board: params?.board ? params?.board?.split(',') : undefined,
              exoptions: params?.exoptions
                ? params?.exoptions?.split(',')
                : undefined,
              exregions: params?.exregions ? params?.exregions : undefined,
              platform: 'app',
            },
          })
          .then((res) => {
            this.hotelsResponse = res
            if (params?.page > 1) {
              const keys = Object.keys(res.hotels)
              this.hotels = [
                ...this.hotels,
                ...keys.map((key) => ({
                  id: key,
                  ...res.hotels[key],
                })),
              ]
            } else {
              const keys = Object.keys(res.hotels)
              this.hotels = keys.map((key) => ({
                id: key,
                ...res.hotels[key],
              }))
            }
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => {
            this.loading = false
            // dashboardStore.loading = false
          })
      })
    },
    getHotelSingle(id: string, type: string) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IHotelSingle>('/v1/hotel/get-hotel', {
            params: {
              hotel_id: id,
              type: type?.toLowerCase(),
              lang: useCookie('i18n_redirect').value ?? 'ru',
              currency: useCookie('currency').value ?? 'USD',
            },
          })
          .then((res) => {
            this.single = res
            resolve(res)
          })
          .catch((err) => reject(err))
          .finally(() => {
            this.loading = false
          })
      })
    },
    fetchHotelRooms(data: IRoomsSearchData, loc_id: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<ISingleRooms>('/v1/hotel/rooms', {
            body: data,
            params: {
              platform: 'app',
              location_id: loc_id,
            },
          })
          .then((res) => {
            this.singleRooms = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    checkIsExistRoom(buy_id: string): Promise<IOrderCheck> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IResponse<IOrderCheck>>('/v1/hotel/check', {
            body: {
              product_id: 2,
              buy_id: buy_id,
            },
            params: {
              platform: 'app',
            },
          })
          .then((res) => {
            this.orderCheck = res.data
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
