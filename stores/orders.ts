import { defineStore } from 'pinia'

import type { ICards, ITourOrderSeats } from '@/modules/Orders/types'
import type { IResponse } from '@/types'

export const useOrdersStore = defineStore('ordersStore', {
  state: () => ({
    cards: null as ICards[] | null,
  }),
  actions: {
    async fetchMyCards() {
      try {
        const res = await useApi().$get<IResponse<ICards[]>>(
          '/v1/transaction/cards',
        )
        this.cards = res.data
      } catch (e) {
        console.log(e)
      }
    },
    fetchTourAviaSeats(id: number): Promise<ITourOrderSeats> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<ITourOrderSeats>>(
            `/v1/flight/order/${id}?include=passengers.books.flight,directions`,
          )
          .then((res) => {
            resolve(res.data?.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
