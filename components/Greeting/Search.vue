<template>
  <div class="grid md:grid-cols-5 md:gap-0 gap-3 w-full">
    <USelectMenu
      v-model="searchData.airport"
      :options="places"
      :ui="{
        base: '!h-[47px]',
      }"
      value-attribute="value"
      option-attribute="label"
      class="!w-full alt_select"
    />
    <USelectMenu
      v-model="searchData.type"
      :options="directions"
      value-attribute="value"
      option-attribute="label"
      :ui="{
        base: '!h-[47px]',
      }"
      class="!w-full alt_select"
    />
    <MbscDatepicker
      v-model="searchData.date"
      :input-props="{
        class: 'w-full h-[47px] border rounded-md px-2',
        placeholder: $t('90'),
        readOnly: true,
      }"
      input-component="input"
      select="date"
      :min="new Date()"
      date-format="DD.MM.YYYY"
      :show-outer-days="false"
      :theme-variant="useColorMode().value"
      :first-day="1"
      :locale="calendarLocales[locale]"
      end-icon="x"
      theme="ios"
    >
    </MbscDatepicker>
    <LazyUIPassengerCount class="w-full" :form="form" :min-count="1" />
    <UButton
      class="w-full !h-[50px] justify-center"
      type="primary"
      :loading="dashboardStore.loading"
      @click="searchBtn"
      >{{ $t('253') }}</UButton
    >
  </div>
</template>
<script setup lang="ts">
import { MbscDatepicker } from '@mobiscroll/datepicker-vue'
import { calendarLocales } from 'assets/data'
import dayjs from 'dayjs'

import { useGreetingStore } from '~/stores/greeting'

const { t, locale } = useI18n()
const dashboardStore = useDashboardStore()
const store = useGreetingStore()
const router = useRouter()
const searchData = reactive({
  adt_qnt: 1,
  chi_qnt: 0,
  inf_qnt: 0,
  airport: 'TAS',
  type: 'departure',
  date: '',
  currency: useCookie('currency').value || 'USD',
})
const form = reactive({
  adult: 1,
  child_age: [],
})
const places = [
  {
    value: 'TAS',
    label: t('328'),
  },
]
const directions = ref([
  {
    value: 'departure',
    label: t('804'),
  },
  // {
  //   value: 'arrival',
  //   label: t('805'),
  // },
])

const searchBtn = async () => {
  const inf = form.child_age.filter((item) => Number(item) < 2)
  searchData.adt_qnt = form.adult
  searchData.inf_qnt = inf.length
  searchData.chi_qnt = form.child_age.length - inf.length
  searchData.date = dayjs(searchData.date).format('YYYY-MM-DD')
  if (searchData.type && searchData.date) {
    dashboardStore.loading = true
    useApi()
      .$post('/v1/service/offers-meet', {
        body: searchData,
        params: {
          platform: 'app',
        },
      })
      .then((res) => {
        console.log(res)
        store.offers = res
        router.push({
          query: {
            type: searchData.type,
          },
        })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dashboardStore.loading = false
      })
  } else {
    // toast.warning(t('128'))
  }
}
const disableDate = function (date) {
  return date < new Date(Date.now() - 86400000)
}
</script>
<style scoped lang="scss"></style>
