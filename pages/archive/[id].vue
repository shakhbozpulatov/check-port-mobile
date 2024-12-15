<template>
  <div>
    <UIHeader without-image> {{ $t('871') }} </UIHeader>
    <div class="container mt-32">
      <article
        id="article"
        class="bg-white shadow p-3 rounded page-p md:mx-[200px] transition-200 dark:bg-dark-700"
      >
        <figure>
          <img
            :src="single?.detail_img"
            :srcset="`
          ${single?.detail_img_mob} 769px,
          ${single?.detail_img}
        `"
            sizes="(max-width: 769px) 769px,
         800px"
            :alt="single?.detail_img"
            class="w-full mb-3 !h-[auto] rounded"
          />
        </figure>
        <h1
          id="title"
          class="md:text-[28px] text-lg font-semibold mb-3 transition-200 dark:text-white-100"
        >
          {{ single?.name }}
        </h1>
        <div
          id="main-body"
          class="post-content transition-200 dark:text-white-100"
          v-html="single?.detail_text"
        ></div>
      </article>
    </div>
  </div>
  <!--  </ClientOnly>-->
</template>
<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
interface INews {
  id: string
  name: string
  detail_text: string
  detail_img: string
  detail_img_mob: string
}
const single = ref(null)
const width = ref(0)
const { data } = await useAsyncData<INews[]>('archive_single', () =>
  useApi().$get(
    `https://b2c.asialuxe.app/api/banner/top/?id=${route.params.id}`,
  ),
)
single.value = data.value[0]

if (process.client) {
  width.value = window.innerWidth
}

useSeoMeta({
  title: data.value[0]?.name,
  ogTitle: data.value[0]?.name,
  image: data.value[0].detail_img,
  ogImage: data.value[0].detail_img,
  description: data.value[0]?.detail_text || 'Asialuxe Travel',
  ogDescription: data.value[0]?.detail_text || 'Asialuxe Travel',
})
</script>
