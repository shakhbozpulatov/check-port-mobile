<template>
  <div class="hotel-wrap search-inputs search-bar mb-3">
    <div class="flex flex-wrap md:flex-nowrap">
      <div
        class="input-item flex flex-col over-height mb-3 md:mb-0 w-full md:w-[33%]"
      >
        <label class="label-text transition-200 mb-2.5" for="hotel">{{
          $t('99')
        }}</label>
        <MbscDatepicker
          v-model="dates"
          :input-props="{
            class: 'w-full h-12 rounded-md px-2',
            placeholder: 'Please Select...',
          }"
          input-component="input"
          calendar-type="month"
          select="range"
          display="bottom"
          return-format="iso8601"
          date-format="DD.MM.YYYY"
          :locale="calendarLocales[locale]"
          :show-outer-days="false"
          :min="new Date()"
          :first-day="1"
          theme="ios"
          :theme-variant="useColorMode().value"
          @change="onCalendarChange"
        />
      </div>
      <div
        class="input-item flex items-end flex-wrap md:flex-nowrap w-full md:w-[66%]"
      >
        <div
          class="flex items-center rounded-md py-2 px-2 bg-white h-[48px] text-[14px] w-full mb-3"
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
          css-class="small-popup rounded-popup"
          @close="passengerModal = false"
        >
          <div
            class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
            @click="passengerModal = false"
          ></div>
          <div class="flex mb-3 justify-between items-center">
            <p class="font-bold text-[16px]">{{ $t('815') }}</p>
            <UButton
              size="sm"
              color="white"
              class="rounded-[1rem]"
              variant="ghost"
              @click="passengerModal = false"
            >
              <i class="fa-solid fa-xmark text-[16px]"></i>
            </UButton>
          </div>
          <hr />
          <UIPassengerCount :form="form" class="w-full" />
        </MbscPopup>
        <div
          v-if="rooms?.additional_service[0].value?.length"
          class="w-full md:w-1/2 mb-3 md:mb-0"
        >
          <label class="label-text transition-200" for="hotel"
            >{{ $t('337') }}
          </label>
          <USelectMenu
            v-model="searchForm.transfer"
            :options="transferList"
            option-attribute="label"
            value-attribute="value"
            class="w-full alt_select"
          />
        </div>
        <div
          v-if="rooms?.additional_service[1].value?.length"
          class="w-full md:w-1/2 mb-4 md:mb-0"
        >
          <label class="label-text transition-200" for="hotel"
            >{{ $t('317') }}
          </label>
          <USelectMenu
            v-model="searchForm.insurance"
            :options="rooms?.additional_service[1].value"
            option-attribute="name"
            value-attribute="code"
            class="w-full alt_select"
          >
          </USelectMenu>
        </div>
        <div class="w-[100%] md:w-[50%]">
          <UButton
            color="primary"
            class="rounded-[1rem] w-full h-12 justify-center"
            @click="$emit('on-search')"
          >
            {{ $t('253') }}
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@mobiscroll/datepicker-vue/dist/css/mobiscroll.min.css'

import { MbscDatepicker, MbscPopup } from '@mobiscroll/datepicker-vue'
import { calendarLocales } from 'assets/data'
import dayjs from 'dayjs'
import { computed, ref, unref } from 'vue'

import type { IRoomsSearchData, ISingleRooms } from '@/types/hotel'
interface Props {
  form: IRoomsSearchData
  rooms: ISingleRooms
}
const { t, locale } = useI18n()
const $emit = defineEmits<{
  (e: 'on-search'): void
}>()
const props = defineProps<Props>()
const passengerModal = ref(false)
const dates = ref([props.form.begin_date ?? '', props.form.end_date ?? ''])

const searchForm = unref(props.form)
const transferLabels = {
  gr: t('86'),
  in: t('136'),
  no: t('504'),
}

const transferList = computed(() =>
  props.rooms?.additional_service[0].value?.map((el) => {
    return {
      label: transferLabels[el?.code] || el?.name,
      value: el?.code,
    }
  }),
)
const onCalendarChange = (e) => {
  if (e?.value) {
    searchForm.begin_date = dayjs(e?.value[0]).format('YYYY-MM-DD')
    searchForm.end_date = dayjs(e?.value[1]).format('YYYY-MM-DD')
  }
}
</script>
