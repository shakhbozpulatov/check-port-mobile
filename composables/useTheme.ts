type TTheme = 'light' | 'dark'

export const useTheme = () => {
  const mainStore = useLayoutStore()
  const colorMode = useColorMode()
  const savedTheme = useCookie<TTheme>('theme')
  // const theme = computed(() => mainStore.theme)
  console.log(savedTheme.value)
  if (!savedTheme.value) {
    savedTheme.value = 'light'
  }
  mainStore.theme = savedTheme.value

  function toggleTheme() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  function init() {
    colorMode.preference = colorMode.value = savedTheme.value
  }

  return {
    toggleTheme,
    init,
  }
}
