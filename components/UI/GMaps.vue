<template>
  <div>
    <GoogleMap
      v-if="center.longitude && center.latitude"
      api-key="AIzaSyAfabJ9_mgkZ2moKXh2jS4P43NnPpjh-fc"
      map-id="9d2255aa1d3714c5"
      style="width: 100%; height: 600px"
      :center="{
        lat: center.latitude,
        lng: center.longitude,
      }"
      :zoom="13"
    >
      <MarkerCluster>
        <template v-for="(location, i) in locations" :key="i">
          <Marker
            v-if="
              location.geolocation?.latitude && location.geolocation?.longitude
            "
            :options="{
              position: {
                lat: location.geolocation?.latitude,
                lng: location.geolocation?.longitude,
              },
            }"
          >
            <InfoWindow class="relative">
              <div id="content" class="!w-[190px] md:!w-[300px]">
                <div id="siteNotice"></div>
                <h1 id="firstHeading" class="firstHeading"></h1>
                <div id="bodyContent">
                  <div class="flex flex-col gap-2">
                    <img
                      :src="location?.image"
                      :alt="location?.name"
                      class="w-full md:w-[300px] h-[100px] md:!h-[150px] object-cover rounded-lg"
                    />
                    <div class="flex flex-col">
                      <template v-if="!isNaN(location?.stars)">
                        <div class="flex gap-2 mb-2">
                          <i
                            v-for="n in 5"
                            :key="n"
                            :class="[
                              'fa-star !text-[18px]',
                              n <= Number(location?.stars)
                                ? 'fa-solid !text-[#ffcc00]'
                                : 'fa-regular !text-[#ccc]',
                            ]"
                          ></i>
                        </div>
                      </template>
                      <h2 class="m-0 text-sm font-semibold">
                        {{ location?.name }}
                      </h2>
                      <p class="text-sm font-semibold text-right">
                        {{ location.price }} {{ location.currency }}
                      </p>
                      <NuxtLinkLocale
                        :to="{
                          path: `/hotels/${location?.id}`,
                          query: {
                            type: 'hotel',
                          },
                        }"
                        class="w-full bg-[#0073ff] text-[15px] text-white rounded-2xl flex items-center justify-center h-[28px] mt-3"
                      >
                        {{ $t('250') }}
                      </NuxtLinkLocale>
                    </div>
                  </div>
                </div>
              </div>
            </InfoWindow>
          </Marker>
        </template>
        <CustomMarker
          v-if="user.lng && user.lat"
          :options="{
            position: user,
          }"
        >
          <div style="text-align: center">
            <i
              class="fa-solid fa-location-crosshairs text-3xl text-blue-600"
            ></i>
          </div>
        </CustomMarker>
      </MarkerCluster>
    </GoogleMap>
  </div>
</template>
<script setup lang="ts">
import {
  CustomMarker,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerCluster,
} from 'vue3-google-map'
interface Props {
  locations: {
    geolocation: {
      latitude: number
      longitude: number
    }
    id: string
    image: string
    name: string
    stars: string | number
    address: { line_1: string; city: string; country_code: string }
    price: number | string
    currency: string
  }[]
  center: {
    latitude: number
    longitude: number
  }
}
defineProps<Props>()

const user = ref({
  lat: 0,
  lng: 0,
})
onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        user.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      },
      (error) => {
        console.error('Error fetching location: ', error)
      },
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
})
</script>
