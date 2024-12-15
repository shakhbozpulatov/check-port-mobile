<template>
  <div>
    <div
      class="h-12 relative py-2.5 px-4 flex items-center justify-between bg-white border"
      :class="[mainClass]"
      @click="inputDialog = true"
    >
      <p v-if="!selectedItem" class="text-sm text-greyscale-400">
        {{ placeholder }}
      </p>
      <p v-else class="text-sm text-greyscale-900">
        {{ selectedItem }}
      </p>
      <slot name="icon"></slot>
    </div>
    <MbscPopup
      :is-open="inputDialog"
      display="bottom"
      theme-variant="light"
      full-screen
      scroll-lock
      css-class="search-input-modal"
      theme="material"
      @open="onModalOpen"
      @close="inputDialog = false"
      @destroy="onClosed"
    >
      <div class="min-h-screen h-full flex flex-col pb-10">
        <div class="flex mb-3 justify-end mt-12">
          <UButton
            size="sm"
            color="white"
            variant="ghost"
            @click="inputDialog = false"
          >
            <i class="fa-solid fa-xmark text-[16px]"></i>
          </UButton>
        </div>
        <div class="relative flex items-center">
          <i class="fa-sharp fa-light fa-magnifying-glass absolute left-4"></i>
          <i
            v-if="value"
            class="fa-sharp fa-solid fa-xmark absolute right-4"
            @click="clearResults"
          ></i>
          <input
            ref="searchInput"
            v-model="value"
            :placeholder="placeholder"
            class="w-full px-12 py-4 rounded-2xl border border-greyscale-200 focus:!border-primary focus-visible:!border-primary"
            @input="onSearchAirports"
          />
        </div>
        <div class="mt-6 grow overflow-auto mb-10">
          <template v-if="histories?.length && !value">
            <p class="font-bold text-sm">{{ $t('832') }}</p>
            <div
              v-for="(history, index) in histories"
              :key="index"
              class="flex items-center justify-between w-full px-2 py-1.5 border-b border-b-greyscale-200 last:!border-0"
              @click="selectItem(history)"
            >
              <div class="flex items-center gap-2 py-1">
                <div
                  v-if="history.type === 'city'"
                  class="flex items-center gap-2"
                >
                  <span class="w-6"
                    ><i class="fa-solid fa-location-dot"></i
                  ></span>
                  <div>
                    <p class="text-sm text-greyscale-900 font-bold">
                      {{ history.name }}
                    </p>
                    <span class="text-xs text-greyscale-500">{{
                      history.country_name
                    }}</span>
                  </div>
                </div>
                <div
                  v-if="history.type === 'airport'"
                  class="flex items-center gap-2"
                >
                  <i class="fa-sharp fa-solid fa-plane-departure mr-2"></i>
                  <div>
                    <p class="text-sm text-greyscale-900 font-bold">
                      {{ history.name }}
                    </p>
                    <span class="text-xs text-greyscale-500">{{
                      history.country_name
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="!airports?.length && !value.length">
            <p class="font-bold text-sm mt-4">{{ $t('charters') }}</p>
            <transition-group name="slide-left">
              <div
                v-for="(item, index) in defaultOptions"
                :key="index"
                @click="selectItem(item, true)"
              >
                <div
                  class="flex items-center justify-between w-full px-2 py-2.5 border-b border-b-greyscale-200"
                >
                  <div class="flex items-center gap-2 py-1">
                    <div
                      v-if="item.type === 'city'"
                      class="flex items-center gap-2"
                    >
                      <span class="w-6"
                        ><i class="fa-solid fa-location-dot"></i
                      ></span>
                      <div>
                        <p class="text-sm text-greyscale-900 font-bold">
                          {{ $t(item.label) }}
                        </p>
                      </div>
                    </div>
                    <div
                      v-if="item.type === 'airport'"
                      class="flex items-center gap-2"
                    >
                      <i class="fa-sharp fa-solid fa-plane-departure mr-2"></i>
                      <div>
                        <p class="text-sm text-greyscale-900 font-bold">
                          {{ $t(item.label) }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </template>
          <template v-else-if="airports?.length">
            <transition-group name="slide-left">
              <div
                v-for="(item, index) in airports"
                :key="index"
                @click="selectItem(item)"
              >
                <div
                  class="flex items-center justify-between w-full px-2 py-2.5 border-b border-b-greyscale-200"
                >
                  <div class="flex items-center gap-2 py-1">
                    <div
                      v-if="item.type === 'city'"
                      class="flex items-center gap-2"
                    >
                      <span class="w-6"
                        ><i class="fa-solid fa-location-dot"></i
                      ></span>
                      <div>
                        <p class="text-sm text-greyscale-900 font-bold">
                          {{ item.name }} ({{ item.code }} -
                          {{ item.main_airport_name }})
                        </p>
                        <span class="text-xs text-greyscale-500">{{
                          item.country_name
                        }}</span>
                      </div>
                    </div>
                    <div
                      v-if="item.type === 'airport'"
                      class="flex items-center gap-2"
                    >
                      <i class="fa-sharp fa-solid fa-plane-departure mr-2"></i>
                      <div>
                        <p class="text-sm text-greyscale-900 font-bold">
                          {{ item.name }} ({{ item.code }} -
                          {{ item.city_name }})
                        </p>
                        <span class="text-xs text-greyscale-500">{{
                          item.country_name
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </template>
          <template v-else>
            <div class="flex items-center flex-col justify-center mt-10">
              <i class="fa-solid fa-magnifying-glass text-3xl"></i>
              <p class="text-sm text-greyscale-900 font-semibold mt-5">
                Search by city or airport
              </p>
            </div>
          </template>
        </div>
      </div>
    </MbscPopup>
  </div>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'

interface Props {
  placeholder?: string
  selectedItem: string
  defaultOptions: IAirportSearch[]
  histories: IAirportSearch[]
  mainClass?: string
}
defineProps<Props>()
import type { IAirportSearch } from '~/types'
const { t } = useI18n()
const emit = defineEmits<{
  (e: 'on-select', val: IAirportSearch): void
}>()
const store = useDashboardStore()

const airports = computed(() => store.airports)

const inputDialog = ref(false)
const searchInput = ref(null)
const value = ref('')
const onModalOpen = () => {
  setTimeout(() => {
    searchInput.value?.focus()
    store.airports = []
  }, 500)
}

const onSearchAirports = async (e: Event) => {
  try {
    debounce('airports', () => {
      store.getAirports(e.target?.value)
    })
  } catch (err) {
    console.log(err)
  }
}
const selectItem = (item: IAirportSearch, e?: boolean) => {
  if (e) {
    const data = {
      code: item.value,
      name: t(item.label),
      type: item.type,
    }
    emit('on-select', data)
  } else {
    emit('on-select', item)
  }

  clearResults()
  inputDialog.value = false
}
const clearResults = () => {
  value.value = ''
  store.airports = []
}
const onClosed = () => {
  store.airports = []
}
</script>
<style>
.search-input-modal .mbsc-popup-content {
  overflow: hidden !important;
}
</style>
