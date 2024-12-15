import { defineStore } from 'pinia'

import { useApi } from '@/composables/useApi'
import type { IResponse } from '@/types'
import type { IUser } from '@/types/auth'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null as IUser | null,
    loggedIn: false,
    publicToken:
      'oqO7ALyHbi41BKJ-7QJ7PXLa59P1LEGmQp0UlkWCunsqqsQvz_1a5jFKRvHM_anc',
  }),
  actions: {
    getTokens() {
      return useCookie('token') || this.publicToken
    },
    fetchUser() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResponse<IUser>>('/v1/user/get-me?include=userDetail')
          .then((res) => {
            this.user = res?.data
            this.loggedIn = true
            resolve(res)
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    setToken(value: string) {
      const token = useCookie<string>('token')
      token.value = value
    },
    login(data): Promise<IResponse<{ token: string }>> {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<IResponse<{ token: string }>>('/v1/user/sign-in', {
            body: data,
          })
          .then((res) => {
            // localStorage.setItem('token', res?.data?.token)
            const token = useCookie<string>('token')
            token.value = res?.data?.token
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    async logout() {
      const token = useCookie('token')
      token.value = null
      this.user = null
      this.loggedIn = false
      window.location.replace('/')
    },
  },
})
