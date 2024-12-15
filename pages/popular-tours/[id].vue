<template>
  <div>
    <UIHeader> {{ tourData[0]?.name }} </UIHeader>
    <NuxtImg
      placeholder="/images/default.webp"
      :src="tourData[0]?.img"
      :alt="tourData[0]?.img"
      class="object-cover w-full mb-3 !h-[400px] aspect-video rounded"
    />
    <div class="container mt-4">
      <div class="bg-white shadow p-3 rounded mb-4">
        <div class="flex items-center justify-between gap-3 mb-3">
          <img
            :src="tourData[0]?.icon"
            :alt="tourData[0]?.icon"
            class="w-[50px]"
          />
          <p class="text-[14px] text-[#AAAAAA]">
            {{ tourData[0]?.date_create }}
            <!--        {{ dayjs(tourData[0]?.date_create).format('DD/MM/YYYY') }}-->
          </p>
        </div>
        <h3 class="h3 mb-3">
          {{ tourData[0]?.name }}
        </h3>
        <div class="mb-3" v-html="tourData[0]?.detail"></div>
        <div v-html="tourData[0]?.anons"></div>
        <a
          target="_blank"
          class="!text-[#0073FF]"
          :href="tourData[0]?.ex_url"
          >{{ tourData[0]?.ex_url }}</a
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
const tourData = ref({})
const route = useRoute()

const { data } = await useAsyncData('pop-tours', () =>
  $fetch(
    'https://b2c.asialuxe.app/api/banner/content/?type=tours&id=' +
      route.params.id,
  ),
)
tourData.value = data.value

useSeoMeta({
  title: t('777', {
    country: data.value[0]?.name,
    year: new Date().getFullYear(),
  }),
  ogTitle: t('777', {
    country: data.value[0]?.name,
    year: new Date().getFullYear(),
  }),
  description: t('778', {
    country: data.value[0]?.name,
  }),
  ogDescription: t('778', {
    country: data.value[0]?.name,
  }),
  ogImage: data.value[0]?.img,
})
</script>
<style scoped lang="scss"></style>
