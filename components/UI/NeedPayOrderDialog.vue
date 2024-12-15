<template>
  <UModal
    v-model="layoutStore.bookError"
    :title="$t('782')"
    :ui="{
      width:
        width < 768 ? 'sm:max-w-full md:!w-[80%]' : 'sm:max-w-full md:!w-[50%]',
    }"
    @close="clearNeedPayOrder"
  >
    <UCard>
      <template #header>
        <div class="flex justify-between gap-3 items-center">
          <p>{{ $t('806') }}</p>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="layoutStore.bookError = false"
          />
        </div>
      </template>
      <div v-if="errorData">
        <div class="border rounded grid grid-cols-2 md:grid-cols-1">
          <div
            class="grid text-center grid-cols-1 md:grid-cols-4 border-r md:border-b"
          >
            <span class="border-b md:border-r p-1">{{ $t('195') }}</span>
            <span class="border-b md:border-r p-1">{{ $t('90') }}</span>
            <span class="border-b md:border-r p-1">{{ $t('362') }}</span>
            <span class="p-1">{{ $t('332') }}</span>
          </div>
          <div class="grid text-center md:grid-cols-4 grid-cols-1">
            <span class="border-b md:border-r p-1">
              <a
                :href="`/${locale}/orders/${
                  errorData.type === 'flight'
                    ? 'avia'
                    : errorData.type === 'hotel'
                      ? 'hotel'
                      : errorData.type === 'tour'
                        ? 'tour'
                        : errorData.type === 'transfer'
                          ? 'transfer'
                          : errorData.type === 'service'
                            ? 'service'
                            : errorData.type === 'penalty'
                              ? 'penalty'
                              : ''
                }/${errorData.order_id}`"
              >
                <UBadge color="primary">
                  {{ errorData.order_id }}
                </UBadge>
              </a>
            </span>
            <span class="border-b md:border-r p-1">{{
              dayjs(errorData.date).format('DD.MM.YYYY HH:mm')
            }}</span>
            <span class="border-b md:border-r p-1"
              >{{ errorData.price }} USD</span
            >
            <span class="p-1">
              <UBadge color="primary">{{
                statusNeedPayOrderT[errorData.product_id - 1]
              }}</UBadge>
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="mt-3 block">
          <sup class="text-red-500">*</sup> {{ $t('807') }}
        </span>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const layoutStore = useLayoutStore()
const statusNeedPayOrderT = ref(statusNeedPayOrder(t))
const { width } = useWindowSize()

const emit = defineEmits<{
  (e: 'on-need-pay-orders', value: []): void
  (e: 'on-loading', value: boolean): void
  (e: 'on-agreement', value: boolean): void
}>()

defineProps<{ errorData: any }>()

const clearNeedPayOrder = () => {
  emit('on-loading', false)
  emit('on-need-pay-orders', [])
  emit('on-agreement', false)
}
</script>
