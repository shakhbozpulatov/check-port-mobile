<template>
  <div>
    <UIHeader>
      {{ singleData?.content?.name }}
    </UIHeader>
    <TourSingleDetail v-if="singleData" :data="singleData" />
    <div class="container">
      <TourSingleRoomsLoading v-if="roomsLoading" />
      <template v-else>
        <TourSingleFlights
          v-if="singleData"
          :data="singleTourRooms"
          :loading="roomsLoading"
        />
        <TourSingleSearch
          v-if="singleData"
          :transfers="singleTourRooms?.additional_service?.[0]?.value"
          :loading="roomsLoading"
          @on-search="onSearchRooms"
        />
        <TourSingleRooms
          v-if="singleData"
          :data="singleTourRooms"
          :single-data="singleData"
          :loading="roomsLoading"
          @on-late_checkin="onLateCheckin"
        />
      </template>
      <div
        v-if="
          singleData &&
          singleData?.content?.geolocation?.longitude &&
          singleData?.content?.geolocation?.latitude
        "
        id="map"
        class="hotel-wrap mb-5 transition-200"
      >
        <h3 class="mb-2 card-title transition-200">
          {{ $t('286') }}
        </h3>
        <p class="mb-3 transition-200">
          <span v-if="singleData?.data?.address.city">{{
            singleData?.data?.address.city
          }}</span>
          <span v-if="singleData?.data?.address.state_province_name"
            >, {{ singleData?.data?.address.state_province_name }}</span
          >
          <span v-if="singleData?.data?.address.postal_code"
            >, {{ singleData?.data?.address.postal_code }}</span
          >
        </p>
        <GoogleMap
          api-key="AIzaSyAfabJ9_mgkZ2moKXh2jS4P43NnPpjh-fc"
          style="width: 100%; height: 500px"
          :center="{
            lat: singleData?.content?.geolocation?.latitude,
            lng: singleData?.content?.geolocation?.longitude,
          }"
          :zoom="15"
        >
          <Marker
            :options="{
              position: {
                lat: singleData?.content?.geolocation?.latitude,
                lng: singleData?.content?.geolocation?.longitude,
              },
            }"
          />
        </GoogleMap>
      </div>
      <div
        v-if="
          singleData &&
          (singleData?.data.checkin?.instructions ||
            singleData?.data.checkin?.special_instructions ||
            singleData?.data?.checkin?.begin_time ||
            singleData?.data?.checkout?.time ||
            singleData?.data.checkin?.special_instructions ||
            singleData?.data?.fees?.mandatory ||
            singleData?.data?.policies?.know_before_you_go)
        "
        class="hotel-wrap transition-200"
      >
        <div class="card-title mb-3 transition-200">
          {{ t('259') }}
        </div>
        <div
          v-if="singleData.data?.checkin.begin_time"
          class="gap-2 transition-200"
        >
          <p>
            <strong>{{ $t('797') }}:</strong>
            {{ singleData.data?.checkin.begin_time }}
          </p>
        </div>
        <div v-if="singleData.data?.checkout.time" class="gap-2 transition-200">
          <p>
            <strong>{{ $t('798') }}:</strong>
            {{ singleData.data?.checkout.time }}
          </p>
        </div>
        <div
          v-if="singleData.data?.checkin.instructions"
          class="gap-3 transition-200"
        >
          <p>
            <strong>{{ $t('799') }}:</strong>
          </p>
          <div v-html="singleData.data?.checkin.instructions"></div>
        </div>
        <hr v-if="singleData.data?.checkin.special_instructions" class="my-3" />
        <div
          v-if="singleData.data?.checkin.special_instructions"
          class="gap-3 transition-200"
        >
          <p>
            <strong>{{ $t('800') }}:</strong>
          </p>
          <div v-html="singleData.data?.checkin.special_instructions"></div>
        </div>
        <hr v-if="singleData.data?.fees?.mandatory" class="my-3" />
        <div v-if="singleData.data?.fees?.mandatory" class="transition-200">
          <p>
            <strong>{{ $t('801') }}</strong>
          </p>
          <p>
            <strong>{{ $t('802') }}:</strong>
          </p>
          <div class="mb-3" v-html="singleData.data?.fees?.mandatory"></div>
          <hr class="my-3" />
        </div>

        <div
          v-if="singleData?.data?.policies?.know_before_you_go"
          class="transition-200"
        >
          <p>
            <strong>{{ $t('803') }}</strong>
          </p>
          <div
            class="mb-3"
            v-html="singleData?.data?.policies?.know_before_you_go"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { GoogleMap, Marker } from 'vue3-google-map'

