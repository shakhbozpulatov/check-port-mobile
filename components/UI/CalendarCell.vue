<template>
  <div
    class="date-box flex items-center justify-center flex-col relative"
    :class="{
      'charter-return': isReturn,
      charter: isCharter,
    }"
  >
    <p
      class="date !text-[12px] absolute leading-[12px]"
      :class="isCharter || isReturn || isDohaCharter ? '!top-[2px]' : ''"
    >
      {{ cell.day }}
    </p>
    <template v-if="isDohaCharter && isDirectionDoha">
      <img
        v-if="icon && isDoha"
        :src="icon"
        alt=""
        class="w-3 rounded-full absolute"
      />
      <span
        v-if="isDoha && isDohaCharter"
        class="!text-[8px] absolute !leading-3 text-center md:left-[12px] left-1"
        :class="icon ? 'md:bottom-[6px] bottom-[-6px]' : 'bottom-[4px]'"
      >
        {{ t('367') }}
        <el-icon
          v-if="isDohaRt"
          class="absolute md:left-[-50%] left-[-5%] md:bottom-[-8px] bottom-[2px] text-[8px]"
          ><Back
        /></el-icon>
        <el-icon
          v-if="isDohaOn"
          class="absolute md:left-[-50%] left-[-5%] md:bottom-[-8px] bottom-[2px]"
          ><Right
        /></el-icon>
      </span>
    </template>
    <template v-else-if="isCharter || isReturn">
      <img
        v-if="icon"
        :src="icon"
        alt=""
        class="w-4 rounded-full absolute top-[14px]"
        :class="isCharter && isReturn ? 'mt-1' : ''"
      />
      <span
        class="!text-[8px] absolute !leading-3"
        :class="icon ? 'bottom-[4px]' : 'bottom-[4px]'"
      >
        <template v-if="isDoha"> {{ t('367') }} </template>
        <template v-else-if="type === 'charter'">
          {{ t('367') }}
        </template>
        <template v-else-if="isCharter && isReturn"> </template>
        <template v-else>
          {{ isCharter ? t('340') : t('204') }}
        </template>
      </span>
    </template>
    <div
      v-if="nightsCount"
      class="custom-tooltip absolute px-1.5 py-1.5 min-w-16 -top-10 rounded-md bg-gray-700 border text-xs text-white flex flex-col items-center justify-center"
    >
      {{ t('500', { count: nightsCount }) }}
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
interface Props {
  isCharter?: boolean
  isReturn?: boolean
  cell: {
    day: number
    date: Date
  }
  nightsCount: number
  type?: string
  icon?: string
  isDoha?: boolean
  isDohaCharter?: boolean
  isDohaOn?: boolean
  isDohaRt?: boolean
  isJune?: boolean
  isDirectionDoha?: boolean
}
defineProps<Props>()
</script>
