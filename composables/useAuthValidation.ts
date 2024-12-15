export const useAuthValidation = () => {
  const store = useAuthStore()
  const layoutStore = useLayoutStore()
  function checkRegister() {
    if (store.loggedIn) {
      return true
    } else {
      layoutStore.authRequiredMain = 'login'
      return false
    }
  }

  return { checkRegister }
}
