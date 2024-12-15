<template>
  <div>
    <div
      class="bg-primary p-4 search relative flex flex-col items-center transition-200"
    >
      <div id="main_search" class="w-full mt-3 md:mt-5 mb-3">
        <slot></slot>
      </div>
      <span v-if="store.loading" class="loader"></span>
    </div>
    <div
      class="py-2 px-3 border-[#0073FF] text-[#0073FF] bg-[#0073FF20] border w-full my-4 rounded-lg max-h-[66px] md:max-h-max shadow-md line-clamp-2 transition-200"
      :class="{ 'opacity-0 -mt-[30px]': !store.loading }"
    >
      <i class="fa-regular fa-earth-americas"></i> {{ currentWord }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'

const store = useDashboardStore()
const { t } = useI18n()

const words = [t('735') + '...', t('736') + '...']
const interval = ref(null)
const index = ref(0)
const currentWord = computed(() => words[index.value])
const startWordRotation = () => {
  interval.value = setInterval(() => {
    index.value = (index.value + 1) % words.length
  }, 30000)
}
const stopWordRotation = () => {
  if (interval.value) {
    clearInterval(interval.value)
    interval.value = null
  }
}
watch(
  () => store.loading,
  (val) => {
    if (val) startWordRotation()
    if (!val) stopWordRotation()
  },
)
</script>
<style lang="scss" scoped>
.loader {
  width: 100%;
  height: 3.8px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background: rgba(248, 248, 248, 0.938);
}
.loader::after {
  content: '';
  background: rgb(168, 197, 236);
  width: 96px;
  height: 3.8px;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  animation: hitZak 2s linear infinite alternate;
}

@keyframes hitZak {
  0% {
    left: 0;
    transform: translateX(-1%);
  }
  100% {
    left: 100%;
    transform: translateX(-99%);
  }
}
.search {
  box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.05);
}
</style>
