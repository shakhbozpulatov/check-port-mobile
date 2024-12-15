import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'
import type { IResponse } from '@/types'
import type { IHotel } from '@/types/hotel'
const { myToast } = useCustomToast()
import type {
  IContent,
  IFlight,
  IHotelResponse,
  ITourOffersParams,
  ITourOffersResponse,
  ITourOrderCheck,
  ITourRooms,
  ITourSearch,
  ITourSearchResponse,
  ITourSingle,
} from '@/types/tour'
import { ITicketFilter, ITourTickets } from '@/types/tour'

export const useTourStore = defineStore('tourStore', {
  state: () => ({
    searchResult: {} as ITourSearchResponse,
    allTourOffers: null as ITourOffersResponse | null,
    tourHotels: [] as IHotel[],
    filterLoader: false,
    singleData: {} as ITourSingle,
    singleTourRooms: {} as ITourRooms,
    ticketsDialog: false,
    tourAviaTickets: null as ITourTickets | null,
    chosenTicket: null as IFlight | null,
    defaultTours: [],
    orderCheck: null as ITourOrderCheck | null,
    ticketsFilterLoader: false,
    selectedDefaults: {
      location_id: '',
      dep: '',
    },
    selectedTourDefault: null as IContent | null,
    filterData: null as IHotelResponse | null,
  }),
  actions: {
    searchTour(data: ITourSearch): Promise<IResponse<ITourSearchResponse>> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IResponse<ITourSearchResponse>>('/v1/tour/search', {
            body: data,
            params: {
              search_mode: 'mix',
              platform: 'app',
            },
          })
          .then((res) => {
            this.searchResult = res.data
            resolve(res)
          })
          .catch((err) => {
            reject(err)
            useDashboardStore().loading = false
          })
      })
    },
    async fetchTourOffers(params: ITourOffersParams, filter?: boolean) {
      let error = ''
      const stopper = false
      try {
        // while (this.allTourOffers?.status !== "Ready") {
        const res = await useApi().$get<IResponse<ITourOffersResponse>>(
          '/v1/tour/get-offers',
          {
            params: {
              request_id: this.searchResult.request_id,
              ...params,
              platform: 'app',
            },
          },
        )
        this.allTourOffers = res.data
        this.chosenTicket = res.data?.flights?.[0]
        if (!this.allTourOffers) return
        if (!filter) {
          this.filterData = res.data.hotel_response
        }
        if (params.page > 1) {
          this.tourHotels = [...this.tourHotels, ...this.allTourOffers.hotels]
        } else {
          this.tourHotels = this.allTourOffers.hotels
        }
        this.filterLoader = false
        if (this.allTourOffers?.status !== 'Ready' && !error && !stopper) {
          await this.fetchTourOffers(params)
        }
      } catch (err) {
        console.log(err)
        error = err?.response?.data
      } finally {
        useDashboardStore().loading = false
      }
    },
    getTourSingle(id: string, type: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<ITourSingle>('/v1/hotel/get-hotel', {
            params: {
              hotel_id: id,
              type: type,
              lang: useCookie('i18n_redirect').value || 'ru',
              currency: useCookie('currency').value || 'USD',
              platform: 'app',
            },
          })
          .then((res) => {
            this.singleData = res
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    getTourRooms(params) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<ITourRooms>('/v1/tour/rooms', {
            params: {
              ...params,
              platform: 'app',
            },
          })
          .then((res) => {
            this.singleTourRooms = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getTourAllTickets(
      params?: ITicketFilter,
    ): Promise<IResponse<ITourTickets>> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<ITourTickets>>('/v1/tour/tickets', {
            params: {
              request_id: this.searchResult.request_id,
              sort: params?.filterStatus,
              stops: params?.stops,
              only_baggage: params?.isBaggage ? 1 : 0,
              airlines: params?.airlines,
              depTimes: params?.depTimes,
              arrTimes: params?.arrTimes,
              pageSize: params?.pageSize,
              min_price: params?.min_price,
              max_price: params?.max_price,
            },
          })
          .then((res) => {
            this.tourAviaTickets = res.data
            resolve(res.data)
          })
          .catch((err) => {
            myToast('warning', 'Expired')
            reject(err)
          })
      })
    },
    changeTicket(flight_buy_id: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/v1/tour/change-ticket', {
            params: {
              flight_buy_id,
              request_id: this.searchResult.request_id,
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => reject(err))
      })
    },
    getTourOrderCheck(data): Promise<ITourOrderCheck> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IResponse<ITourOrderCheck>>('/v1/tour/check', {
            body: data,
            params: {
              platform: 'app',
            },
          })
          .then((res) => {
            this.orderCheck = res.data
            resolve(res.data)
          })
          .catch((err) => reject(err))
      })
    },
  },
})
