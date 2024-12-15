<template>
  <div class="">
    <UIHeader>
      {{ single?.content?.name }}
    </UIHeader>
    <HotelSingleMainInfo v-if="single" :hotel="single" />
    <div class="container">
      <HotelSkeletonRoomsLoading v-if="roomsLoading" />
      <template v-else>
        <HotelSingleSearch
          :form="roomsData"
          :rooms="singleRooms"
          @on-search="onRoomsSearch"
        />
        <HotelSingleRooms
          :rooms="singleRooms"
          :loading="roomsLoading"
          :hotel="single"
        />
      </template>
      <div
        v-if="
          single &&
          single?.content?.geolocation?.longitude &&
          single?.content?.geolocation?.latitude
        "
        class="hotel-wrap mb-5 transition-200"
      >
        <h3 class="mb-2 card-title transition-200">
          {{ t('286') }}
        </h3>
        <p class="mb-3 transition-200">
          <span v-if="single?.data?.address.city">{{
            single?.data?.address.city
          }}</span>
          <span v-if="single?.data?.address.state_province_name"
            >, {{ single?.data?.address.state_province_name }}</span
          >
          <span v-if="single?.data?.address.postal_code"
            >, {{ single?.data?.address.postal_code }}</span
          >
        </p>
        <div
          v-if="
            single.content.geolocation.longitude &&
            single.content.geolocation.latitude
          "
          id="map"
          class="map"
        >
          <LazyUIGMaps
            :center="{
              latitude: single.content.geolocation.latitude,
              longitude: single.content.geolocation.longitude,
            }"
            :locations="hotelLocations"
          />
        </div>
      </div>
      <div
        v-if="
          single &&
          (single?.data.checkin?.instructions ||
            single?.data.checkin?.special_instructions ||
            single?.data?.checkin?.begin_time ||
            single?.data?.checkout?.time ||
            single?.data.checkin?.special_instructions ||
            single?.data?.fees?.mandatory ||
            single?.data?.policies?.know_before_you_go)
        "
        class="hotel-wrap mb-8 transition-200"
      >
        <div class="card-title mb-3 transition-200">
          {{ t('259') }}
        </div>
        <div
          v-if="single?.data?.checkin?.begin_time"
          class="flex items-center gap-2"
        >
          <p class="transition-200">
            <strong>{{ $t('797') }}:</strong>
            {{ single?.data?.checkin?.begin_time || '-' }}
          </p>
        </div>
        <div
          v-if="single?.data?.checkout?.time"
          class="flex items-center gap-2"
        >
          <p class="transition-200">
            <strong>{{ $t('798') }}:</strong>
            {{ single?.data?.checkout?.time || '-' }}
          </p>
        </div>
        <div v-if="single?.data.checkin?.instructions" class="transition-200">
          <p>
            <strong>{{ $t('799') }}:</strong>
          </p>
          <div v-html="single?.data.checkin?.instructions"></div>
        </div>
        <hr v-if="single?.data.checkin?.special_instructions" class="my-3" />
        <div
          v-if="single?.data.checkin?.special_instructions"
          class="transition-200"
        >
          <p>
            <strong>{{ $t('800') }}:</strong>
          </p>
          <div v-html="single?.data.checkin?.special_instructions"></div>
        </div>
        <hr v-if="single?.data?.fees?.mandatory" class="my-3" />
        <div v-if="single?.data?.fees?.mandatory" class="transition-200">
          <p>
            <strong>{{ $t('801') }}</strong>
          </p>
          <p>
            <strong>{{ $t('802') }}:</strong>
          </p>
          <div class="mb-3" v-html="single?.data?.fees?.mandatory"></div>
          <hr class="my-3" />
        </div>

        <div
          v-if="single?.data?.policies?.know_before_you_go"
          class="transition-200"
        >
          <p>
            <strong>{{ $t('803') }}</strong>
          </p>
          <div
            class="mb-3"
            v-html="single?.data?.policies?.know_before_you_go"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { GoogleMap, Marker } from 'vue3-google-map'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const store = useHotelStore()
