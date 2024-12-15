export default defineNuxtRouteMiddleware(async (to) => {
  const token = useCookie('token') // get token from cookies
  const authStore = useAuthStore()
  const loggedIn = computed(() => authStore.loggedIn)
  try {
    if (token.value && !loggedIn.value) {
      await authStore.fetchUser().catch((e) => console.log(e))
    }
  } catch (e) {
    console.log(e)
  }
})
