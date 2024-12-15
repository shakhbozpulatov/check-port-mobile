<template>
  <div class="mb-3 vd-block">
    <h1 class="content-title my-3 h5 transition-200">
      {{ $t('682') }}
    </h1>
    <UModal
      v-for="(video, index) in videoData"
      :key="'dialog-' + index"
      v-model="video.show_dialog"
      width="400"
      :ui="{ width: 'sm:max-w-full md:!w-[400px]' }"
      align-center
      :show-close="false"
      destroy-on-close
      :fullscreen="width < 768"
      class="!p-0"
      :class="width < 768 ? '!rounded-2xl' : ''"
    >
      <div
        class="absolute top-[10px] right-[10px] md:right-[20px] md:top-[20px] z-[10]"
      >
        <div
          class="bg-white rounded-full flex items-center justify-center cursor-pointer w-[30px] h-[30px]"
          @click="closeDialog(index)"
        >
          <i class="fa-light fa-xmark text-[20px] text-black"></i>
        </div>
      </div>
      <iframe
        width="100%"
        :height="width > 576 ? '600px' : ''"
        :class="width > 576 ? 'rounded-2xl' : ''"
        :style="width < 576 ? 'height: 100vh' : ''"
        class="z-[1]"
        :src="video.link"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </UModal>
    <Swiper
      v-if="videoData?.length"
      :modules="modules"
      :init="false"
      :slides-per-view="6"
      :space-between="12"
      class="pagination-slider"
      :pagination="{ clickable: true }"
      :breakpoints="{
        1280: {
          slidesPerView: 6,
          spaceBetween: 15,
        },
        980: {
          slidesPerView: 5,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        430: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        0: {
          slidesPerView: 1.5,
          spaceBetween: 15,
        },
      }"
    >
      <template v-for="(video, index) in videoData" :key="index">
        <SwiperSlide>
          <div
            class="relative pt-3 rounded-2xl cursor-pointer hover:shadow-lg transition-all hover:transition-all"
            @click="openDialog(index)"
          >
            <div
              class="absolute top-[40%] left-[40%] z-[10] border w-[50px] h-[50px] flex items-center justify-center text-white rounded-full"
            >
              <i class="fa-duotone fa-play"></i>
            </div>
            <NuxtImg
              v-lazy-load
              placeholder="/images/default.webp"
              fit="cover"
              placeholder-class="aspect-square object-cover"
              loading="lazy"
              :data-url="video?.prev_img"
              :alt="video?.prev_img"
              class="video-bg before:hover:transition-all before:transition-all before:hover:opacity-10 rounded-2xl !h-[300px] before:absolute before:w-full before:opacity-10 before:box-content before:h-full before:z-40 before:rounded-2xl aspect-video object-cover"
            />
            <p class="absolute bottom-[10px] z-20 left-[10px] text-white">
              {{ video?.title }}
            </p>
          </div>
        </SwiperSlide>
      </template>
    </Swiper>
    <!--    <div class="flex items-center gap-6">-->
    <!--      <NuxtImg-->
    <!--        v-for="(video, index) in videoData"-->
    <!--        :key="index"-->
    <!--        placeholder="/images/tours/tour_default2.webp"-->
    <!--        fit="cover"-->
    <!--        placeholder-class="aspect-square object-cover"-->
    <!--        loading="lazy"-->
    <!--        :src="video?.prev_img"-->
    <!--        :alt="video?.prev_img"-->
    <!--        class="video-bg before:hover:transition-all before:transition-all before:hover:opacity-10 rounded-2xl !h-[300px] before:absolute before:w-full before:opacity-10 before:box-content before:h-full before:z-40 before:rounded-2xl aspect-video object-cover md:w-[196px]"-->
    <!--      />-->
    <!--    </div>-->
  </div>
</template>
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Autoplay, Pagination } from 'swiper/modules'

const modules = [Pagination, Autoplay]
const { width } = useWindowSize()
const videoData = ref([
  {
    link: 'https://www.youtube.com/embed/6KqDrTQ3Whg?si=4j_UZkpiCrxnjTnN',
    title: 'Welcome to Uzbekistan',
    prev_img:
      'https://uzbekistan.travel/storage/app/media/nargiza/cropped-images/history2-0-0-0-0-1590044486.jpg',
    show_dialog: false,
  },
  {
    link: 'https://www.youtube.com/embed/ZomZXjTO5k0?si=O0NNwWEWmg1lGDMD',
    title: 'Dalaman,Marmaris FamilyTravel Uz Fortezza Beach Hotel',
    prev_img:
      'https://static.standard.co.uk/2022/02/08/15/FETHIYE_shutterstock_414393616_copy.jpg?quality=75&auto=webp&width=960',
    show_dialog: false,
  },
  {
    link: 'https://www.youtube.com/embed/HhdVt86rfSM?si=HLgmdrTrYTM8gyod',
    title: 'Авиабилеты и туры online',
    prev_img: 'https://podrobno.uz/upload/iblock/4b9/samolet_1233457.jpg',
    show_dialog: false,
  },
  {
    link: 'https://www.youtube.com/embed/nCSpzkobzTM?si=myJoRZ9MB1yJOlbA',
    title: 'Горящие туры в Анталию',
    prev_img:
      'https://api.uznews.uz/storage/uploads/posts/images/3262/inner/mGToxirYEe.jpg',
    show_dialog: false,
  },
  {
    link: 'https://www.youtube.com/embed/DPRoAOX8RII?si=AG4Vn5GQytlbPm1O',
    title: 'Весь март! Мальдивы! Прямой рейс из Ташкента',
    prev_img: 'https://zira.uz/wp-content/uploads/2021/11/5.jpg',
    show_dialog: false,
  },
  {
    link: 'https://www.youtube.com/embed/SJAfILG74KE?si=ZkcCqbBb_XH6nKZM',
    title: 'Новый год на Мальдивах',
    prev_img:
      'https://www.gazeta.uz/media/img/2023/12/cyNZU017019517468806_l.jpg',
    show_dialog: false,
  },
  {
    link: 'https://www.youtube.com/embed/XQlnXpYI7RA?si=38svHou6tOPUfUWC',
    title: 'Оздоровительные туры в Турцию, Афьонкарахисар',
    prev_img:
      'https://api.uznews.uz/storage/uploads/posts/temporary/xBz0jRmqCNp5iL8f6xSa.jpg',
    show_dialog: false,
  },
])
const openDialog = (index) => {
  videoData.value.forEach((short, i) => {
    if (i !== index) {
      short.show_dialog = false
    }
  })
  videoData.value[index].show_dialog = true
}
const closeDialog = (index) => {
  videoData.value[index].show_dialog = false
}
</script>

<style lang="scss">
.pagination-slider {
  padding-bottom: 50px;
}

.news_description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.video-bg:before {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(0, 0, 0, 0.42) 50%,
    #000000 100%
  );
}
</style>