const additionalData = useCookie('additional_data')
const single = computed(() => store.single)

const hotelLocations = computed(() => {
  return store.single?.radius_hotels?.map((item) => {
    return {
      geolocation: item.geolocation,
      id: item.id,
      image: item.image?.links?.['350px']?.href,
      name: item.name,
      stars: item.stars,
    }
  })
})
const singleRooms = computed(() => store.singleRooms)
const roomsLoading = ref(false)
const loading = ref(true)
const roomsData = reactive({
  hotel_id: route.params.id as string,
  begin_date: (route.query.begin_date as string) || '',
  end_date: (route.query.end_date as string) || '',
  currency: useCookie('currency').value ?? 'USD',
  adult: route.query.adult ? Number(route.query.adult) : 1,
  child_age: [] as string[],
  product_id: 2,
  type: (route.query.type as string) ?? 'hotel',
  referal_loc_type: route.query.referal_loc_type as string,
  lang: locale.value ?? 'ru',
  transfer: (route.query.transfer as string) ?? '',
  insurance: 'no',
})
const onRoomsSearch = async () => {
  await router.replace({
    query: {
      ...route.query,
      adult: roomsData.adult,
      child_age: roomsData.child_age?.join(','),
      end_date: dayjs(roomsData.end_date).format('YYYY-MM-DD'),
      begin_date: dayjs(roomsData.begin_date).format('YYYY-MM-DD'),
      transfer: roomsData.transfer,
      insurance: roomsData.insurance,
    },
  })
  try {
    loading.value = false
    roomsLoading.value = true
    if (roomsData.begin_date && roomsData.end_date) {
      await store.fetchHotelRooms(roomsData, route.query?.location_id)
      roomsData.transfer =
        singleRooms.value?.additional_service?.[0]?.value?.find(
          (el) => el?.default === 1,
        )?.code
    }
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
    roomsLoading.value = false
  }
}

if (route.query?.child_age) {
  if (route.query?.child_age === '[]') {
    roomsData.child_age = []
  } else {
    roomsData.child_age = route.query?.child_age?.split(',')
  }
}
const { data } = await useAsyncData(async () => {
  try {
    return await store.getHotelSingle(
      route.params.id as string,
      route.query.type as string,
    )
  } catch (err) {
    console.log(err)
  }
})
const getFirstThreeNames = (obj) => {
  return Object.values(obj || {})
    .slice(0, 3)
    .map((item) => item?.name)
}

const firstThreeNames = computed(() =>
  getFirstThreeNames(data.value?.data?.amenities),
)

