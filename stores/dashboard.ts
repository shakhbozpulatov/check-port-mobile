import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'
import type {
  IAirportSearch,
  ICitizenship,
  IDirection,
  IDirectionsList,
  IResponse,
  IResponseCalendar,
  IRules,
} from '@/types'

export const useDashboardStore = defineStore('dashboardStore', {
  state: () => ({
    calendarDates: {} as IResponseCalendar,
    rules: {} as IRules | null,
    loading: false,
    citizenship: null as ICitizenship[] | null,
    airports: [] as IAirportSearch[],
    directions: [] as IDirection[],
    hotelTransfer: [],
  }),
  actions: {
    getTourCalendarData(
      departure: string,
      location_id: string,
      type: string | undefined,
    ): Promise<IResponseCalendar> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponseCalendar>('/v1/flight/charter-loc', {
            params: {
              departure,
              location_id,
              type,
            },
          })
          .then((res) => {
            this.calendarDates = res
            this.rules = res?.rules
            resolve(res)
          })
          .catch((err) => {
            this.calendarDates = {}
            reject(err)
          })
      })
    },
    getCitizenship(): Promise<ICitizenship[]> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<ICitizenship[]>>('/v1/user/citizenship')
          .then((res) => {
            resolve(res)
            this.citizenship = res.data
          })
          .catch((e) => {
            reject(e)
          })
      })
    },
    getAirports(query: string): Promise<IAirportSearch[]> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IAirportSearch[]>('/v1/airports/elastic', {
            params: {
              code: query,
              lang: 'ru',
            },
          })
          .then((res) => {
            const result = []
            const others: IAirportSearch[] = []
            const airPortCodes: string[] = []
            const cityCodes: (string | undefined)[] = res
              ?.map((city) => {
                if (city.type === 'city') {
                  return city.code
                }
              })
              .filter(Boolean)
            const cities = res?.filter((city) => city.type === 'city')
            if (cities.length) {
              cities.forEach((city) => {
                result.push(city)
                res?.forEach((el) => {
                  if (el?.type === 'airport' && city.code === el?.city_code) {
                    result.push(el)
                  } else if (
                    el?.type === 'airport' &&
                    !cityCodes.includes(el?.city_code) &&
                    !airPortCodes.includes(el?.city_code)
                  ) {
                    airPortCodes.push(el?.city_code)
                    others.push(el)
                  }
                })
              })
            } else {
              result.push(...res)
            }
            this.airports = [...result, ...others]
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getDirections(query: string, isHotel?: boolean): Promise<IDirectionsList> {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IDirectionsList>>(
            `https://www.expedia.com/api/v4/typeahead/${query}`,
            {
              params: {
                lob: 'HOTELS',
                locale: 'en_US',
                maxresults: 10,
                format: 'json',
                client: 'SearchForm',
                regiontype: isHotel ? 2047 : undefined,
                // str: query,
                // include,
              },
            },
          )
          .then((res) => {
            this.directions = res?.sr?.map((el) => {
              return {
                eps_id: el?.essId?.sourceId,
                type: el?.type,
                name: el?.regionNames?.shortName,
                name_full: el?.regionNames?.fullName,
                displayName: el?.regionNames?.displayName,
                adress: '',
                id: el?.essId?.sourceId,
                eps_search: true,
              }
            })
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getHotelTransfer(id: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get(`/v1/hotel/transfer-rules?location_id=${id}`)
          .then((res) => {
            this.hotelTransfer = res
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
