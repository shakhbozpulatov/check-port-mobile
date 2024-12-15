<template>
  <div ref="target" class="w-full h-full relative autocomplete">
    <div
      class="autocomplete__wrapper bg-white flex items-center w-full h-full"
      @click="isOpen = !isOpen"
      @mouseenter="focused = true"
      @mouseleave="focused = false"
    >
      <slot name="prefix" />
      <input
        type="text"
        :value="modelValue"
        autocomplete="new password"
        :placeholder="placeholder"
        class="w-full h-full outline-none border-none md:py-1.5 py-3.5 px-[20px] text-[14px] text-[#606266] rounded-[4px]"
        @focus="$emit('on-focus')"
        @input="onInputChange"
      />
      <slot name="suffix">
        <div
          v-if="modelValue && focused"
          class="px-1.5"
          @click="$emit('update:modelValue', '')"
        >
          <i
            class="fa-sharp fa-regular fa-circle-xmark text-gray-400 cursor-pointer transition-200 hover:text-red-500"
          ></i>
        </div>
      </slot>
    </div>
    <Transition name="select" mode="out-in">
      <div
        v-if="isOpen"
        :class="{ '!min-h-fit': options.length <= 4 }"
        class="absolute drop-shadow-md bg-white py-2 mt-1.5 w-full rounded-[4px] z-10 min-w-[280px] min-h-[180px]"
      >
        <Transition name="fade" mode="out-in">
          <div :key="loading + 'loader'">
            <div v-if="loading" style="padding: 0 8px">
              <USkeleton
                v-for="(item, index) in 5"
                :key="index"
                style="
                  width: 100%;
                  height: 32px;
                  border-radius: 6px;
                  margin-right: -2px;
                "
              />
            </div>
            <ul
              v-else
              class="autocomplete__dropdown max-h-[280px] transition-200 md:overflow-y-hidden overflow-y-auto hover:!overflow-y-auto overflow-x-hidden"
            >
              <li
                v-for="(item, index) in options"
                :key="index + 'item'"
                class="px-2"
              >
                <template v-if="item.hasOwnProperty('list')">
                  <div
                    class="px-3 py-2 bg-[#D8E9FE] text-[#1351D6] font-medium"
                  >
                    <p class="text-[12px]">{{ item.title }}</p>
                  </div>
                  <ul>
                    <li
                      v-for="(el, ind) in item.list"
                      :key="ind + 'option'"
                      :class="{
                        '!bg-blue-100/40':
                          selectedOption?.[valueKey] === el?.[valueKey],
                      }"
                      class="px-2.5 py-2.5 transition-200 hover:bg-blue-100/40 cursor-pointer"
                      @click="onHandleSelect(el)"
                    >
                      <div class="flex items-center gap-2">
                        <!--                        <el-icon-->
                        <!--                          v-if="el.type === 'hotel'"-->
                        <!--                          size="22px"-->
                        <!--                          color="#0073FF"-->
                        <!--                          ><OfficeBuilding-->
                        <!--                        /></el-icon>-->
                        <!--                        <el-icon-->
                        <!--                          v-if="-->
                        <!--                            el.type === 'city' ||-->
                        <!--                            el.type === 'province_state' ||-->
                        <!--                            el.type === 'country'-->
                        <!--                          "-->
                        <!--                          size="22px"-->
                        <!--                          color="#0073FF"-->
                        <!--                          ><Location-->
                        <!--                        /></el-icon>-->
                        <i
                          v-if="el.type === 'airport'"
                          class="fa-regular fa-plane-departure text-[#0073FF]"
                        ></i>
                        <div class="flex justify-center flex-col">
                          <span class="text-[14px] text-dark">{{
                            el[labelKey]
                          }}</span>
                          <span class="text-[14px] text-gray-400">{{
                            el[subKey]
                          }}</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <div
                    :class="{
                      '!bg-blue-100/40':
                        selectedOption?.[valueKey] === item?.[valueKey],
                    }"
                    class="px-2.5 py-2 transition-200 hover:bg-blue-100/40 cursor-pointer"
                    @click="onHandleSelect(item)"
                  >
                    <div class="flex items-center gap-2">
                      <!--                      <el-icon-->
                      <!--                        v-if="item.type === 'hotel'"-->
                      <!--                        size="22px"-->
                      <!--                        color="#0073FF"-->
                      <!--                        ><OfficeBuilding-->
                      <!--                      /></el-icon>-->
                      <!--                      <el-icon-->
                      <!--                        v-if="-->
                      <!--                          item.type === 'city' ||-->
                      <!--                          item.type === 'province_state' ||-->
                      <!--                          item.type === 'country'-->
                      <!--                        "-->
                      <!--                        size="22px"-->
                      <!--                        color="#0073FF"-->
                      <!--                        ><Location-->
                      <!--                      /></el-icon>-->
                      <i
                        v-if="item.type === 'airport'"
                        class="fa-regular fa-plane-departure text-[#0073FF]"
                      ></i>
                      <div class="flex justify-center flex-col">
                        <span class="text-[14px] text-dark">{{
                          item[labelKey]
                        }}</span>
                        <span class="text-[14px] text-gray-400">{{
                          item[subKey]
                        }}</span>
                      </div>
                    </div>
                  </div>
                </template>
              </li>
              <li
                v-if="!options?.length"
                class="px-3 py-2 text-gray-500 text-center text-[12px] font-medium"
              >
                {{ $t('460') }}
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
interface Props {
  modelValue: string
  placeholder: string
  valueKey: string
  labelKey: string
  subKey: string
  options: any[]
  selectedOption: any
  loading: boolean
}
const props = defineProps<Props>()
const $emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'on-select', val: any): void
  (e: 'on-focus'): void
}>()
const target = ref(null)
const isOpen = ref(false)
const focused = ref(false)
onClickOutside(target, (event) => {
  isOpen.value = false
})
const onHandleSelect = (el) => {
  $emit('on-select', el)
  isOpen.value = false
}
// const onFocus = () => {
//   $emit('on-focus')
//   isOpen.value = true
// }
const onInputChange = (e) => {
  $emit('update:modelValue', e.target?.value)
  isOpen.value = true
}
</script>
<style lang="scss">
.autocomplete {
  &__wrapper {
    border-radius: 4px;
    border: 1px solid #c0c4cc70;
    transition: 0.2s ease-in-out;
    &:focus-within {
      border: 1px solid #409eff !important;
    }
    &:hover {
      border: 1px solid #c0c4cc;
    }
  }
  &__dropdown {
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbcbcb;
      border-radius: 5px;
      opacity: 0 !important;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #ccc7c7;
      opacity: 1;
    }
  }
}
</style>