useSeoMeta({
  title: t('773', {
    hotel: data.value?.content?.name,
    stars: data.value?.content?.stars,
    city: data.value?.data?.address?.city,
  }),
  ogTitle: t('773', {
    hotel: data.value?.content?.name,
    stars: data.value?.content?.stars,
    city: data.value?.data?.address?.city,
  }),
  description: t('774', {
    hotel: data.value?.content?.name,
    stars: data.value?.content?.stars,
    city: data.value?.data?.address?.city,
    quality1: firstThreeNames.value[0],
    quality2: firstThreeNames.value[1],
    quality3: firstThreeNames.value[2],
    price: singleRooms.value?.rooms[0]?.rates[0]?.price,
  }),
  ogDescription: t('774', {
    hotel: data.value?.content?.name,
    stars: data.value?.content?.stars,
    city: data.value?.data?.address?.city,
    quality1: firstThreeNames.value[0],
    quality2: firstThreeNames.value[1],
    quality3: firstThreeNames.value[2],
    price: singleRooms.value?.rooms[0]?.rates[0]?.price,
  }),
  ogImage: () => data.value?.images?.[0]?.links['1000px']?.href,
})
const initiator = async () => {
  try {
    if (Object.keys(route.query)?.length) {
      loading.value = false
      roomsLoading.value = true
      if (roomsData.begin_date && roomsData.end_date) {
        await store.fetchHotelRooms(roomsData, route.query?.location_id)
        roomsData.transfer =
          singleRooms.value?.additional_service?.[0]?.value?.find(
            (el) => el?.default === 1,
          )?.code
      } else {
        store.singleRooms = null
      }
    }
  } catch (err) {
    console.log(err)
  } finally {
    roomsLoading.value = false
  }
}
const onSaveFavourite = () => {
  const data = {
    history: additionalData.value?.history || [],
  }
  const ind = data.history?.findIndex(
    (el) => el?.code == single.value?.content?.code,
  )
  if (ind === -1) {
    if (data.history?.length >= 5) {
      data.history.shift()
    }
    data.history.push({
      code: single.value?.content?.code,
      stars: single.value?.content?.stars,
      address: single.value?.data?.address?.city,
      name: single.value?.content?.name,
      image: single.value?.images?.[0]?.links?.['1000px']?.href,
    })
  }
  additionalData.value = JSON.stringify({
    favs: additionalData.value?.favs,
    history: data.history,
  })
}
onMounted(() => {
  onSaveFavourite()
  console.log(single.value)
})
initiator()
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style.scss';
.hotel-wrap {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
  padding: 20px;
  .rooms-images {
    @include common-text-style(12px, 400, normal);
    color: #333;
    background-color: #fff;
    border-radius: 6px;
  }
  .hotel-images {
    border-radius: 10px;
    background: rgba(243, 243, 243, 0.76);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.07);
    overflow: hidden;
    height: 246px;
    width: 100%;
  }
  .img {
    object-fit: cover;
  }
  .rate-wrap {
    padding: 8px 12px;
    .rate-text {
      @include common-text-style(18px, 500, normal);
    }
  }
  .comment {
    @include common-text-style(16px, 500, normal);
    margin-top: 20px;
  }

  .pas-menu-btn {
    padding: 24px 10px;
    font-size: 16px;
    font-weight: 400;
  }
  .hotel-name {
    @include common-text-style(24px, 600, normal);
    margin-bottom: 4px;
  }
  .location {
    @include common-text-style(14px, 400, normal);
  }
  .dotted {
    width: 4px;
    height: 4px;
    background: #666;
    border-radius: 50%;
  }

  .input-item {
    .label-text {
      @include common-text-style(12px, 500, normal);
      color: #494949;
    }
  }
  .title-name {
    @include common-text-style(28px, 600, 30px);
    margin: 12px 0;
  }
  .location {
    @include common-text-style(13px, 500, normal);
  }
  .desc {
    @include common-text-style(14px, 500, 20px);
  }
  .card-title {
    @include common-text-style(20px, 600, normal);
  }
  .card-text {
    @include common-text-style(14px, 400, normal);
  }
  .direction-text {
    @include common-text-style(16px, 600, normal);
  }
  .date {
    @include common-text-style(16px, 600, normal);
    color: #3392ff;
  }
  .time {
    @include common-text-style(16px, 400, normal);
  }

  .hotel-card {
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.09);
    background: rgba(255, 255, 255);
    overflow: hidden;
    .img-wrap {
      width: 180px;
      height: 140px;
      .img {
        height: 100%;
        width: 100%;
      }
    }
    .name-room {
      @include common-text-style(20px, 600, normal);
    }
    .text-room {
      @include common-text-style(14px, 400, normal);
      color: rgba(0, 0, 0, 0.67);
      margin-top: 4px;
      margin-bottom: 20px;
    }
    .hotel-items {
      @include common-text-style(14px, 500, normal);
    }
    .price {
      @include common-text-style(25px, 500, normal);
    }
    .price-desc {
      @include common-text-style(10px, 400, normal);
      color: rgba(0, 0, 0, 0.7);
    }
    .price-text {
      @include common-text-style(14px, 500, normal);
      color: #55ba3c;
    }
    .best {
      background: rgba(85, 186, 60, 0.14);
    }
  }
}
.search-bar {
  margin: 20px 0;
  padding: 20px;
  border-radius: 10px;
  background: rgba(51, 146, 255, 0.18);
}

@media screen and (max-width: 768px) {
  .hotel-card .img-wrap {
    width: 100% !important;
  }
}

.debug-border:not(:last-child) .border-d {
  border-bottom: 1px dashed gray;
}
</style>
