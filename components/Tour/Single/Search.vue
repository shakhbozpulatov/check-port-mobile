<template>
  <div class="hotel-wrap search-bar mb-3 search-inputs">
    <div class="grid grid-cols-12 items-end">
      <div
        class="input-item over-height mb-2 md:mb-0 w-[100%] md:col-span-4 col-span-12"
      >
        <label class="label-text transition-200" for="hotel">{{
          $t('99')
        }}</label>
        <MbscDatepicker
          v-model="form.dates"
          :input-props="{
            class: 'w-full h-12 rounded-md px-2',
            placeholder: 'Please Select...',
          }"
          input-component="input"
          select="range"
          :pages="1"
          return-format="iso8601"
          :show-outer-days="false"
          :controls="['calendar']"
          calendar-type="month"
          :colors="[...coloredDays, ...coloredRtDays]"
          :labels="calendarLabels"
          date-format="DD.MM.YYYY"
          :locale="calendarLocales[locale]"
          :min="new Date()"
          width="400px"
          :theme-variant="useColorMode().value"
          :first-day="1"
          theme="ios"
        >
          <template #dayContent="date">
            <div
              v-if="
                calendarData?.icon && (isCharter(date) || isCharterReturn(date))
              "
              class="w-full flex justify-center"
            >
              <img
                :src="calendarData?.icon"
                alt=""
                class="w-4 rounded-full top-[14px]"
                :class="isCharter(date) && isCharterReturn(date) ? 'mt-1' : ''"
              />
            </div>
          </template>
        </MbscDatepicker>
      </div>
      <div class="input-item w-full md:col-span-4 col-span-12">
        <label class="label-text transition-200" for="hotel"
          >{{ $t('345') }}
        </label>
        <div
          class="flex items-center rounded-md py-2 px-2 bg-white h-[48px] text-[14px] w-full"
          @click="passengerModal = true"
        >
          {{ form.adult + form.child_age.length }}
          {{ $t('422') }}
        </div>
        <MbscPopup
          :is-open="passengerModal"
          display="bottom"
          theme-variant="light"
          theme="material"
          :buttons="[
            {
              text: 'Ok',
              handler: () => (passengerModal = false),
              cssClass:
                '!w-full !bg-primary !text-white !text-[14px] !capitalize !rounded',
            },
          ]"
          @close="passengerModal = false"
        >
          <UIPassengerCount :form="form" />
        </MbscPopup>
      </div>

      <div
        v-if="transfers?.length"
        class="input-item w-full md:col-span-2 col-span-12"
      >
        <label class="label-text transition-200" for="hotel"
          >{{ $t('337') }}
        </label>
        <USelectMenu
          v-model="form.transfer"
          :options="transferList"
          option-attribute="label"
          value-attribute="value"
          class="w-full alt_select"
        >
        </USelectMenu>
      </div>
      <div
        class="col-span-12 mt-3 md:mt-0"
        :class="transfers?.length ? 'md:col-span-2' : 'md:col-span-4'"
      >
        <UButton
          color="primary"
          :loading="dashboardStore.loading"
          class="rounded-[1rem] w-full h-12 justify-center"
          @click="$emit('on-search', form)"
        >
          {{ $t('253') }}
        </UButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import { MbscDatepicker, MbscPopup } from '@mobiscroll/datepicker-vue'
import { calendarLocales } from 'assets/data'
import dayjs from 'dayjs'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

interface Props {
  transfers: {
    name: string
    code: string
    default: number
  }[]
  loading: boolean
}

const passengerModal = ref(false)
const props = defineProps<Props>()
const $emit = defineEmits<{
  (e: 'on-search', val: any): void
}>()
const { t, locale } = useI18n()

const transferLabels = {
  gr: t('86'),
  in: t('136'),
  no: t('504'),
}

const transferList = computed(() =>
  props.transfers?.map((el) => {
    return {
      label: transferLabels[el?.code] || el?.name,
      value: el?.code,
    }
  }),
)
const dashboardStore = useDashboardStore()
const route = useRoute()

const form = reactive({
  dates: [route.query.begin_date, route.query.end_date],
  transfer: route.query?.transfer ?? 'no',
  adult: Number(route.query.adult),
  child_age: route.query?.child ? route.query.child?.split(',') : [],
  class: route.query.class ?? 'E',
})

const calendarData = computed(() => dashboardStore.calendarDates)
const calendarLabels = computed(() => {
  const on_prices = calendarData.value?.on_price?.map((el) => {
    return {
      date: el.date,
      text: route.query?.location_id == '326666' ? t('340') : t('charters'),
      textColor: '#03b115',
      color: '#fff',
      style: 'center',
    }
  })
  const rt_prices = calendarData.value?.rt_price?.map((el) => {
    return {
      date: el.date,
      text: route.query?.location_id == '326666' ? t('204') : t('charters'),
      textColor: '#03b115',
      color: '#fff',
      style: 'center',
    }
  })
  if (route.query?.location_id == '326666' && on_prices && rt_prices) {
    return [...on_prices, ...rt_prices]
  } else {
    return on_prices ? on_prices : []
  }
})
const coloredDays = computed(() => {
  const res = calendarData.value?.on_price?.map((el) => {
    return {
      date: el.date,
      background: '#b2f1c080',
    }
  })
  return res ? res : []
})
const coloredRtDays = computed(() => {
  const res = calendarData.value?.rt_price?.map((el) => {
    return {
      date: el.date,
      background: 'rgba(246,225,11,0.93)',
    }
  })
  return res ? res : []
})
const isCharter = (data) => {
  return calendarData.value?.on?.includes(dayjs(data.date).format('YYYY-MM-DD'))
}
const isCharterReturn = (data) => {
  return calendarData.value?.rt?.includes(dayjs(data.date).format('YYYY-MM-DD'))
}
onMounted(async () => {
  if (!props.loading) {
    form.transfer = props.transfers?.find((el) => el.default)?.code ?? 'gr'
  }
  if (route.query.dep && route.query.location_id) {
    await dashboardStore.getTourCalendarData(
      route.query.dep as string,
      route.query.location_id as string,
      undefined,
    )
  }
})
</script>
