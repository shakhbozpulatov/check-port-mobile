<template>
  <MbscPopup
    :is-open="show"
    display="bottom"
    scroll-lock
    css-class="small-popup rounded-popup"
    close-on-overlay-click
    theme-variant="light"
    theme="material"
    @close="emits('on-close')"
  >
    <div
      class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
      @click="emits('on-close')"
    ></div>
    <div>
      <component
        :is="content[layoutStore.authRequiredMain]"
        is-modal
        @on-success="emits('on-close')"
      ></component>
    </div>
  </MbscPopup>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'

import {
  LazyLayoutLogin,
  LazyLayoutRegister,
  LazyLayoutResetPassword,
} from '#components'
interface Props {
  show: boolean
}
const emits = defineEmits<{
  (e: 'on-close'): void
}>()
const props = defineProps<Props>()
const layoutStore = useLayoutStore()
const content = {
  login: LazyLayoutLogin,
  reset: LazyLayoutResetPassword,
  register: LazyLayoutRegister,
}
watch(
  () => props.show,
  () => {
    if (!props.show) {
      layoutStore.authRequiredMain = 'login'
    }
  },
)
</script>
