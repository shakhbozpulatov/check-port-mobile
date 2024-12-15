<template>
  <MbscPopup
    :is-open="show"
    theme-variant="light"
    display="bottom"
    theme="material"
    css-class="no-padding"
    full-screen
    class="py-6"
    @close="emits('on-close')"
  >
    <div class="flex h-full w-full">
      <swiper
        ref="swiperElement"
        :modules="modules"
        :navigation="{ nextEl: '.next-hal', prevEl: '.prev-hal' }"
        :effect="'cube'"
        :initial-slide="index"
        :autoplay="{
          delay: autoplayDelay,
          waitForTransition: true,
          stopOnLastSlide: true,
        }"
        class="min-h-max"
        @slide-change="onSlideChange"
        @init="onSlideChange"
        @autoplay-time-left="updateProgressBar"
      >
        <template v-for="(story, storyIndex) in stories" :key="storyIndex">
          <swiper-slide
            v-if="story.img"
            :data-story-id="story.id"
            class="!max-w-[500px] !w-full relative px-2 bg-[#C3C3C3]"
          >
            <div
              class="flex justify-between items-center absolute z-10 top-[40px] w-full p-4"
            >
              <div class="flex w-full flex-col items-start justify-start gap-2">
                <div class="bg-greyscale-400 w-full h-1.5 relative rounded-lg">
                  <div
                    class="bg-white w-full h-1.5 absolute rounded-lg transition-linear"
                    :style="`width: ${progressWidth}%`"
                  ></div>
                </div>
              </div>
              <UButton
                size="sm"
                color="white"
                class="rounded-[10px]"
                variant="ghost"
                @click="emits('on-close')"
              >
                <i class="fa-solid fa-xmark text-2xl text-white"></i>
              </UButton>
            </div>
            <div
              class="w-full relative h-full flex items-center justify-center"
            >
              <img
                :src="story.img"
                class="w-full object-cover my-auto"
                alt="story"
              />
              <NuxtLinkLocale
                v-if="story?.url"
                class="absolute bottom-[40px] m-auto bg-[#0073ff] w-[300px] h-[48px] rounded-2xl shadow !text-white flex items-center justify-center"
                :to="story?.url"
                >{{ $t('250') }}</NuxtLinkLocale
              >
            </div>
          </swiper-slide>
          <swiper-slide
            v-if="story.video"
            :data-story-id="story.id"
            class="!max-w-[500px] !w-full relative bg-[#C3C3C3]"
          >
            <div
              class="flex justify-between items-center absolute z-10 top-[40px] w-full p-4"
            >
              <div class="flex w-full flex-col items-start justify-start gap-2">
                <div class="bg-greyscale-400 w-full h-1.5 relative rounded-lg">
                  <div
                    class="bg-white w-full h-1.5 absolute rounded-lg transition-linear"
                    :style="`width: ${progressWidth}%`"
                  ></div>
                </div>
              </div>
              <UButton
                size="sm"
                color="white"
                class="rounded-[10px]"
                variant="ghost"
                @click="emits('on-close')"
              >
                <i class="fa-solid fa-xmark text-2xl text-white"></i>
              </UButton>
            </div>
            <div
              class="w-full relative h-full flex items-center justify-center"
            >
              <video
                ref="video"
                class="w-[320px] h-auto"
                :poster="story.anons"
                :data-src="story.video"
                autoplay
                muted
                playsinline
              ></video>
              <NuxtLinkLocale
                v-if="story?.url"
                class="absolute bottom-[40px] m-auto bg-[#0073ff] w-[300px] h-[48px] rounded-2xl shadow !text-white flex items-center justify-center"
                :to="story?.url"
                >{{ $t('250') }}</NuxtLinkLocale
              >
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
  </MbscPopup>
</template>
<script setup lang="ts">
import 'swiper/css'

import { MbscPopup } from '@mobiscroll/datepicker-vue'
import { Swiper, SwiperSlide } from 'swiper/vue'

const modules = [SwiperPagination, SwiperAutoplay]

interface Props {
  show: boolean
  index: number
}
const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'on-close'): void
}>()
const store = useMainStore()

const stories = computed(() => store.stories)
const swiperElement = ref(null)
const autoplayDelay = ref(5000) // Total delay time in milliseconds
const autoplayTimeLeft = ref(autoplayDelay.value) // Initialize time left with delay value
const progressWidth = ref(0) // Progress width for the progress bar

const updateProgressBar = (swiper, timeLeft) => {
  autoplayTimeLeft.value = timeLeft
  progressWidth.value = Math.ceil(
    ((autoplayDelay.value - autoplayTimeLeft.value) / autoplayDelay.value) *
      100,
  )
  if (timeLeft <= 0 && swiper?.isEnd) {
    emits('on-close')
  }
}
const onInitSwiper = (swiper) => {
  const currentSlide = swiper.slides[swiper.activeIndex]
  const storyId = currentSlide.getAttribute('data-story-id')
  if (storyId) {
    if (!store.watchedStories.includes(storyId))
      store.watchedStories.push(storyId)

    reorderStories()
  }
  const videoElement = currentSlide.querySelector('video')
  const allVideos = document.querySelectorAll('video')
  // Pause all other videos if any are playing
  if (!videoElement) {
    allVideos.forEach((video) => {
      video.pause()
    })
  }
}
function onSlideChange(swiper) {
  // Get the current slide
  autoplayDelay.value = 5000
  progressWidth.value = 0
  const currentSlide = swiper.slides[swiper.activeIndex]
  const storyId = currentSlide.getAttribute('data-story-id')
  // Check if it contains a video
  const videoElement = currentSlide.querySelector('video')
  const allVideos = document.querySelectorAll('video')
  // Pause all other videos if any are playing
  allVideos.forEach((video) => {
    if (video !== videoElement) video.pause()
  })

  if (videoElement) {
    swiper.autoplay.stop()
    videoElement.setAttribute('src', videoElement.dataset.src)
    // Play the video and adjust the progress bar
    videoElement.addEventListener(
      'loadedmetadata',
      () => {
        autoplayDelay.value = videoElement.duration * 1000

        // Play the video and update the progress bar
        videoElement.play()
        videoElement.currentTime = 0
        videoElement.muted = false
      },
      { once: true },
    )
    if (videoElement.readyState >= 1) {
      videoElement.play()
      autoplayDelay.value = videoElement.duration * 1000
      videoElement.currentTime = 0
      videoElement.muted = false
    }
  } else {
    swiper.autoplay.start()
    videoElement?.stop()
    autoplayDelay.value = 5000
  }
  if (storyId) {
    if (!store.watchedStories.includes(storyId))
      store.watchedStories.push(storyId)

    reorderStories()
  }
}
function reorderStories() {
  store.stories = [
    ...store.stories.filter(
      (story) => !store.watchedStories.includes(story.id),
    ), // Unwatched stories
    ...store.stories.filter((story) => store.watchedStories.includes(story.id)), // Watched stories
  ]
}
watch(
  () => props.show,
  () => {
    autoplayDelay.value = 5000
    const allVideos = document.querySelectorAll('video')
    allVideos.forEach((video) => {
      video.pause()
    })
  },
)
</script>
<style>
.no-padding .mbsc-popup-padding {
  padding: 0 !important;
}
.transition-linear {
  transition: width 0.1s linear;
}
</style>
