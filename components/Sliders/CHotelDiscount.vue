<template>
  <div class="flex flex-col items-end">
    <div
      class="grid grid-cols-2 gap-3 w-full"
      :class="!showMore ? 'h-[200px] overflow-hidden' : ''"
    >
      <template v-for="(item, index) in countriesDiscount">
        <NuxtLinkLocale
          v-if="item?.name"
          :key="index"
          :to="{
            path: '/hotels',
            query: {
              location_id: item?.code,
              begin_date: dayjs(currentDate).format('YYYY-MM-DD'),
              end_date: dayjs(futureDate).format('YYYY-MM-DD'),
              loc_type: 'MULTIREGION',
              search: item?.name,
              adult: 2,
              child_age: '',
              searched: true,
              discount: 0,
              friday: 1,
            },
          }"
          class="text-[#0073ff] text-[14px]"
        >
          {{ item?.name }} ({{ item?.count }})
        </NuxtLinkLocale>
      </template>
    </div>
    <p
      class="text-[14px] text-[#0073ff]"
      :class="showMore ? 'mt-4' : ''"
      @click="showMoreBtn"
    >
      {{ showMore ? $t('456') : $t('256') }}
      <i
        class="fa-regular fa-angle-down ml-2"
        :class="showMore ? 'rotate-180' : ''"
      ></i>
    </p>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

const countriesDiscount = ref(null)
const showMore = ref(false)
const currentDate = new Date()
const futureDate = new Date(currentDate)
futureDate.setDate(currentDate.getDate() + 7)

const showMoreBtn = () => {
  showMore.value = !showMore.value
}
onMounted(async () => {
  try {
    countriesDiscount.value = await useApi().$get(
      'https://b2c.asialuxe.app/api/banner/discount/friday/?countries=1',
    )
  } catch (err) {
    console.log(err)
  }
})
</script>

<style lang="scss">
.tour-tabs button:last-child {
  background: #0073ff20 !important;
  border-radius: 1rem;
}
.tour-tabs {
  gap: 10px;
  box-shadow: none !important;
  background-color: inherit !important;
}
</style>
