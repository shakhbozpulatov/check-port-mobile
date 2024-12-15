<template>
  <div>
    <div
      class="h-12 relative py-2.5 px-4 flex items-center justify-between bg-white border"
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
      full-screen
      scroll-lock
      css-class="search-input-modal"
      close-on-overlay-click
      theme-variant="light"
      theme="material"
      @open="onModalOpen"
      @close="onClose"
    >
      <div class="min-h-screen h-full flex flex-col pb-10 mt-14">
        <div class="flex mb-3 justify-end">
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
            @input="onSearchDirections"
          />
        </div>
        <div class="mt-6 grow overflow-auto mb-10">
          <template v-if="directions?.length">
            <transition-group name="slide-left">
              <template v-for="(item, index) in directions" :key="index">
                <div v-if="item?.type !== 'AIRPORT'" @click="selectItem(item)">
                  <div
                    class="flex items-center justify-between w-full px-2 py-2.5 border-b border-b-greyscale-200"
                  >
                    <div class="flex items-center gap-2 py-1 w-full">
                      <div class="flex items-center gap-2">
                        <span class="w-6"
                          ><i class="fa-solid fa-location-dot"></i
                        ></span>
                        <div>
                          <p class="text-sm text-greyscale-900 font-bold">
                            {{ item.name }}
                          </p>
                          <div
                            class="text-xs text-greyscale-500"
                            v-html="item.displayName"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </transition-group>
          </template>
          <template v-else>
            <div class="flex items-center flex-col justify-center">
              <p class="text-lg font-bold text-left w-full border-b pb-1 mb-1">
                {{ $t('177') }}
              </p>
              <div
                v-for="(item, index) in defaultOptions"
                :key="index"
                class="w-full"
              >
                <ul>
                  <li
                    v-for="(el, ind) in item.list"
                    :key="ind + 'option'"
                    class="flex items-center justify-between w-full px-2 py-2.5 border-b border-b-greyscale-200"
                  >
                    <div
                      class="flex items-center gap-2 py-1 w-full"
                      @click="selectItem(el)"
                    >
                      <i
                        v-if="el.type === 'airport'"
                        class="fa-sharp fa-solid fa-plane-departure mr-2"
                      ></i>
                      <div class="flex justify-center flex-col">
                        <span class="text-sm text-greyscale-900 font-bold">{{
                          el?.name
                        }}</span>
                        <span class="text-xs text-greyscale-500">
                          {{ item.title }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </div>
      </div>
    </MbscPopup>
  </div>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'

import type { IAirportSearch } from '~/types'
import type { IDefaultAirportList } from '~/types/tour'

interface Props {
  placeholder?: string
  selectedItem: string
  defaultOptions: IDefaultAirportList[]
  hotelSearch?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-select', val: IAirportSearch): void
}>()
const store = useDashboardStore()

const directions = computed(() => store.directions)

const inputDialog = ref(false)
const searchInput = ref(null)
const value = ref('')
const onModalOpen = () => {
  setTimeout(() => {
    searchInput.value?.focus()
  }, 500)
}

const onSearchDirections = async (e: Event) => {
  if (value.value?.length < 2) return
  try {
    debounce('direction', () => {
      store.getDirections(e.target?.value, 'city')
    })
  } catch (err) {
    console.log(err)
  }
}

const selectItem = (item: IAirportSearch) => {
  emit('on-select', item)
  clearResults()
  inputDialog.value = false
}
const clearResults = () => {
  value.value = ''
  store.directions = []
}
const onClose = () => {
  inputDialog.value = false
  store.directions = []
}
</script>
<style>
.search-input-modal .mbsc-popup-content {
  overflow: hidden !important;
}
</style>
