<template>
  <div>
    <div
      class="card-wrapper grid grid-cols-12 rounded-lg bg-white shadow w-full !min-h-[240px] relative"
    >
      <div class="col-span-4 cursor-pointer relative">
        <div
          class="rounded-full bg-[#ffffff] w-[30px] h-[30px] flex items-center justify-center absolute right-2 top-[10px] z-10"
          @click="onSaveFavourite"
        >
          <i
            v-if="cookieStore.favouritesCodes?.includes(hotel.code)"
            class="fa-solid fa-bookmark text-[#0073ff]"
          ></i>
          <i v-else class="fa-light fa-bookmark text-[#0073ff]"></i>
        </div>
        <span
          v-if="props?.hotel?.dmc == 'eps'"
          class="absolute left-[0] text-[14px] p-2"
          :class="
            props.hotel?.content?.ex_options?.includes(1)
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

        <div
          class="min-h-[240px] h-full bg-cover bg-center bg-no-repeat !relative"
        >
          <NuxtImg
            placeholder="/images/default.webp"
            :src="hotel.images[0]"
            :alt="hotel.content.name"
            class="object-cover w-full h-full aspect-video rounded-[8px_0_0_8px] md:!rounded-[8px_0_0_8px]"
            @click="openGallery"
          />
          <div
            v-if="hotel?.content?.ex_options.includes(1)"
            class="absolute top-[20px]"
          >
            <img
              src="/images/icons/altExclusive2.svg"
              alt=""
              style="max-width: 100%"
            />
          </div>
        </div>
      </div>
      <NuxtLinkLocale
        :to="{ path: `/hotels/${hotel.code}`, query: queries }"
        class="col-span-8 hotel-wrap p-3 transition-200 flex flex-col justify-between"
      >
        <div class="flex flex-col relative">
          <img
            v-if="hotel?.content?.friday_discount"
            src="/images/icons/black-friday-sales.png"
            alt="black_friday"
            class="w-8 absolute -right-7 -top-8 -scale-x-100 -scale-y-100"
          />
          <div class="flex justify-between w-full items-center">
            <div
              v-if="!isNaN(Number(hotel?.content?.stars))"
              class="custom-rate"
            >
              <i
                v-for="n in 5"
                :key="n"
                :class="[
                  'fa-star !text-xs',
                  n <= Number(hotel?.content?.stars)
                    ? 'fa-solid !text-[#ffcc00]'
                    : 'fa-regular !text-[#ccc]',
                ]"
              ></i>
            </div>
            <p v-else class="text-sm text-[#f7ba2a] tracking-widest">
              {{ hotel?.content?.stars }}
            </p>
            <span
              v-if="hotel.content.guest.overall"
              class="bg-[#0073FF] border-[#0073FF] px-1 border text-white text-center text-xs rounded transition-200"
              >{{ hotel.content.guest.overall }}</span
            >
          </div>

          <div class="flex justify-between items-start gap-2">
            <div>
              <p
                class="text-base font-bold flex items-center gap-3 transition-200"
              >
                {{ hotel.content.name }}
              </p>
              <span
                v-if="hotel?.content?.address.city"
                class="transition-200 text-sm leading-3 line-clamp-1"
                ><i class="fa-light fa-location-dot"></i>
                {{
                  hotel?.content?.address?.city !== ' '
                    ? hotel?.content?.address?.city + ', '
                    : ''
                }}
                {{ hotel?.content?.address_str }}</span
              >
            </div>
          </div>
          <div class="flex flex-col gap-1 mt-2">
            <template
              v-if="
                hotel?.content?.tour_package?.transfer ||
                hotel?.content?.tour_package?.insurance
              "
            >
              <div class="tag-group flex flex-wrap gap-2 mb-1 items-center">
                <UBadge
                  v-if="hotel?.content?.tour_package?.transfer"
                  variant="outline"
                  size="sm"
                >
                  <i
                    :class="
                      hotel?.content?.tour_package?.transfer
                        ? 'fa-light fa-taxi-bus'
                        : ''
                    "
                    class="text-[14px] me-2 text-[#0073FF]"
                  ></i>
                  <span class="text-black">
                    {{
                      hotel?.content?.tour_package?.transferName ===
                      'Free Transfer'
                        ? t('518')
                        : hotel?.content?.tour_package?.transferName === 'Group'
                          ? t('86')
                          : hotel?.content?.tour_package?.transferName ===
                              'Individual'
                            ? t('136')
                            : hotel?.content?.tour_package?.transferName !==
                                  'Group' &&
                                hotel?.content?.tour_package?.transferName !==
                                  'Individual'
                              ? hotel?.content?.tour_package?.transferName
                              : t('337')
                    }}
                  </span>
                </UBadge>
                <UBadge
                  v-if="hotel?.content?.tour_package?.insurance"
                  size="sm"
                  variant="outline"
                >
                  <i
                    :class="
                      hotel?.content?.tour_package?.insurance
                        ? 'fa-sharp fa-light fa-file-lines'
                        : ''
                    "
                    class="text-[14px] me-2 text-[#0073FF]"
                  ></i>
                  <span>
                    {{
                      hotel?.content?.tour_package?.insurance ? t('505') : ''
                    }}
                  </span>
                </UBadge>
              </div>
            </template>
            <div v-if="hotel?.dmc === 'eps'">
              <UBadge v-if="hotel.rooms[0].refundable" color="green" size="sm"
                ><i class="fa-light fa-money-bill-transfer w-[20px]"></i>
                {{ t('60') }}
                {{
                  locale !== 'uz' && hotel.rooms[0].cancel_penalties[0].end
                    ? $t('763')
                    : ''
                }}
                -
                {{
                  hotel.rooms[0].cancel_penalties[0].end
                    ? dayjs(rate?.rate_data.cancel_penalties[0].end).format(
                        'DD:MM:YYYY',
                      )
                    : ''
                }}
                {{
                  locale === 'uz' && hotel.rooms[0].cancel_penalties[0].end
                    ? $t('763')
                    : ''
                }}
              </UBadge>
              <UBadge v-else color="red" size="sm" class="!text-nowrap"
                ><i class="fa-light fa-money-bill-transfer w-[20px]"></i>
                {{ t('179') }}
              </UBadge>
            </div>
          </div>
        </div>
        <div class="mt-1 flex flex-col justify-end items-end">
          <div v-if="hotel.rooms[0]" class="ms-auto mb-2">
            <div
              v-if="hotel.rooms[0].promotions.description"
              class="flex items-center text-xs gap-1 p-1 rounded bg-yellow-400"
            >
              <i class="fa-regular fa-tag w-4"></i>
              <p class="text-black">
                {{ hotel.rooms[0].promotions.description }}
              </p>
            </div>
          </div>
          <UBadge
            v-if="hotel?.rooms[0]?.hotel_status == 'stop'"
            color="red"
            variant="solid"
            class="mb-2 capitalize"
          >
            {{ $t('497').toLowerCase() }}
          </UBadge>
          <div class="flex items-center gap-1">
            <del
              v-if="hotel.rooms[0].promotions.description"
              class="text-[#AAAAAA] text-[14px] transition-200"
            >
              {{ formatNumber(Math.ceil(hotel.rooms[0]?.old_price)) }}
              {{ hotelResponse.search_params.currency }}
            </del>
            <b class="block text-[19px] transition-200">
              {{
                formatNumber(Math.ceil(hotel?.rooms[0]?.price_info_.b2c_total))
              }}
              {{ hotelResponse.search_params.currency }}
            </b>
          </div>
          <p class="text-xs">
            {{
              $t('839', {
                days: dayjs(hotelResponse?.search_params?.end_date).diff(
                  dayjs(hotelResponse?.search_params?.begin_date),
                  'days',
                ),
              })
            }}
          </p>
          <p class="text-xs font-bold">
            {{
              $t('838', {
                price:
                  formatNumber(Math.ceil(hotel?.rooms[0]?.night_price)) +
                  ' ' +
                  hotelResponse.search_params.currency,
              })
            }}
          </p>
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
          <p class="font-bold text-[16px]">{{ hotel.content.name }}</p>
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
            :alt="hotel.content.name"
            class="object-cover img w-full h-full rounded-[8px_0_0_8px] md:!rounded-[8px_0_0_8px]"
          />
        </div>
        <div
          class="border rounded-md sticky -bottom-4 z-10 bg-white p-4 pb-8 -mx-4 mt-4"
        >
          <NuxtLinkLocale
            :to="{ path: `/hotels/${hotel.code}`, query: queries }"
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

