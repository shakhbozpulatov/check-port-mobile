<template>
  <div
    class="px-2 pb-2.5 pt-16 flex items-center justify-between fixed z-[101] transition-200 w-full top-0"
    :class="[
      y > 180 || withoutImage
        ? 'bg-white shadow-b rounded-b-2xl'
        : 'bg-transparent ',
      height ? height : 'h-[100px]',
    ]"
  >
    <div
      class="flex items-center"
      :class="{ 'justify-center w-full': noBack }"
      @click="$router.go(-1)"
    >
      <div
        v-if="!noBack"
        class="flex justify-center items-center w-10 h-10 rounded-full bg-white"
      >
        <i class="fa-light fa-chevron-left text-primary text-base"></i>
      </div>
      <div
        class="text-dark text-sm ml-2 font-semibold"
        :class="y > 180 || withoutImage ? 'opacity-100' : 'opacity-0'"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { y } = useWindowScroll()
interface Props {
  withoutImage?: boolean
  noBack?: boolean
  height?: string
}
defineProps<Props>()
</script>
