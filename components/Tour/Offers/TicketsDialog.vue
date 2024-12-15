<template>
  <UModal
    :model-value="show"
    :title="t('40')"
    align-center
    :fullscreen="width < 768"
    :ui="{ width: 'sm:max-w-full md:!w-[70%]', wrapper: 'z-[200]' }"
    @close="$emit('on-close')"
    @opened="isModalOpen = true"
  >
    <div class="flex items-center justify-between gap-3 mb-3 p-3">
      <h3 class="h3">{{ $t('40') }}</h3>
      <UButton
        size="sm"
        color="white"
        class="rounded-[1rem]"
        variant="outline"
        @click="$emit('on-close')"
      >
        <i class="fa-solid fa-xmark"></i>
      </UButton>
    </div>
    <div class="tickets grid grid-cols-12 gap-3 p-3 text-black">
      <div
        class="md:col-span-3 col-span-12 mt-3 p-[30px_20px] shadow-[0_3px_8px_rgba(0,0,0,0.24)] rounded-2xl h-fit"
      >
        <TourOffersTicketFilter />
      </div>
      <div class="md:col-span-9 col-span-12 py-3">
        <TourOffersTicket
          :data="store.chosenTicket"
          class="shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
        />
        <template v-if="!store.ticketsFilterLoader">
          <AsyncTicket
            v-for="(item, index) in tickets.data"
            :key="'tickets' + index"
            :data="item"
            class="shadow-[0_3px_8px_rgba(0,0,0,0.24)]"
            @on-change-ticket="$emit('on-change-ticket'), $emit('on-close')"
          />
        </template>
        <template v-if="store.ticketsFilterLoader">
          <CTicketLoader v-for="item in 10" :key="item" />
        </template>
      </div>
    </div>
  </UModal>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import CTicketLoader from '@/components/Tour/Offers/TicketLoader.vue'

const { t } = useI18n()
const { width } = useWindowSize()
const store = useTourStore()
const AsyncTicket = defineAsyncComponent({
  loader: () => import('@/components/Tour/Offers/Ticket.vue'),
  delay: 0,
  timeout: 3000,
  errorComponent: CTicketLoader,
  loadingComponent: CTicketLoader,
})

const tickets = computed(() => store.tourAviaTickets)

const $emit = defineEmits<{
  (e: 'on-close'): void
  (e: 'on-change-ticket'): void
}>()
interface Props {
  show: boolean
}
defineProps<Props>()

const isModalOpen = ref(false)
</script>
