<template>
  <div class="py-6">
    <div>
      <swiper
        :modules="modules"
        :init="false"
        :slides-per-view="4"
        :navigation="{ nextEl: '.next-hal', prevEl: '.prev-hal' }"
        :space-between="30"
        :loop="false"
        class="min-h-max xl:max-h-[520px] 2xl:min-h-[550px] !pr-6"
      >
        <swiper-slide v-for="(item, index) in stories" :key="index">
          <UIStoryCard
            :item="item"
            :watched="watchedStories.includes(item.id)"
            @click="openStory(index)"
          />
        </swiper-slide>
      </swiper>
    </div>
    <UIStoryDialog
      :show="isOpen"
      :index="selectedStory"
      @on-close="isOpen = false"
    />
  </div>
</template>
<script setup lang="ts">
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [Autoplay, Navigation]
const store = useMainStore()

const stories = computed(() => store.stories)
const watchedStories = computed(() => store.watchedStories)
const isOpen = ref(false)
const selectedStory = ref(0)

const openStory = (index: number) => {
  isOpen.value = true
  selectedStory.value = index
}

await useAsyncData('stories', () => store.getStories())
</script>
