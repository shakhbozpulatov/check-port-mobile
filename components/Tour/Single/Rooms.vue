<template>
  <div
    v-if="data"
    id="price-scroll"
    :key="loading + 'rooms'"
    class="hotel-wrap mb-3 transition-200"
    :class="{ 'min-h-[350px]': loading }"
  >
    <div class="mb-3 flex items-center justify-between">
      <h3 class="card-title transition-200">
        {{ $t('114') }}
      </h3>
      <div
        v-if="route.query.location_id === '325475' && data?.rooms?.length"
        class="mb-2"
      >
        <UButton
          v-if="data?.rooms?.[0]?.ex_late_checkin == 1"
          type="primary"
          class="rounded-[1rem]"
          @click="emits('on-late_checkin', 1)"
        >
          {{ $t('793') }}
        </UButton>
        <UButton
          v-if="data?.rooms?.[0]?.ex_late_checkin == 2"
          type="primary"
          class="rounded-[1rem]"
          @click="emits('on-late_checkin', 2)"
        >
          {{ $t('794') }}
        </UButton>
      </div>
    </div>
    <div v-if="data && data?.rooms?.length">
      <div
        v-for="(elem, index) in data.rooms"
        :key="index + 'rooms'"
        class="hotel-card mb-3 transition-200"
      >
        <div class="grid grid-cols-12 room-image md:flex-nowrap">
          <div class="img-wrap block relative col-span-12 md:col-span-2">
            <img
              v-if="elem.rates?.[0]?.images[0]?.links['1000px'].href"
              :src="elem.rates?.[0]?.images[0]?.links['1000px'].href"
              alt="img"
              class="img min-h-[148px] aspect-video object-cover h-full"
              @click="showRoomImg(elem)"
            />
            <div
              v-else
              class="bg-gray-200 h-full flex items-center justify-center"
            >
              <div class="image-slot w-full !h-[148px]">
                <svg
                  data-v-faea1f39=""
                  xmlns="http://www.w3.org/2000/svg"
                  width="90px"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  enable-background="new 0 0 256 256"
                  xml:space="preserve"
                >
                  <g data-v-faea1f39="">
                    <g data-v-faea1f39="">
                      <path
                        data-v-faea1f39=""
                        fill="#000000"
                        d="M232.9,124.7v-36c0-7.2-5.9-13.1-13.1-13.1H88.6c-7.2,0-13.1,5.9-13.1,13.1v36c-7.2,0-13.1,5.9-13.1,13.1v75.4c0,1.8,1.5,3.3,3.3,3.3H69c1.8,0,3.3-1.5,3.3-3.3v-16.3h163.9v16.3c0,1.8,1.5,3.3,3.3,3.3h3.3c1.8,0,3.3-1.5,3.3-3.3v-75.4C246,130.6,240.1,124.7,232.9,124.7z M85.4,92c0-3.6,2.9-6.5,6.5-6.5h124.5c3.6,0,6.5,2.9,6.5,6.5v32.8h-13.1v-19.6c0-3.6-2.9-6.5-6.5-6.5h-36c-3.6,0-6.5,2.9-6.5,6.5v19.6h-13.1v-19.6c0-3.6-2.9-6.5-6.6-6.5h-36c-3.6,0-6.5,2.9-6.5,6.5v19.6H85.4V92z M206.6,106.4v18.3H164v-18.3c0-2.5,2.1-4.6,4.7-4.6h33.1C204.5,101.8,206.6,103.8,206.6,106.4z M144.4,106.4v18.3h-42.6v-18.3c0-2.5,2.1-4.6,4.7-4.6h33.1C142.2,101.8,144.4,103.8,144.4,106.4z M236.1,187H72.3v-9.8h163.9V187z M236.1,167.3H72.3v-26.2c0-3.6,2.9-6.5,6.5-6.5h150.8c3.6,0,6.6,2.9,6.6,6.5V167.3L236.1,167.3z M59.1,98.5c3.6,0,6.5-2.9,6.5-6.5l-6.5-45.9c0-3.6-2.9-6.5-6.6-6.5H23.1c-3.6,0-6.5,2.9-6.5,6.5L10,92c0,3.6,2.9,6.5,6.5,6.5h16.4v108.1h-6.5c-1.8,0-3.3,1.5-3.3,3.3v3.3c0,1.8,1.5,3.3,3.3,3.3h22.9c1.8,0,3.3-1.5,3.3-3.3v-3.3c0-1.8-1.5-3.3-3.3-3.3h-6.5V98.5H59.1z M27.7,88.7c-2.5,0-4.6-2.1-4.6-4.7l4.6-29.9c0-2.6,2-4.7,4.6-4.7h11.1c2.5,0,4.6,2.1,4.6,4.7l4.6,29.9c0,2.6-2,4.7-4.6,4.7H27.7L27.7,88.7z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <div
              v-if="elem.rates?.[0]?.images[0]"
              class="rooms-images flex items-center gap-1 p-1 absolute bottom-[14px] right-[10px]"
            >
              <i class="fa-light fa-images fa-sm"></i>
              <p class="">+{{ elem.rates?.[0]?.images?.length }}</p>
            </div>
          </div>

          <div
            class="position-relative w-full pb-0 col-span-12 md:col-span-10 p-4"
          >
            <div>
              <h3 class="!capitalize name-room transition-200">
                {{ capitalize(elem?.room_name) }}
              </h3>
              <span class="text-[#AAAAAA] text-[12px] transition-200">{{
                elem?.lang_room_name
              }}</span>
            </div>
            <div v-for="(rate, j) in elem.rates" :key="j + 'rate'">
              <div
                class="grid grid-cols-12"
                :class="elem.rates.length > 1 ? 'border-b border-dashed' : ''"
              >
                <div class="col-span-12 md:col-span-4 mt-3 pt-0">
                  <div class="tag-group flex flex-wrap gap-2 mb-2 items-center">
                    <template v-if="rate?.bed_groups?.[0]?.description">
                      <UBadge
                        v-for="elem1 in rate?.bed_groups"
                        :key="elem1.id"
                        size="sm"
                      >
                        <i class="fa-solid fa-bed me-1"></i>
                        {{ elem1?.description }}
                      </UBadge>
                    </template>
                    <template v-for="elem1 in rate?.amenities" :key="elem1.id">
                      <UBadge v-if="elem1?.is_board" size="sm" effect="dark">
                        <i
                          v-if="elem1?.icon"
                          :class="elem1?.icon"
                          class="text-[14px] me-2"
                        ></i>
                        {{ elem1?.name }}
                      </UBadge>
                    </template>
                    <UBadge
                      v-if="elem.rates?.[0]?.placement"
                      size="sm"
                      effect="dark"
                    >
                      <i class="fa-light fa-bed-front me-2"></i>
                      {{ elem.rates?.[0]?.placement }}
                    </UBadge>
                  </div>
                  <div class="tag-group flex flex-wrap gap-2 mb-2 items-center">
                    <template v-for="elem1 in rate?.amenities" :key="elem1.id">
                      <UBadge
                        v-if="elem1?.is_board === false"
                        size="sm"
                        variant="outline"
                      >
                        <i
                          v-if="elem1?.icon"
                          :class="elem1?.icon"
                          class="text-[14px] me-2"
                        ></i>
                        {{ elem1?.name }}
                      </UBadge>
                    </template>
                  </div>
                  <div
                    v-if="elem?.tour_package"
                    class="tag-group flex flex-wrap gap-2 mb-2 items-center"
                  >
                    <UBadge
                      v-if="elem.tour_package?.avia"
                      size="sm"
                      variant="outline"
                    >
                      <i
                        :class="
                          elem.tour_package?.avia ? 'fa-light fa-plane' : ''
                        "
                        class="text-[14px] me-2 text-[#0073FF]"
                      ></i>
                      <span class="text-black">
                        {{ elem.tour_package?.avia ? $t('28') : '' }}
                      </span>
                    </UBadge>
                    <UBadge
                      v-if="elem.tour_package?.transfer"
                      size="sm"
                      variant="outline"
                    >
                      <i
                        :class="
                          elem.tour_package?.transfer
                            ? 'fa-light fa-taxi-bus'
                            : ''
                        "
                        class="text-[14px] me-2 text-[#0073FF]"
                      ></i>
                      <span class="text-black">
                        {{
                          elem?.tour_package?.transferName === 'Free Transfer'
                            ? $t('518')
                            : elem?.tour_package?.transferName === 'Group'
                              ? $t('86')
                              : elem?.tour_package?.transferName ===
                                  'Individual'
                                ? $t('136')
                                : elem?.tour_package?.transferName !==
                                      'Group' &&
                                    elem?.tour_package?.transferName !==
                                      'Individual'
                                  ? elem?.tour_package?.transferName
                                  : $t('337')
                        }}
                        <!--                        {{ elem.tour_package?.transfer ? $t("337") : "" }}-->
                      </span>
                    </UBadge>
                    <UBadge
                      v-if="elem.tour_package?.insurance"
                      size="sm"
                      variant="outline"
                    >
                      <i
                        :class="
                          elem.tour_package.insurance
                            ? 'fa-sharp fa-light fa-file-lines'
                            : ''
                        "
                        class="text-[14px] me-2 text-[#0073FF]"
                      ></i>
                      <span class="text-black">
                        {{ elem.tour_package.insurance ? $t('505') : '' }}
                      </span>
                    </UBadge>
                    <UBadge
                      v-if="elem?.tour_package?.dep_insurance"
                      size="sm"
                      variant="outline"
                    >
                      <i
                        :class="
                          elem?.tour_package?.dep_insurance
                            ? 'fa-sharp fa-light fa-car-garage'
                            : ''
                        "
                        class="text-[14px] me-2 text-[#0073FF]"
                      ></i>
                      <span class="text-black">
                        {{ elem?.tour_package?.dep_insurance ? $t('511') : '' }}
                      </span>
                    </UBadge>
                    <UBadge
                      v-if="elem.tour_package?.visa"
                      size="sm"
                      variant="outline"
                    >
                      <i
                        :class="
                          elem.tour_package?.visa ? 'fa-light fa-passport' : ''
                        "
                        class="text-[14px] me-2 text-[#0073FF]"
                      ></i>
                      <span class="text-black">
                        {{ elem.tour_package?.visa ? $t('443') : '' }}
                      </span>
                    </UBadge>
                  </div>
                </div>
                <div class="col-span-12 md:col-span-4 mt-3 pt-0">
                  <div
                    v-if="elem.dmc === 'eps'"
                    class="flex justify-between mb-3"
                  >
                    <div>
                      <UBadge
                        v-if="rate.rate_data.refundable"
                        size="sm"
                        color="green"
                        class="hotel-items rounded w-min text-nowrap"
                        ><i
                          class="fa-light fa-money-bill-transfer w-[20px]"
                        ></i>
                        {{ $t('60') }}</UBadge
                      >
                      <UBadge
                        v-else
                        size="sm"
                        color="red"
                        class="hotel-items rounded w-min text-nowrap"
                        ><i
                          class="fa-light fa-money-bill-transfer w-[20px]"
                        ></i>
                        {{ $t('179') }}</UBadge
                      >
                    </div>
                  </div>
                  <div class="flex gap-1 items-center font-bolder">
                    <div class="flex items-center gap-1">
                      <i class="fa-light fa-calendar-days text-[#0073FF]"></i>
                      <p
                        v-if="$route.query.begin_date"
                        class="info transition-200"
                      >
                        {{ dayjs($route.query.begin_date).format('DD.MM.YY') }}
                        -
                        {{ dayjs($route.query.end_date).format('DD.MM.YY') }}
                        ·
                      </p>
                    </div>
                    <div
                      v-if="$route.query.adult !== '0'"
                      class="flex items-center gap-2"
                    >
                      <span class="text-[18px] info transition-200">
                        <i class="fa-regular fa-user text-[#0073FF]"></i>
                        {{ $route.query.adult }}
                      </span>
                      <span
                        v-if="$route.query.child"
                        class="text-[18px] info transition-200"
                      >
                        + {{ $route.query.child?.split(',')?.length }}
                      </span>
                    </div>
                    <div class="flex items-center gap-1 transition-200">
                      / <i class="fa-light fa-moon text-[#0073FF]"></i>
                      <p
                        v-if="$route.query.begin_date"
                        class="info transition-200"
                      >
                        {{
                          dayjs($route.query.end_date).diff(
                            dayjs($route.query.begin_date),
                            'days',
                          )
                        }}
                      </p>
                    </div>
                  </div>
                  <div v-if="rate?.rate_data?.available_rooms">
                    <UBadge size="sm" class="mt-2"
                      >{{ $t('114') }}:
                      {{ rate?.rate_data?.available_rooms }}</UBadge
                    >
                  </div>
                </div>
                <div class="col-span-12 md:col-span-4 mt-3 pt-0">
                  <div>
                    <div class="grid grid-cols-12 gap-3">
                      <div
                        class="md:col-span-6 col-span-12 mb-3 md:mb-0 text-right"
                      >
                        <h3 class="price transition-200">
                          {{
                            formatNumber(
                              parseFloat(rate.price_info_?.b2c_total).toFixed(
                                2,
                              ),
                            )
                          }}
                          {{ rate.currency }}
                        </h3>
                        <p class="price-desc transition-200">
                          + {{ $t('390') }}
                        </p>
                      </div>

                      <div class="md:col-span-6 col-span-12">
                        <div v-for="(bed, ind) in rate.bed_groups" :key="ind">
                          <UButton
                            :type="
                              rate?.status === 'stop'
                                ? 'red'
                                : rate?.status === 'request'
                                  ? 'yellow'
                                  : 'primary'
                            "
                            :disabled="rate?.status === 'stop'"
                            class="rounded-[1rem] w-full mb-3 justify-center"
                            size="lg"
                            @click="sendCheck(bed.buy_id)"
                            >{{
                              rate?.status === 'stop'
                                ? $t('497')
                                : rate?.status === 'request'
                                  ? $t('506')
                                  : $t('120')
                            }}</UButton
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="singleData.data?.rooms?.[elem.room_code]"
          class="position-relative px-3 mb-3"
        >
          <!--          :class="roomShow[index] ? 'h-[auto]' : 'h-[0px]'"-->
          <div
            v-if="singleData.data.rooms?.[elem.room_code]"
            class="flex flex-wrap items-center gap-2 overflow-hidden"
            style="flex-wrap: wrap !important"
          ></div>
        </div>
        <div
          v-if="
            Array.isArray(elem.rates[0]?.data)
              ? elem.rates[0]?.data?.length
              : Object.keys(elem.rates[0]?.data)?.length
          "
          class="text-[14px] bg-white shadow p-3 rounded border-t-2 border-dashed"
        >
          <span
            v-for="(value, key) in elem.rates[0]?.data"
            :key="key"
            class="px-2 text-[12px] shrink-0"
          >
            <span
              :class="
                key === 'dmcPrice' || key === 'transferDmcPrice'
                  ? 'text-red-500 font-bolder'
                  : ''
              "
              >{{ key }}</span
            >: {{ value }}
          </span>
        </div>
      </div>
      <vue-easy-lightbox
        :visible="visibleRef"
        :imgs="lightbox"
        @hide="onHide"
      ></vue-easy-lightbox>
    </div>
    <div v-else>
      <div class="alert alert-danger text-center" role="alert">
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('459') }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-easy-lightbox/external-css/vue-easy-lightbox.css'

