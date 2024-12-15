import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'
import type { IResponse } from '@/types'
// import { useCalcExpireTime } from '@/composables/useExpireMessage'
import type { IAviaTicketResponse, ISearch, ITicketDetail } from '@/types/avia'
import type { IFlight, ITourSearchResponse } from '@/types/tour'
export const useAviaStore = defineStore('aviaStore', {
  state: () => {
    return {
      allTicketsResponse: null as IAviaTicketResponse | null,
      tickets: [] as IFlight[],
      searchResponse: null as ITourSearchResponse | null,
      searchData: {
        onlyCharter: 0,
        product_id: 1,
        adult_qnt: 1,
        child_qnt: 0,
        infant_qnt: 0,
        class: 'E',
        currency: useCookie('currency').value || 'USD',
        in_one_days: 0,
        charter_three_days: 0,
        only_baggage: 0,
        sorting_price: 1,
        directions: [
          {
            dep_type: '',
            arr_type: '',
            departure_code: '',
            arrival_code: '',
            date: '',
          },
        ],
      },
      filterParams: {
        sort: 'price',
        stops: [],
        only_baggage: 0, // 1
        airlines: [],
        depTimes: [],
        arrTimes: [],
        min_price: 0,
        max_price: 0,
      },
      filterLoader: false,
      routeChange: false,
      ticketDetail: null as ITicketDetail | null,
    }
  },

  actions: {
    async searchTickets(data: ISearch) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IResponse<ITourSearchResponse>>('/v1/tickets/search', {
            body: data,
            params: {
              platform: 'app',
            },
          })
          .then((res) => {
            this.searchResponse = res.data
            resolve(res.data)
            useCalcExpireTime(1717166420 * 1000)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    // FOR GETTING ALL TICKETS USING REQUEST_ID
    async getAllTickets(params) {
      try {
        const res = await useApi().$get<IAviaTicketResponse>(
          '/v1/tickets/get-offers',
          {
            params: {
              request_id: this.searchResponse?.request_id,
              pagination: true,
              platform: 'app',
              ...params,
            },
          },
        )
        this.allTicketsResponse = res
        if (params?.page > 1) {
          this.tickets.push(...this.allTicketsResponse.data.data)
        } else {
          const charters = this.allTicketsResponse?.data?.data.filter(
            (elem) => elem.provider_id === 1,
          )
          const regulars = this.allTicketsResponse?.data?.data.filter(
            (elem) => elem.provider_id !== 1,
          )

          this.tickets = [...charters, ...regulars]
        }
        if (this.allTicketsResponse?.status !== 'Ready' && !this.routeChange) {
          await this.getAllTickets(params)
        }
      } catch (error) {
        console.log(error)
      }
    },
    fetchTicketDetail(buy_id: string): Promise<ITicketDetail> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IResponse<ITicketDetail>>('/v1/flight/check', {
            body: {
              buy_id,
              product_id: 1,
            },
            params: {
              platform: 'app',
            },
          })
          .then((res) => {
            this.ticketDetail = res.data
            resolve(res.data)
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
  },
})
