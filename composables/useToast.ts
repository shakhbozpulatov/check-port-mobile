// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

import { useToast } from 'vue-toastification'

import Toast from '~/components/UI/Toast.vue'

export const useCustomToast = () => {
  const toast = useToast()

  function myToast(type: 'success' | 'error' | 'warning', text: string) {
    toast[type]({
      component: Toast,
      props: {
        type,
        text,
      },
      listeners: {
        close: () => toast.clear(), // Optional
      },
    })
  }
  return { myToast }
}
