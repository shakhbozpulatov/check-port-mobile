<template>
  <div v-if="newsData?.some((el) => el?.smi)" class="mb-3">
    <div class="flex gap-3 justify-between">
      <h1 class="content-title my-3 h5 transition-200">
        {{ $t('679') }}
      </h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
      <template v-for="(news, index) in newsData">
        <div v-if="news?.smi" :key="index">
          <a target="_blank" :href="`/${locale}/news/${news?.id}`">
            <div class="relative pt-3">
              <div
                class="absolute top-0 left-0 bg-white z-10 flex gap-1 items-center rounded p-1"
              >
                <img
                  :src="news?.icon"
                  :alt="news?.icon"
                  class="w-[40px] rounded-full"
                />
                <!--                <span class="text-[12px]">{{ news?.ex_name }}</span>-->
              </div>
              <NuxtImg
                placeholder="/images/default.webp"
                :src="
                  news?.anons_img_mob ? news?.anons_img_mob : news?.anons_img
                "
                :alt="news?.anons_img"
                class="rounded-t-2xl aspect-square object-cover w-full md:max-w-[288px] h-[162px]"
              />
            </div>
            <div
              class="rounded-b-2xl border bg-white transition-200 max-h-[113px] overflow-hidden border-t-0 p-3 pt-2"
            >
              <p class="text-[12px] text-[#AAAAAA]">
                {{ news?.date_create }}
                <!--                {{ dayjs(news.date_create).format('DD/MM/YYYY') }}-->
              </p>
              <p class="line-clamp-2 h-[48px] overflow-hidden transition-200">
                {{ news?.name }}
              </p>
              <p
                class="text-[12px] slider-news-descr line-clamp-3 h-[50px] overflow-hidden transition-200 news_description"
                v-html="news?.description"
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
    .$get(`https://b2c.asialuxe.app/api/banner/news/?limit=${props.count}`)
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
