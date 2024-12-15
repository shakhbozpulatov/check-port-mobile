<template>
  <div
    v-if="newsData?.some((el) => el?.type == 2 || el?.archive == 1)"
    class="mb-3"
  >
    <div class="flex gap-3 justify-between">
      <h1 class="content-title my-3 h5 transition-200 dark:text-white-100">
        {{ $t('864') }}
      </h1>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <template v-for="(news, index) in newsData">
        <div v-if="news?.type == 2 || news?.archive == 1" :key="index">
          <a target="_blank" :href="`/${locale}/archive/${news?.id}`">
            <div class="relative pt-3">
              <NuxtImg
                placeholder="/images/default.webp"
                :src="news?.banner_mob"
                :alt="news?.banner_mob"
                class="rounded-t-2xl aspect-square object-cover w-full md:max-w-[288px] h-[162px]"
              />
            </div>
            <div
              class="rounded-b-2xl border bg-white transition-200 max-h-[113px] overflow-hidden dark:bg-dark-700 dark:border-gray-700 border-t-0 p-3 pt-2"
            >
              <p
                class="line-clamp-2 h-[48px] overflow-hidden dark:text-white-100 transition-200"
              >
                {{ news?.name }}
              </p>
              <p
                class="text-[12px] slider-news-descr line-clamp-3 h-[50px] overflow-hidden dark:text-white-100 transition-200 news_description"
                v-html="news?.detail_text"
              ></p>
            </div>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  count: string
}
const props = defineProps<Props>()

const newsData = ref([])
const { locale } = useI18n()
const getTourList = function () {
  useApi()
    .$get('https://b2c.asialuxe.app/api/banner/top/')
    .then((res) => {
      newsData.value = res
    })
}
getTourList()
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

.slider-news-descr img.w-50,
.slider-news-descr img,
.slider-news-descr img.m-auto {
  display: none !important;
}
</style>
