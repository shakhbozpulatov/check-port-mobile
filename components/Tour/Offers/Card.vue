<template>
  <div>
    <div
      class="card-wrapper grid grid-cols-12 rounded-lg overflow-hidden bg-white shadow w-full h-full"
    >
      <div class="col-span-5 cursor-pointer">
        <div
          class="h-full bg-cover bg-center bg-no-repeat relative min-h-[280px]"
        >
          <span
            v-if="data.dmc == 'eps'"
            class="absolute left-[0] text-[14px] p-2"
            :class="
              data?.content?.ex_options?.includes(1)
                ? 'top-[77px]'
                : 'top-[30px]'
            "
            style="
              z-index: 1;
              border-top-right-radius: 0.75rem;
              background: linear-gradient(
                90deg,
                #0073ff 0%,
                rgb(139, 216, 248) 100%
              );
              border-bottom-right-radius: 0.75rem;
              color: white;
            "
            ><i class="fa-solid fa-bolt me-2"></i
          ></span>
          <NuxtImg
            placeholder="/images/default.webp"
            :src="data.images[0]"
            :alt="data.content.name"
            class="object-cover w-full h-full aspect-video rounded-[8px_0_0_8px]"
            @click="openGalleryView"
          />
          <div
            v-if="data.content?.ex_options?.includes(1)"
            class="absolute top-[20px]"
          >
            <img
              src="/images/icons/altExclusive2.svg"
              alt=""
              class="w-full h-full object-cover max-w-full"
            />
          </div>
        </div>
      </div>
      <NuxtLinkLocale
        :to="{
          path: `/${locale}/tours/${data.code}`,
          query,
        }"
        class="col-span-7 hotel-wrap !p-2 transition-200 flex flex-col justify-between"
      >
        <div class="w-full">
          <div class="flex justify-between">
            <div v-if="!isNaN(Number(data?.content?.stars))">
              <div class="custom-rate">
                <i
                  v-for="n in 5"
                  :key="n"
                  :class="[
                    'fa-star !text-sm',
                    n <= Number(data?.content?.stars)
                      ? 'fa-solid !text-[#ffcc00]'
                      : 'fa-regular !text-[#ccc]',
                  ]"
                ></i>
              </div>
            </div>
            <p
              v-else
              class="text-sm mb-1 text-[#f7ba2a] tracking-widest shrink-0 transition-200"
            >
              {{ data?.content?.stars }}
            </p>
          </div>
          <div class="flex justify-start gap-2">
            <p class="!capitalize text-base font-bold transition-200">
              {{ capitalize(data.content.name) }}
            </p>
            <div
              v-if="data.content.guest.overall"
              class="flex items-end md:items-center justify-end shrink-0"
            >
              <span
                class="bg-[#0073FF] border-[#0073FF] border text-white w-[30px] text-center text-xs rounded ms-2 transition-200"
                >{{ data.content.guest.overall }}</span
              >
            </div>
          </div>
          <div
            v-if="data?.content?.address.city"
            class="!capitalize transition-200"
          >
            <i class="fa-light fa-location-dot"></i>
            {{
              data?.content?.address.city !== ' '
                ? data?.content?.address.city + ', '
                : ''
            }}
            {{ capitalize(data?.content?.address_str) }}
          </div>

          <!--          <div class="flex gap-1 items-center mt-2">-->
          <!--            <div class="flex items-center gap-1">-->
          <!--              <i class="fa-light fa-calendar-days text-[#0073FF]"></i>-->
          <!--              <p class="info font-bolder text-[12px]">-->
          <!--                {{-->
          <!--                  dayjs(allTourOffers?.request?.departure?.date).format(-->
          <!--                    'DD.MM.YY',-->
          <!--                  )-->
          <!--                }}-->
          <!--                - -->
          <!--                {{-->
          <!--                  dayjs(allTourOffers?.request?.arrival?.date).format(-->
          <!--                    'DD.MM.YY',-->
          <!--                  )-->
          <!--                }}-->
          <!--                ·-->
          <!--              </p>-->
          <!--            </div>-->
          <!--            <div>-->
          <!--              <div-->
          <!--                v-if="allTourOffers?.request?.adult !== 0"-->
          <!--                class="flex items-center gap-2"-->
          <!--              >-->
          <!--                <span class="text-[12px] font-bolder info">-->
          <!--                  <i class="fa-regular fa-user text-[#0073FF]"></i>-->
          <!--                  {{ allTourOffers?.request?.adult }}-->
          <!--                </span>-->
          <!--                <span-->
          <!--                  v-if="allTourOffers?.request?.child_age.length !== 0"-->
          <!--                  class="text-[12px] font-bolder info"-->
          <!--                >-->
          <!--                  + {{ allTourOffers?.request?.child_age.length }}-->
          <!--                </span>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="flex items-center gap-1 transition-200">-->
          <!--              / <i class="fa-light fa-moon text-[#0073FF]"></i>-->
          <!--              <p class="info text-[12px] font-bolder">-->
          <!--                {{-->
          <!--                  dayjs(allTourOffers?.request?.arrival?.date).diff(-->
          <!--                    allTourOffers?.request?.departure?.date,-->
          <!--                    'days',-->
          <!--                  )-->
          <!--                }}-->
          <!--              </p>-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="flex items-start gap-5 justify-between mt-2">
            <div class="flex flex-col gap-2">
              <!--              <div class="tag-group flex flex-wrap gap-2 items-center">-->
              <!--                <UBadge size="sm">-->
              <!--                  <i class="fa-light fa-bed-front me-2"></i>-->
              <!--                  {{ data.rooms[0]?.room_name }}-->
              <!--                </UBadge>-->
              <!--                <UBadge v-if="data.rooms[0]?.placement" size="sm">-->
              <!--                  <i class="fa-light fa-bed-front me-2"></i>-->
              <!--                  {{ data.rooms[0]?.placement }}-->
              <!--                </UBadge>-->
              <!--                <template-->
              <!--                  v-for="(elem1, j) in data.rooms[0]?.amenities"-->
              <!--                  :key="j"-->
              <!--                >-->
              <!--                  <UBadge v-if="elem1?.is_board" size="sm">-->
              <!--                    <i-->
              <!--                      v-if="elem1?.icon"-->
              <!--                      :class="elem1?.icon"-->
              <!--                      class="text-[14px] me-2"-->
              <!--                    ></i>-->
              <!--                    {{ elem1?.name }}-->
              <!--                  </UBadge>-->
              <!--                </template>-->
              <!--              </div>-->
              <!--              <div class="tag-group flex flex-wrap gap-2 items-center">-->
              <!--                <template-->
              <!--                  v-for="(elem1, k) in data.rooms[0]?.amenities"-->
              <!--                  :key="k"-->
              <!--                >-->
              <!--                  <UBadge-->
              <!--                    v-if="elem1?.is_board === false"-->
              <!--                    size="sm"-->
              <!--                    variant="outline"-->
              <!--                    class="mb-2"-->
              <!--                  >-->
              <!--                    <i-->
              <!--                      v-if="elem1?.icon"-->
              <!--                      :class="elem1?.icon"-->
              <!--                      class="text-[14px] me-2"-->
              <!--                    ></i>-->
              <!--                    {{ elem1?.name }}-->
              <!--                  </UBadge>-->
              <!--                </template>-->
              <!--              </div>-->
              <div
                v-if="!Array.isArray(data?.content?.tour_package)"
                class="tag-group flex flex-wrap gap-2 mb-2 items-center"
              >
                <UBadge
                  v-if="data?.content?.tour_package?.avia"
                  size="sm"
                  variant="outline"
                >
                  <i
                    :class="
                      data?.content?.tour_package?.avia
                        ? 'fa-light fa-plane'
                        : ''
                    "
                    class="text-[14px] me-2 text-[#0073FF]"
                  ></i>
                  <span>
                    {{ data?.content?.tour_package?.avia ? t('28') : '' }}
                  </span>
                </UBadge>
                <UBadge
                  v-if="data?.content?.tour_package?.transfer"
                  variant="outline"
                  size="sm"
                >
                  <i
                    :class="
                      data?.content?.tour_package?.transfer
                        ? 'fa-light fa-taxi-bus'
                        : ''
                    "
                    class="text-[14px] me-2 text-[#0073FF]"
                  ></i>
                  <span>
                    {{
                      data?.content?.tour_package?.transferName ===
                      'Free Transfer'
                        ? t('518')
                        : data?.content?.tour_package?.transferName === 'Group'
                          ? t('86')
                          : data?.content?.tour_package?.transferName ===
                              'Individual'
                            ? t('136')
                            : data?.content?.tour_package?.transferName !==
                                  'Group' &&
                                data?.content?.tour_package?.transferName !==
                                  'Individual'
                              ? data?.content?.tour_package?.transferName
                              : t('337')
                    }}
                  </span>
                </UBadge>
                <UBadge
                  v-if="data?.content?.tour_package?.visa"
                  variant="outline"
                  size="sm"
                >
                  <i
                    :class="
                      data?.content?.tour_package?.visa
                        ? 'fa-light fa-passport'
                        : ''
                    "
                    class="text-[14px] me-2 text-[#0073FF]"
                  ></i>
                  <span>
                    {{ data?.content?.tour_package?.visa ? t('443') : '' }}
                  </span>
                </UBadge>
                <UBadge
                  v-if="data?.content?.tour_package?.insurance"
                  variant="outline"
                >
                  <i
                    :class="
                      data?.content?.tour_package?.insurance
                        ? 'fa-sharp fa-light fa-file-lines'
                        : ''
                    "
                    class="text-[14px] me-2 text-[#0073FF]"
                  ></i>
                  <span>
                    {{ data?.content?.tour_package?.insurance ? t('505') : '' }}
                  </span>
                </UBadge>
                <UBadge
                  v-if="data?.content?.tour_package?.dep_insurance"
                  variant="outline"
                  size="sm"
                >
                  <i
                    :class="
                      data?.content?.tour_package?.dep_insurance
                        ? 'fa-sharp fa-light fa-car-garage'
                        : ''
                    "
                    class="text-[14px] me-2 text-[#0073FF]"
                  ></i>
                  <span>
                    {{
                      data?.content?.tour_package?.dep_insurance
                        ? $t('511')
                        : ''
                    }}
                  </span>
                </UBadge>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-1 flex flex-col justify-end items-end">
          <div
            v-if="
              route.query.location_id === '325475' &&
              data?.content?.ex_late_checkin
            "
            class="mb-2"
          >
            <UButton
              v-if="data?.content?.ex_late_checkin == 1"
              type="primary"
              class="rounded-[1rem]"
              @click.prevent="lateCheckin(1)"
            >
              {{ $t('793') }}
            </UButton>
            <UButton
              v-if="data?.content?.ex_late_checkin == 2"
              type="primary"
              class="rounded-[1rem]"
              @click.prevent="lateCheckin(2)"
            >
              {{ $t('794') }}
            </UButton>
          </div>
          <UBadge
            v-if="data?.rooms[0]?.hotel_status == 'stop'"
            color="red"
            variant="solid"
            class="mb-2 capitalize"
          >
            {{ $t('497').toLowerCase() }}
          </UBadge>
          <b class="block text-[19px] transition-200">
            {{ formatNumber(Math.ceil(data?.rooms[0]?.price_info_.b2c_total)) }}
            {{ allTourOffers?.request?.currency }}
          </b>
          <span
            v-if="data.dmc === 'eps'"
            class="text-[#AAAAAA] text-[14px] transition-200"
            >include taxes & fees</span
          >
          <UButton class="rounded-[1rem] flex items-center"
            ><p>{{ t('492') }}</p>
            <i class="ml-2 fa-solid fa-angle-right"></i
          ></UButton>
        </div>
      </NuxtLinkLocale>
    </div>
    <MbscPopup
      :is-open="dialog"
      class="tarif-dialog"
      display="bottom"
      theme-variant="light"
      theme="material"
      :full-screen="true"
      :scroll-lock="false"
      css-class="small-popup relative"
    >
      <div class="relative h-full">
        <div
          class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto mt-10"
          @click="dialog = false"
        ></div>
        <div class="flex mb-3 justify-between items-center">
          <p class="font-bold text-[16px]">{{ data.content.name }}</p>
          <UButton
            size="sm"
            color="white"
            class="rounded-[1rem]"
            variant="ghost"
            @click="dialog = false"
          >
            <i class="fa-solid fa-xmark text-[16px]"></i>
          </UButton>
        </div>
        <hr class="mb-5" />
        <div class="gallery">
          <NuxtImg
            v-for="(image, index) in single?.images"
            :key="index"
            placeholder="/images/default.webp"
            :src="image?.links?.['1000px']?.href"
            :alt="data.content.name"
            class="object-cover img w-full h-full rounded-[8px_0_0_8px] md:!rounded-[8px_0_0_8px]"
          />
        </div>
        <div
          class="border rounded-md sticky -bottom-4 z-10 bg-white p-4 pb-8 -mx-4 mt-4"
        >
          <NuxtLinkLocale
            :to="{
              path: `/${locale}/tours/${data.code}`,
              query,
            }"
          >
            <UIButton
              id="details"
              variant="primary"
              class="h-[48px] bg-[#0083ff] text-white w-full"
            >
              {{ $t('115') }}
            </UIButton>
          </NuxtLinkLocale>
        </div>
      </div>
    </MbscPopup>
  </div>
