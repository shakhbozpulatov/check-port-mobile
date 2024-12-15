<template>
  <div class="container mt-4">
    <UBreadcrumb :links="links" class="mb-4" />
    <article
      id="article"
      class="bg-white shadow p-3 rounded page-p md:mx-[200px] transition-200"
    >
      <figure>
        <img
          :src="single?.anons_img"
          :srcset="`
          ${single?.anons_img_mob} 769px,
          ${single?.anons_img}
        `"
          sizes="(max-width: 769px) 769px,
         800px"
          :alt="single?.anons_img"
          class="w-full mb-3 !h-[auto] rounded"
        />
      </figure>
      <div class="flex items-center justify-between gap-3 mb-3">
        <img
          id="caption"
          class="md:block hidden"
          :src="single?.icon"
          :alt="single?.icon"
          width="50"
          style="width: 50px"
        />
        <p class="text-[14px] text-gray-400">
          {{ single?.date_create }}
          <!--        {{ dayjs(single?.date_create).format('DD/MM/YYYY') }}-->
        </p>
      </div>
      <!--    <div-->
      <!--      v-if="single?.anons_img_mob_uz || single?.anons_img_mob_ru"-->
      <!--      class="md:hidden block"-->
      <!--    >-->
      <!--      <img-->
      <!--        :src="-->
      <!--          locale === 'uz' && single?.anons_img_mob_uz-->
      <!--            ? single?.anons_img_mob_uz-->
      <!--            : single?.anons_img_mob_ru || single?.anons_img-->
      <!--        "-->
      <!--        :alt="-->
      <!--          locale === 'uz' && single?.anons_img_mob_uz-->
      <!--            ? single?.anons_img_mob_uz-->
      <!--            : single?.anons_img_mob_ru-->
      <!--        "-->
      <!--        class="object-cover w-full mb-3 !h-[400px] aspect-video rounded"-->
      <!--      />-->
      <!--    </div>-->
      <!--    <pre> {{ single }} </pre>-->
      <h1
        id="title"
        class="md:text-[28px] text-lg font-semibold mb-3 transition-200"
      >
        {{ single?.name }}
      </h1>
      <main
        id="main-body"
        class="post-content transition-200"
        v-html="single?.description"
      ></main>
      <a target="_blank" class="!text-[#409EFF]" :href="single?.ex_url">{{
        single?.ex_url
      }}</a>
    </article>
    <div
      v-if="width < 760"
      class="bg-white shadow p-3 rounded flex justify-between items-center page-p md:mx-[200px] transition-200 mt-5"
    >
      <p class="text-base font-semibold">{{ $t('747') }}:</p>
      <UButton
        type="success"
        class="rounded-[1rem] !bg-[#0073FF]"
        @click="shareBtn"
        ><i class="fa fa-light fa-arrow-up-from-bracket me-2"></i>
        {{ $t('683') }}
      </UButton>
    </div>
  </div>
  <!--  </ClientOnly>-->
</template>
<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
interface INews {
  id: string
  date_create: string
  smi: boolean
  name: string
  ex_url: string
  icon: string
  description: string
  description_uz: string
  anons_img: string
}
const single = ref(null)
const width = ref(0)
const { data } = await useAsyncData<INews[]>('news_single', () =>
  $fetch(`https://b2c.asialuxe.app/api/banner/news/?id=${route.params.id}`),
)
single.value = data.value[0]

if (process.client) {
  width.value = window.innerWidth
}

useSeoMeta({
  title: data.value[0]?.name,
  ogTitle: data.value[0]?.name,
  image: data.value[0].anons_img,
  ogImage: data.value[0].anons_img,
  description: data.value[0]?.tg_anons || 'Asialuxe Travel',
  ogDescription: data.value[0]?.tg_anons || 'Asialuxe Travel',
  url: 'https://asialuxe.uz' + route.fullPath,
  created_at: data.value[0].date_create.split('.').join('-'),
})
const shareBtn = () => {
  if (navigator.share) {
    navigator.share({
      title: data.value[0]?.name,
      text: '',
      url: window.location.href,
    })
  }
}
const singleId = data.value[0]?.id // Replace this with the actual ID
const rhash = 'b4ba378b7c7b47'
const newsURL = `https://news.asialuxe.uz/news/${singleId}`
const ivURL = `https://t.me/iv?url=${encodeURIComponent(newsURL)}&rhash=${rhash}`
const finalURL = `https://t.me/share/url?url=${encodeURIComponent(ivURL)}`
const links = computed(() => {
  return [
    {
      label: t('79'),
      icon: 'i-heroicons-home',
      to: `/${locale.value}`,
    },
    {
      label: t('192'),
      to: `/${locale.value}/media`,
      icon: '',
    },
    {
      label:
        locale.value === 'ru'
          ? data.value[0]?.name
          : data.value[0]?.[`name_${locale.value}`]
            ? data.value[0]?.[`name_${locale.value}`]
            : data.value[0]?.name,
      to: `/${locale.value}/news`,
      icon: '',
    },
  ]
})
</script>
<style>
#caption {
  width: 50px;
}
</style>
