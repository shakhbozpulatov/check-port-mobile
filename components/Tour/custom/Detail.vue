<template>
  <div>
    <div
      class="buyer-info shadow-md border-0 rounded bg-white booking-detail mb-4"
    >
      <div class="bg-[#0073FF] rounded-t p-3">
        <div class="flex items-center gap-3">
          <i
            class="fa-sharp fa-light fa-circle-arrow-left fa-lg text-white transition duration-150 ease-in-out cursor-pointer"
            @click="$router.go(-1)"
          ></i>
          <p class="m-0 font-bolder text-[18px] text-[#ffffff]">
            {{ $t('444') }}
          </p>
        </div>
      </div>
      <div>
        <div class="inner-card p-3">
          <div class="mb-2">
            <div class="text-center">
              <h5 class="h5">{{ data.tour_name }}</h5>
            </div>
            <hr class="my-2" />
            <template v-if="!data.star">
              <div class="flex items-center justify-between">
                <div>
                  <p class="time m-0"></p>
                  <p class="m-0">{{ data.from }}</p>
                  <p class="m-0"></p>
                  <p class="m-0">
                    {{ dayjs(data.date_from as Date).format('DD.MM.YYYY') }}
                  </p>
                </div>
                <div class="flex items-center justify-center flex-col gap-1">
                  <div class="svg-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="time m-0"></p>
                  <p class="m-0">{{ data.to }}</p>
                  <p class="m-0"></p>
                  <p class="m-0">
                    {{ dayjs(data.date_from as Date).format('DD.MM.YYYY') }}
                  </p>
                </div>
              </div>
              <hr class="my-2" />
              <div class="flex items-center justify-between">
                <div>
                  <p class="time m-0"></p>
                  <p class="m-0">{{ data.to }}</p>
                  <p class="m-0"></p>
                  <p class="m-0">
                    {{ dayjs(data.date_to as Date).format('DD.MM.YYYY') }}
                  </p>
                </div>
                <div class="flex items-center justify-center flex-col gap-1">
                  <div class="svg-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path
                        d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="time m-0"></p>
                  <p class="m-0">{{ data.from }}</p>
                  <p class="m-0"></p>
                  <p class="m-0">
                    {{ dayjs(data.date_to as Date).format('DD.MM.YYYY') }}
                  </p>
                </div>
              </div>
              <hr class="my-2" />
            </template>
            <template v-else>
              <div class="flex gap-3 mb-3">
                <p>{{ $t('176') }}:</p>
                <span>{{ data.from }}</span>
                ->
                <span>{{ data.to }}</span>
                ->
                <span>{{ data.from }}</span>
              </div>
              <div class="flex gap-3 mb-3">
                <span>{{ $t('795') }}: </span>
                <div class="flex gap-1 items-center">
                  <span v-for="n in Number(data.star)" :key="n">
                    <i class="fa fa-star !text-[13px]" style="color: gold"></i>
                  </span>
                </div>
              </div>
            </template>
            <div class="flex items-center justify-between gap-2 text-[20px]">
              <div class="flex items-center gap-2">
                <span>
                  <i class="fa-light fa-person text-[#0073FF]"></i>
                  {{ data.adults }}
                </span>
                <span v-if="data.childs !== '0'">
                  <i class="fa-light fa-child-reaching text-[#0073FF]"></i>
                  {{ data.childs !== '0' ? data.childs : '' }}
                </span>
              </div>
              <div
                v-if="!data.star"
                class="flex items-center justify-end text-[16px]"
              >
                {{ $t('143') }}:
                <span>{{ lang === 'uz' ? data.class_uz : data.class }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between px-3 pb-3 mt-3">
        <p class="price-text text-[18px] font-bolder">{{ $t('426') }}:</p>
        <p class="price-text text-[18px] font-bolder">
          {{ data.total_price }}
          USD
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const data = computed(() => route.query)
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style';
.booking-detail {
  .inner-card {
    .svg-wrap {
      width: 20px;
      height: 20px;
      svg {
        path {
          fill: #0073ff;
        }
      }
    }
  }
  .inner-card-item:not(:first-child) {
    margin-top: 18px;
  }
}
</style>
