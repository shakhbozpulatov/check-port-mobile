<template>
  <div>
    <UIHeader without-image>
      {{ single[0]?.name }}
    </UIHeader>
    <div class="container mt-10">
      <div
        class="bg-white shadow p-3 rounded page-p md:mx-[200px] transition-200"
      >
        <div class="mb-4">
          <img
            v-if="width > 768"
            :src="single[0]?.detail_img"
            class="w-full mb-3 rounded"
            alt="img"
          />
          <img
            v-else
            :src="single[0]?.detail_img_mob"
            class="w-full mb-3 rounded"
            alt="img"
          />
        </div>
        <h1
          id="title"
          class="md:text-[28px] text-lg font-semibold mb-3 transition-200"
        >
          {{ single[0]?.name }}
        </h1>
        <div v-html="single[0]?.detail_text"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const single = ref([])
const { width } = useWindowSize()
useSeoMeta({
  title: single.value[0]?.name,
  ogTitle: single.value[0]?.name,
  ogImage: single.value[0]?.detail_img,
  description: single.value[0]?.detail_text || 'Asialuxe Travel',
  ogDescription: single.value[0]?.detail_text || 'Asialuxe Travel',
})
onMounted(async () => {
  try {
    const banners = await useApi().$get(
      `https://b2c.asialuxe.app/api/banner/top/?id=${route.params.id}`,
    )
    single.value = banners
  } catch (err) {
    console.log(err)
  }
})
</script>
<style></style>
