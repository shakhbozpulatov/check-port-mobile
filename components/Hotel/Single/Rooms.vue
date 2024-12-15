<template>
  <div v-if="rooms" id="price-scroll" class="hotel-wrap mb-3">
    <div class="mb-3">
      <h3 class="card-title">{{ $t('114') }}</h3>
    </div>
    <div v-if="rooms?.rooms?.length">
      <HotelSingleRoomsCard
        v-for="(elem, index) in rooms.rooms"
        :key="index + 'rooms'"
        :data="elem"
        :code="rooms.code"
        :hotel="hotel"
      />
    </div>
    <div v-if="!rooms?.rooms?.length && !loading">
      <div class="alert alert-danger text-center" role="alert">
        <i class="fa-regular fa-circle-xmark"></i> {{ $t('459') }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IHotelSingle, ISingleRooms } from '@/types/hotel'

interface Props {
  rooms: ISingleRooms
  loading: boolean
  hotel: IHotelSingle
}
defineProps<Props>()
</script>