// import HotelRoomCardPreloader from '~/components/UI/HotelRoomCardPreloader.vue'

const router = useRouter()
const route = useRoute()

const store = useTourStore()
const { locale, t } = useI18n()
const loading = ref(true)
const roomsLoading = ref(false)

const singleData = computed(() => store.singleData)
const singleTourRooms = computed(() => store.singleTourRooms)

const roomsParams = computed(() => {
  return {
    request_id: route.query.request_id,
    hotel_id: route.params.id,
    referal_loc_type: route.query.referal_loc_type,
    transfer: route.query.transfer,
    adult: route.query.adult,
    child_age: route.query.child
      ? String(route.query.child)?.split(',')
      : undefined,
    begin_date: route.query.begin_date,
    end_date: route.query.end_date,
    currency: route.query.currency,
    lang: locale.value,
    search_mode: 'mix',
    search_type: route.query?.search_type,
    ex_late_checkin: route.query?.ex_late_checkin,
    location_id: route.query?.location_id,
    // class: route.query?.class ?? "E",
  }
})
const onSearchRooms = async (form) => {
  roomsLoading.value = true
  await router.replace({
    query: {
      ...route.query,
      adult: form.adult,
      child: form.child_age?.join(','),
      end_date: dayjs(form.dates[1]).format('YYYY-MM-DD'),
      begin_date: dayjs(form.dates[0]).format('YYYY-MM-DD'),
      search_type: 'reset',
      transfer: form.transfer,
      class: form.class,
    },
  })
  console.log(form)
  try {
    await store.getTourRooms(roomsParams.value)
  } catch (err) {
    console.log(err)
  } finally {
    roomsLoading.value = false
  }
}
const onLateCheckin = async (num: number) => {
  roomsLoading.value = true
  const data = {
    ...roomsParams.value,
    ex_late_checkin: num,
  }
  await store.getTourRooms(data)
  roomsLoading.value = false
}

await useAsyncData(() =>
  store.getTourSingle(route.params.id as string, 'hotel'),
)
loading.value = false
useSeoMeta({
  title: t('775', {
    hotel: singleData.value?.content?.name,
    stars: singleData.value?.content?.stars,
    city: singleData.value?.data?.address?.city,
  }),
  ogTitle: t('775', {
    hotel: singleData.value?.content?.name,
    stars: singleData.value?.content?.stars,
    city: singleData.value?.data?.address?.city,
  }),
  description: t('776', {
    hotel: singleData.value?.content?.name,
    stars: singleData.value?.content?.stars,
    city: singleData.value?.data?.address?.city,
  }),
  ogDescription: t('776', {
    hotel: singleData.value?.content?.name,
    stars: singleData.value?.content?.stars,
    city: singleData.value?.data?.address?.city,
  }),
  ogImage: singleData.value?.images?.[0]?.links['1000px']?.href,
})
Promise.allSettled([store.getTourRooms(roomsParams.value)])
  .catch((err) => console.log(err))
  .finally(() => (roomsLoading.value = false))
</script>

<style lang="scss">
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
    border-radius: 10px;
    overflow: hidden;
    .img-wrap {
      width: 100%;
      height: 100%;
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
.avia-img {
  width: 100px !important;
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
