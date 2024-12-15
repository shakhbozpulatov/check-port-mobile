<template>
  <div>
    <div
      class="border border-greyscale-300 bg-white rounded-lg w-full py-3 pr-11 pl-3 text-sm"
      @click="inputDialog = true"
    >
      <div
        v-if="modelValue?.length"
        class="truncate flex items-center gap-3 flex-wrap"
      >
        <UBadge
          v-for="(item, index) in modelValue"
          :key="index"
          variant="subtle"
          color="gray"
          class="relative"
          >{{ item?.name }}
          <span class="ml-3" @click="removeHotelName(index)"
            ><i
              class="fa-solid fa-circle-x transition-200 hover:text-red-500 cursor-pointer"
            ></i
          ></span>
        </UBadge>
      </div>
      <span v-else>{{ $t('253') }}</span>
    </div>
    <MbscPopup
      :is-open="inputDialog"
      display="bottom"
      theme-variant="light"
      full-screen
      scroll-lock
      css-class="search-input-modal"
      close-on-overlay-click
      theme="material"
      :buttons="[
        {
          text: 'Удалить выбранные отели',
          handler: onClear,
          cssClass:
            '!w-full !bg-red-500 !text-white !normal-case !text-[14px]  h-[48px] !rounded-[1rem] !mb-4',
          disabled: modelValue.length < 2,
        },
        {
          text: 'Ok',
          handler: onSearch,
          cssClass:
            '!w-full !bg-primary !text-white !text-[14px] h-[48px] !capitalize !rounded-[1rem]',
          disabled: !modelValue.length,
        },
      ]"
      @open="onModalOpen"
      @close="inputDialog = false"
    >
      <div
        class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto mt-10"
        @click="inputDialog = false"
      ></div>
      <div class="flex mb-3 justify-between items-center">
        <p class="font-bold text-[16px]">{{ $t('837') }}</p>
        <UButton
          size="sm"
          color="white"
          class="rounded-[1rem]"
          variant="ghost"
          @click="inputDialog = false"
        >
          <i class="fa-solid fa-xmark text-[16px]"></i>
        </UButton>
      </div>
      <hr class="mb-5" />
      <div class="min-h-[80vh] h-full flex flex-col pb-[150px]">
        <div
          v-if="modelValue?.length"
          class="text-sm mb-4 flex items-center gap-3 flex-wrap"
        >
          <UBadge
            v-for="(item, index) in modelValue"
            :key="index"
            variant="subtle"
            color="gray"
            class="relative"
            >{{ item?.name }}
            <span class="ml-3" @click="removeHotelName(index)"
              ><i
                class="fa-solid fa-circle-x transition-200 hover:text-red-500 cursor-pointer"
              ></i
            ></span>
          </UBadge>
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
            :placeholder="$t('253')"
            class="w-full px-12 py-4 rounded-2xl border border-greyscale-200 focus:!border-primary focus-visible:!border-primary"
            @input="remoteMethod"
          />
        </div>
        <div class="mt-6 grow overflow-auto mb-10">
          <ul>
            <TransitionGroup name="slide-left" mode="out-in">
              <li
                v-for="(item, index) in options"
                :key="index"
                class="py-2.5 text-sm font-semibold border-b border-b-greyscale-200 last:border-b-0"
                @click="onSelectItem(item)"
              >
                <div class="flex items-center justify-between gap-3">
                  {{ item.name }}
                  <i
                    v-if="selectedValues.includes(item.code)"
                    class="fa-light fa-check"
                  ></i>
                </div>
              </li>
            </TransitionGroup>
          </ul>
        </div>
      </div>
    </MbscPopup>
  </div>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'

interface ListItem {
  code: string
  name: string
}
interface Props {
  modelValue: ListItem[]
  list: ListItem[]
}
const props = defineProps<Props>()

const { t } = useI18n()
const emit = defineEmits<{
  (e: 'update:modelValue', val: ListItem[]): void
  (e: 'on-search'): void
}>()
const store = useDashboardStore()

const options = ref<ListItem[]>([])
const inputDialog = ref(false)
const searchInput = ref(null)
const value = ref('')
const onModalOpen = () => {
  setTimeout(() => {
    searchInput.value?.focus()
  }, 500)
}

const selectedValues = computed(() => props.modelValue.map((el) => el.code))

const remoteMethod = (query: Event) => {
  if (query) {
    if (!props.list) return
    options.value = props.list.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(query.target?.value?.toLowerCase())
    })
  } else {
    options.value = []
  }
}
const onSelectItem = (item: ListItem) => {
  const selectedItems = props.modelValue
  const index = selectedItems.findIndex((el) => el.code === item.code)
  if (index > -1) {
    selectedItems.splice(index, 1)
  }
  selectedItems.push(item)
  emit('update:modelValue', selectedItems)
}
const removeHotelName = (index: number) => {
  const selectedItems = props.modelValue
  if (index > -1) {
    selectedItems.splice(index, 1)
  }
  emit('update:modelValue', selectedItems)
  if (!selectedItems.length) {
    inputDialog.value = false
    emit('on-search')
  }
}
const clearResults = () => {
  value.value = ''
  store.airports = []
}
const onClear = () => {
  emit('update:modelValue', [])
  emit('on-search')
  inputDialog.value = false
}
const onSearch = () => {
  emit('on-search')
  inputDialog.value = false
}
</script>
<style>
.search-input-modal .mbsc-popup-content {
  overflow: hidden !important;
}
</style>