</template>

<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'
import dayjs from 'dayjs'
import type { Ref } from 'vue'

import type { IHotel, IHotelSingle } from '@/types/hotel'
import { formatNumber } from '@/utils'
import { useApi } from '~/composables/useApi'
import type { ITourSingle } from '~/types/tour'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const tourStore = useTourStore()

interface Props {
  data: IHotel
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'on-calculate_late_checkin', val: number): void
}>()
const dialog = ref(false)
const single: Ref<ITourSingle | null> = ref(null)
// Computed values
const allTourOffers = computed(() => tourStore.allTourOffers)
const capitalize = (text) => {
  return text
    .split(' ')
    .map((el) => el.toLowerCase())
    .join(' ')
}
const lateCheckin = (num) => {
  router.replace({ query: { ...route.query, ex_late_checkin: num } })
  emits('on-calculate_late_checkin', num)
}
const query = computed(() => {
  return {
    request_id: tourStore.searchResult.request_id,
    referal_loc_type: route.query?.loc_type,
    adult: route.query.adult,
    child: route.query.child_age,
    begin_date: route.query.dep_date,
    end_date: route.query.arr_date,
    transfer: route.query?.transfer ?? 'gr',
    round_trip: route.query?.round_trip,
    class: route.query?.class ?? 'E',
    dep: route.query?.dep,
    location_id: route.query?.location_id,
    // hotel_name: props?.data?.content.name,
    ex_late_checkin: route.query?.ex_late_checkin,
  }
})
function getTourSingle(id: string, type: string) {
  return new Promise((resolve, reject) => {
    useApi()
      .$get<ITourSingle>('/v1/hotel/get-hotel', {
        params: {
          hotel_id: id,
          type: type,
          lang: locale.value,
          currency: useCookie('currency').value || 'USD',
          platform: 'app',
        },
      })
      .then((res) => {
        single.value = res
        resolve(res)
      })
      .catch((err) => reject(err))
  })
}
const openGalleryView = async () => {
  try {
    await getTourSingle(props.data?.code, 'hotel')
    dialog.value = true
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.fa-star {
  font-size: 24px;
  margin-right: 4px;
  color: #ccc; /* цвет неактивных звезд */
}

.fa-star.fa-solid {
  color: #ffcc00; /* цвет активных звезд */
}
.gallery {
  column-count: 2;
  column-gap: 10px;
}

.gallery .img {
  width: 100%;
  margin-bottom: 10px;
  display: block;
  border-radius: 10px;
  break-inside: avoid; /* Избегать разрыва изображения между колонками */
  transition: transform 0.3s ease;
}
</style>
