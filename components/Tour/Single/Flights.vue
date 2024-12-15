<template>
  <div :key="loading + 'flight'" :class="{ 'min-h-[130px]': loading }">
    <div v-if="data && data?.flight">
      <div class="mb-3">
        <div class="grid grid-cols-12 gap-3">
          <div
            v-for="(item, index) in data?.flight?.offers"
            :key="index + 'offers'"
            class="col-span-12 md:col-span-6 mb-3 md:mb-0"
          >
            <h1 v-if="index === 0" class="text-center mb-3">
              <span class="text-uppercase transition-200"
                ><i class="text-[#0073FF] far fa-arrow-alt-circle-right"></i>
                {{
                  $route.query.round_trip === '2'
                    ? $t('340')
                    : $route.query.round_trip === '3'
                      ? $t('204')
                      : $t('340')
                }}</span
              >
              <!--  204 -->
            </h1>
            <h1 v-else class="text-center mb-3 transition-200">
              <span class="text-uppercase"
                ><i class="text-[#0073FF] far fa-arrow-alt-circle-left"></i>
                {{ $t('204') }}</span
              >
            </h1>
            <div
              v-for="(value, ind) in item.segments"
              :key="ind + 'segment'"
              class="shadow rounded p-2 bg-white mb-1 transition-200"
            >
              <div
                class="grid grid-cols-12 gap-3 justify-between items-center text-[14px] md:text-[16px]"
              >
                <div
                  class="md:col-span-4 col-span-6 flex flex-col gap-3 h-full justify-between"
                >
                  <div>
                    <b class="text-[#AAAAAA] transition-200">{{
                      value.departure.code
                    }}</b>
                  </div>
                  <div class="transition-200">
                    {{
                      dayjs(value.departure.date_format).format('DD.MM.YYYY')
                    }}

                    <b>{{ value.departure.time_format }}</b>
                  </div>
                </div>
                <div
                  class="md:col-span-4 col-span-12 flex items-center justify-between md:block order-[1] md:order-[0] w-full"
                >
                  <div class="avia-img">
                    <img class="w-full" :src="value.avia_company.logo" alt="" />
                  </div>
                  <div class="transition-200">
                    <b class="text-[#AAAAAA] transition-200">{{ $t('47') }}:</b>
                    {{ value.duration }}
                  </div>
                </div>
                <div
                  class="md:col-span-4 col-span-6 flex flex-col gap-3 h-full justify-between"
                >
                  <div>
                    <b class="text-[#AAAAAA] transition-200">{{
                      value.arrival.code
                    }}</b>
                  </div>
                  <div class="transition-200">
                    {{ dayjs(value.arrival.date_format).format('DD.MM.YYYY') }}
                    <b>{{ value.arrival.time_format }}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

import type { ITourRooms } from '@/types/tour'
interface Props {
  data: ITourRooms
  loading: boolean
}
defineProps<Props>()
</script>