import dayjs from 'dayjs'
import VueEasyLightbox from 'vue-easy-lightbox'

import type { ITourRooms, ITourSingle } from '@/types/tour'
import { formatNumber } from '@/utils'
import { useAuthValidation } from '~/composables/useAuthValidation'

interface Props {
  data: ITourRooms
  loading: boolean
  singleData: ITourSingle
}
const emits = defineEmits<{
  (e: 'on-late_checkin', val: number): void
}>()
const { checkRegister } = useAuthValidation()
const authRequired = ref(false)
const capitalize = (text) => {
  return text
    .split(' ')
    .map((el) => el.toLowerCase())
    .join(' ')
}
const props = defineProps<Props>()
const route = useRoute()
const router = useRouter()
const store = useTourStore()
const visibleRef = ref(false)
const imageRef = ref(null)
const { t, locale } = useI18n()
const showRoomImg = (elem) => {
  imageRef.value = elem
  visibleRef.value = true
}

const lightbox = computed(() => {
  return imageRef.value?.rates[0]?.images.map((src) => src.links['1000px'].href)
})

const onHide = () => (visibleRef.value = false)

const sendCheck = async (buy_id: string) => {
  const data = {
    product_id: 8,
    flight_buy_id: props.data.flight.buy_id,
    hotel_buy_id: buy_id,
    request_id: route.query.request_id,
    search_mode: route.params?.search_mode,
  }
  try {
    const res = await store.getTourOrderCheck(data)
    if (!res?.reservation_id) return
    await router.push({
      path: `/${locale.value}/tours/booking`,
      query: { ...data },
    })
  } catch (e) {
    console.log(e)
  }
}
</script>
