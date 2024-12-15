import { nextTick, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

export const useSwipeNavigate = () => {
  const router = useRouter()
  const touch = reactive({
    startX: 0,
    endX: 0,
    startY: 0,
    endY: 0,
  })
  const isRefreshing = ref(false) // State for tracking refresh status
  const refreshThreshold = 100 // Distance threshold for pull-to-refresh

  const onTouchStart = (event: TouchEvent) => {
    touch.startX = event.touches[0].clientX
    touch.startY = event.touches[0].clientY
    touch.endX = 0
    touch.endY = 0
  }

  const onTouchMove = (event: TouchEvent) => {
    touch.endX = event.touches[0].clientX
    touch.endY = event.touches[0].clientY
  }

  const onTouchEnd = () => {
    const deltaX = touch.endX - touch.startX
    const deltaY = touch.endY - touch.startY

    // Check if swipe is horizontal (left or right)
    if (Math.abs(deltaX) > 100 && Math.abs(deltaY) < 100 && touch.endX !== 0) {
      if (deltaX < 0) {
        switchToNextTab()
      } else {
        switchToPreviousTab()
      }
    }

    // Check if swipe is vertical (top to bottom)
    if (deltaY > refreshThreshold && Math.abs(deltaX) < 100) {
      triggerRefresh()
    }
  }

  const switchToNextTab = () => {
    router.forward()
  }

  const switchToPreviousTab = () => {
    router.back()
  }

  const triggerRefresh = () => {
    if (!isRefreshing.value) {
      isRefreshing.value = true // Start refresh
      // Simulate a refresh action (like fetching new data)
      setTimeout(async () => {
        reloadNuxtApp() // Replace this with actual data fetching logic
        console.log('refreshed')
        isRefreshing.value = false // End refresh after data is fetched
      }, 2000) // Simulating a 2-second refresh time
    }
  }

  onMounted(async () => {
    await nextTick(() => {
      window.addEventListener('touchstart', onTouchStart)
      window.addEventListener('touchmove', onTouchMove)
      window.addEventListener('touchend', onTouchEnd)
    })
  })
  return {
    isRefreshing,
  }
}
