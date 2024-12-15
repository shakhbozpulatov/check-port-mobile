import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  if (process.client) {
    const layoutStore = useLayoutStore()

    // Функция для обработки фокуса
    const focusHandler = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        layoutStore.closeFooter = true
      }
    }

    // Функция для обработки блюра
    const blurHandler = (event: Event) => {
      const target = event.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        layoutStore.closeFooter = false
      }
    }

    // Добавляем глобальные слушатели для событий focus и blur
    document.addEventListener('focus', focusHandler, true)
    document.addEventListener('blur', blurHandler, true)

    // Очищаем слушатели при демонтировании
    window.addEventListener('beforeunload', () => {
      document.removeEventListener('focus', focusHandler, true)
      document.removeEventListener('blur', blurHandler, true)
    })
  }
})
