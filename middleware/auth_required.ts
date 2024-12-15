export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const layoutStore = useLayoutStore()
  const localePath = useLocalePath()
  const loggedIn = computed(() => authStore.loggedIn)
  if (loggedIn.value) {
    return true
  } else {
    return navigateTo(localePath('/auth/register'))
  }
})
