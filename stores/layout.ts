import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layoutStore', {
  state: () => ({
    activeSidebar: 'main',
    authRequiredMain: 'login',
    langDialog: false,
    bookError: false,
    isSidebarOpen: false,
    closeFooter: false,
    authDialog: false,
    theme: useCookie('theme').value || 'light',
    currency: useCookie('currency').value || 'USD',
    priceType: 'All',
    loginForm: {
      phone_or_email: '',
      password: '',
    },
  }),
  actions: {
    changeTheme(_theme: string) {
      this.theme = _theme
    },
    setCurrency(currency: string) {
      const cur = useCookie('currency')
      cur.value = currency
      this.currency = currency
    },
    setRegion(region: string) {
      const reg = useCookie('region')
      reg.value = region
    },
  },
})