import type { IHotel, IHotelResponse, IHotelSingle } from '@/types/hotel'
import { formatNumber } from '@/utils'
import { useApi } from '~/composables/useApi'

interface Props {
  hotel: IHotel
  hotelResponse: IHotelResponse
  loading: boolean
}
const cookieStore = useCookieStore()
const props = defineProps<Props>()
const { t, locale } = useI18n()
const route = useRoute()
const queries = computed(() => {
  return {
    type: 'hotel',
    begin_date: props.hotelResponse?.search_params?.begin_date,
    end_date: props.hotelResponse.search_params?.end_date,
    adult: props.hotelResponse.search_params?.adult,
    child_age: props.hotelResponse.search_params?.chd.join(','),
    location_id: route.query?.location_id,
    product_id: 2,
    currency: props.hotelResponse.search_params?.currency,
    referal_loc_type: route.query?.loc_type,
    transfer: route.query.transfer,
  }
})

const dialog = ref(false)
const single: Ref<IHotelSingle | null> = ref(null)

function getHotelSingle(id: string, type: string) {
  return new Promise((resolve, reject) => {
    useApi()
      .$get<IHotelSingle>('/v1/hotel/get-hotel', {
        params: {
          hotel_id: id,
          type: type?.toLowerCase(),
          lang: useCookie('locale').value ?? 'ru',
          currency: useCookie('currency').value ?? 'USD',
        },
      })
      .then((res) => {
        single.value = res
        resolve(res)
      })
      .catch((err) => reject(err))
  })
}
const openGallery = async () => {
  try {
    dialog.value = true
    await getHotelSingle(props.hotel.code, 'hotel')
  } catch (err) {
    console.log(err)
  }
}
const onSaveFavourite = () => {
  cookieStore.saveFavouritesData({
    code: props.hotel?.code,
    stars: props.hotel?.content?.stars,
    address: props.hotel?.content?.address?.city,
    name: props.hotel?.content?.name,
    image: props.hotel?.images?.[0],
  })
}
cookieStore.getFavourites()
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style.scss';

.card-wrapper {
  border-radius: 8px;
  height: min-content;
  background: #fff;

  .img-wrapper {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .hotel-wrap {
    .hotel-name {
      @include common-text-style(18px, 600, 22px);
    }

    .city-name {
      @include common-text-style(16px, 500, normal);
    }

    .info {
      @include common-text-style(14px, 600, normal);
    }

    .tag-name {
      @include common-text-style(12px, 500, normal);
    }
  }
}

@media screen and (max-width: 768px) {
  .card-wrapper {
    max-height: 100%;
  }
}

.custom-rate {
  display: flex;
  align-items: center;
}

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
