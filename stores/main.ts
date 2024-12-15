import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import type { IStory } from '~/types'

export const useMainStore = defineStore('main', {
  state: () => ({
    readyTickets: [],
    charterList: [],
    stories: [] as IStory[],
    watchedStories: [] as string[],
  }),
  actions: {
    async getCharters() {
      try {
        this.readyTickets = await useApi().$get('/v1/flight/get-charter', {
          params: {
            platform: 'app',
          },
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getCharterList() {
      try {
        this.charterList = await useApi().$get('/v1/airports/charter')
      } catch (e) {
        console.log(e)
      }
    },
    async getStories() {
      try {
        this.stories = await useApi().$get(
          'https://b2c.asialuxe.app/api/banner/mob-stories/',
        )
      } catch (e) {
        console.log(e)
      }
    },
  },
})
