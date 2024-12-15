import 'vue-toastification/dist/index.css'

import Toast from 'vue-toastification'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    showCloseButtonOnHover: true,
    timeout: 3000,
    rtl: false,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    maxToasts: 3,
    toastClassName: 'my-toast',
  })
})
