<template>
  <div>
    <UIPassengerCountError v-if="totalPassengers >= 21" :count="21" />
    <div>
      <div class="flex items-center justify-between gap-3 mb-2">
        <div>
          <h6 class="text-[12px] font-bolder text-[#333] m-0">
            {{ t('57') }}
          </h6>
          <p class="text-xs font-bolder text-[#333333a8] m-0">
            {{ t('308') }}
          </p>
        </div>
        <div class="min-w-[30px]">
          <UICountInput
            v-model="form.adult"
            :min="minCount"
            :max="21"
            class="w-full"
            :disabled="totalPassengers >= 21"
          />
        </div>
      </div>
      <div v-for="(el, i) in child" :key="i" class="child-item">
        <div class="flex items-center justify-between">
          <p class="text-black">{{ el.label }}</p>
          <i
            class="fa-solid fa-trash-can text-red-500"
            @click="deleteChild(i)"
          ></i>
        </div>
      </div>

      <div class="mt-3">
        <label hidden for="child" class="mb-1 text-[12px]-sm"></label>
        <select
          id="child"
          v-model="selectedChild"
          :disabled="totalPassengers >= 21"
          class="w-full text-[14px] border-[1px] rounded-[1rem] p-3 h-[48px] outline-none"
          @change="chooseChild"
        >
          <option :value="null" selected disabled>{{ t('109') }}</option>
          <option v-for="(item, i) in children(t)" :key="i" :value="item">
            {{ item.label }}
          </option>
        </select>
      </div>
      <div v-if="isClass" class="mt-3">
        <URadioGroup
          v-if="isClass"
          v-model="form.class"
          class="direction"
          :options="classOptions(t)"
        >
        </URadioGroup>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { ArrowDown, Delete } from '@element-plus/icons-vue'
import type { Ref } from 'vue'
import { onMounted, ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'

import { children, classOptions } from '@/assets/data'
import type { ITourSearch } from '@/types/tour'

interface Props {
  form: ITourSearch
  disabled?: boolean
  isClass?: boolean
  minCount: number
}
interface IChild {
  value: string
  label: string
}
const props = defineProps<Props>()
const form = unref(props.form)
const { t } = useI18n()
const selectedChild: Ref<IChild | null> = ref(null)
const child = ref<IChild[]>([])
const totalPassengers = computed(() => form.adult + form.child_age.length)
const chooseChild = () => {
  if (!selectedChild.value) return
  form.child_age.push(selectedChild.value.value)
  child.value.push(selectedChild.value)
  selectedChild.value = null
}
const deleteChild = (i: number) => {
  form.child_age.splice(i, 1)
  child.value.splice(i, 1)
}
onMounted(() => {
  child.value = children(t).filter((el) => form.child_age.includes(el.value))
})
</script>
