<template>
  <div
    class="story_card rounded-full p-1 w-[80px] h-[80px] border-[2px]"
    :class="watched ? 'border-b-gray-300' : 'border-[#C0F202]'"
  >
    <img
      :src="item.anons"
      class="w-full h-full rounded-full object-cover"
      alt="story"
    />
  </div>
</template>
<script setup lang="ts">
import type { IStory } from '~/types'

interface Props {
  item: IStory
  watched: boolean
}
defineProps<Props>()
</script>

<style>
.story_card {
  border-image-slice: 1;
}
</style>
