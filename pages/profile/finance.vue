<template>
  <div>
    <UIHeader without-image>
      {{ $t('358') }}
    </UIHeader>
    <div class="container mt-32">
      <div class="grid grid-cols-12 gap-3">
        <h1 class="text-center col-span-12 mb-4 h5 text-uppercase">
          {{ $t('321') }}
        </h1>
        <div class="grid col-span-6 md:col-span-2">
          <div class="pt-3 pb-3 px-4 shadow-md rounded bg-white mb-3">
            <div class="flex justify-between items-center">
              <h6 class="letter mb-0">USD</h6>
              <h6 class="mb-0">
                <b>{{ formatNumber(transactions?.data?.balance) }}</b>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full p-3 bg-white rounded shadow-md">
        <UInput
          v-model="searchValue"
          size="large"
          class="mb-2 md:!w-[300px] *:h-[48px] *:rounded-[1rem] flex items-center justify-end"
          :placeholder="$t('253')"
        />
        <Vue3EasyDataTable
          v-if="transactions?.data?.data"
          :headers="headers"
          :items="transactions?.data?.data"
          :search-value="searchValue"
          :search-field="[
            'id',
            'sum_usd',
            'date',
            'created_by',
            'comment',
            'dds',
          ]"
        >
          <template #item-sum_usd="data">
            <p :class="data?.sum_usd > 0 ? 'text-green-600' : 'text-red-600'">
              {{ formatNumber(data?.sum_usd) }}
            </p>
          </template>
          <template #item-type_code="data">
            <span v-if="data?.type_code === 5">
              Оплата заказа {{ data?.id }}
            </span>
            <span v-if="data?.type_code === 8">
              Оплата тура {{ data?.id }}
            </span>
            <span v-if="data?.type_code === 12"> Возврат </span>
          </template>
        </Vue3EasyDataTable>
      </div>
    </div>
  </div>
</template>
<script setup>
import 'vue3-easy-data-table/dist/style.css'

import dayjs from 'dayjs'
import Vue3EasyDataTable from 'vue3-easy-data-table'

import { formatNumber } from '@/utils/index'
definePageMeta({
  middleware: 'auth-required',
})
const transactions = ref({})

const loading = ref(true)
const page = ref(1)
const headers = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Сумма, USD', value: 'sum_usd', sortable: true },
  { text: 'Дата', value: 'date' },
  { text: 'Кассир', value: 'created_by' },
  { text: 'Комментарий', value: 'comment' },
  { text: 'Тип', value: 'type_code', sortable: true },
  { text: 'ДДС', value: 'dds', sortable: true },
]
const searchValue = ref('')
const getTransactions = async (page) => {
  loading.value = true
  try {
    transactions.value = await useApi().$get(
      `/v1/transaction?page=${page}&sort=-id&include=dateFormat,cashRegister,typeFormat,wallet,amountFormat`,
    )
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
getTransactions(page.value)
</script>

<style>
.table-header {
  background-color: gray !important;
  color: white;
  font-size: 12px;
  font-weight: normal !important;
  text-align: center !important;
}

.table-row td {
  text-align: center !important;
}
</style>
