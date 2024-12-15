import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookieStore', () => {
  interface ISaveData {
    code: string
    address: string
    name: string
    stars: string | number
    image: string
  }
  const additionalData = useCookie('additional_data')
  const favouritesData = ref(additionalData.value?.favs || [])
  const favouritesCodes = computed(() =>
    favouritesData.value?.map((item) => item?.code),
  )
  function getFavourites() {
    const data = useCookie('additional_data')
    favouritesData.value = data.value?.favs
      ? JSON.parse(JSON.stringify(data.value?.favs))
      : []
  }
  const saveFavouritesData = (data: ISaveData) => {
    getFavourites()
    const ind = favouritesData.value?.findIndex((el) => el?.code == data.code)
    if (ind > -1) {
      favouritesData.value.splice(ind, 1)
    } else {
      favouritesData.value.push(data)
    }
    additionalData.value = JSON.stringify({
      history: additionalData.value?.history,
      favs: favouritesData.value,
    })
  }
  return {
    favouritesData,
    getFavourites,
    saveFavouritesData,
    favouritesCodes,
  }
})
