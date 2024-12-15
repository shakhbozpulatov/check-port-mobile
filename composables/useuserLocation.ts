// composables/useUserLocation.ts
import { ref } from 'vue'

export const useUserLocation = () => {
  const userLocation = ref<GeolocationPosition | null>(null)
  const locationError = ref<string | null>(null)
  const isLoading = ref(false)

  const getLocation = () => {
    if (!navigator.geolocation) {
      locationError.value = 'Geolocation is not supported by your browser'
      return
    }

    isLoading.value = true

    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation.value = position
        isLoading.value = false
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            locationError.value = 'User denied the request for Geolocation.'
            break
          case error.POSITION_UNAVAILABLE:
            locationError.value = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            locationError.value = 'The request to get user location timed out.'
            break
          default:
            locationError.value = 'An unknown error occurred.'
            break
        }
        isLoading.value = false
      },
    )
  }

  return {
    userLocation,
    locationError,
    isLoading,
    getLocation,
  }
}
