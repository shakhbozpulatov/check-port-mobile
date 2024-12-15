import { defineStore } from 'pinia'

import type { IOffers } from '@/types/greeting'

export const useGreetingStore = defineStore('greetingStore', {
  state: () => {
    return {
      offers: {} as IOffers,
    }
  },
  actions: {},
})
