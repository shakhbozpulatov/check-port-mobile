<template>
  <div>
    <ProfileTableSkeleton v-if="loading" />
    <div
      v-if="items"
      class="bg-white p-4 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] rounded-lg flex flex-col justify-end items-end"
    >
      <UButton
        class="rounded-[1rem] my-3"
        @click="
          tableFilter == true ? (tableFilter = false) : (tableFilter = true)
        "
        ><i class="fa-sharp fa-light fa-filter-list"></i
      ></UButton>
      <div
        v-if="tableFilter"
        class="flex flex-wrap justify-between items-center"
      >
        <UInput
          v-model="searchValue"
          class="*:h-[48px] *:rounded-[1rem] mb-2 w-full flex items-center justify-end"
          :placeholder="$t('253')"
        />
        <div class="gap-2 grid grid-cols-2">
          <UButton
            class="mb-2 flex items-center justify-center rounded-2xl"
            @click="typeStatusOrder = 'all'"
          >
            {{ $t('739') }}
          </UButton>
          <UButton
            class="mb-2 flex items-center justify-center rounded-2xl"
            color="red"
            @click="typeStatusOrder = 4"
          >
            {{ $t('738') }}
          </UButton>
        </div>
      </div>
      <EasyDataTable
        :headers="headers"
        :items="items"
        :search-field="[
          'id',
          'status',
          'created_at',
          'status_pay',
          'price_usd',
          'passengers',
          'comment',
        ]"
        :search-value="searchValue"
        class="w-full rounded-2xl overflow-hidden"
      >
        <template #header-provider_id>
          <UIDropdown>
            <template #header>
              <div
                class="flex items-center gap-2 cursor-pointer text-[12px] text-[#373737]"
              >
                <i class="fa-regular fa-filter"></i>
                <p>{{ t('366') }}</p>
              </div>
            </template>

            <template #content>
              <USelect
                v-model="typeProvider"
                :placeholder="t('73')"
                style="width: 140px"
                :options="providers"
                class="alt_select"
                option-attribute="label"
              />
            </template>
          </UIDropdown>
        </template>
        <template #header-status>
          <UIDropdown>
            <template #header>
              <div
                class="flex items-center gap-2 cursor-pointer text-[12px] text-[#373737]"
              >
                <i class="fa-regular fa-filter"></i>
                <p>{{ t('310') }}</p>
              </div>
            </template>

            <template #content>
              <USelect
                v-model="typeStatusOrder"
                :placeholder="t('73')"
                style="width: 140px"
                :options="statuses"
                class="alt_select"
                option-attribute="label"
              />
            </template>
          </UIDropdown>
        </template>
        <template #header-status_pay>
          <UIDropdown>
            <template #header>
              <div
                class="flex items-center gap-2 cursor-pointer text-[12px] text-[#373737]"
              >
                <i class="fa-regular fa-filter"></i>
                <p>{{ t('310') }}</p>
              </div>
            </template>

            <template #content>
              <USelect
                v-model="statusPayment"
                :placeholder="t('73')"
                style="width: 140px"
                class="alt_select"
                :options="allPaymentStatuses"
                option-attribute="label"
              />
            </template>
          </UIDropdown>
        </template>
        <template #item-id="data">
          <NuxtLinkLocale :to="`/orders/avia/${data.id}`">
            <UBadge type="primary" class="cursor-pointer" :label="data.id" />
          </NuxtLinkLocale>
        </template>
        <template #item-created_at="data">
          {{ dayjs.unix(data.created_at).format('DD.MM.YYYY') }}
        </template>
        <template #item-provider_id="data">
          <p v-if="data?.provider_id == 1">{{ t('367') }}</p>
          <p v-else>{{ t('287') }}</p>
        </template>
        <template #item-status="data">
          <UBadge class="font-medium" :color="statusColor[data?.status]">{{
            statusOrderT[data?.status]
          }}</UBadge>
        </template>
        <template #item-status_pay="data">
          <UBadge
            v-if="data.status_pay == 0"
            class="font-medium"
            variant="solid"
            color="red"
            >{{ statusPaymantT[data.status_pay] }}</UBadge
          >
          <UBadge
            v-if="data.status_pay == 1"
            class="font-medium"
            variant="solid"
            color="green"
            >{{ statusPaymantT[data?.status_pay] }}</UBadge
          >
          <UBadge
            v-if="data.status_pay == 2"
            class="font-medium"
            variant="solid"
            color="orange"
            >{{ statusPaymantT[data?.status_pay] }}</UBadge
          >
          <UBadge
            v-if="data.status_pay == 3"
            class="font-medium"
            variant="solid"
            color="lime"
            >{{ statusPaymantT[data.status_pay] }}</UBadge
          >
        </template>
        <template #item-price_usd="data">
          <p>
            {{ data?.price_usd }}
            <sup>USD</sup>
          </p>
        </template>
        <template #item-passengers="data">
          <div v-html="data.passengers"></div>
        </template>
      </EasyDataTable>
    </div>

    <div class="flex justify-center mt-3 mb-[32px]">
      <UPagination
        v-model="pageNumber"
        :page-count="allOrders?.meta.perPage"
        :total="allOrders?.meta.totalCount"
        @update:model-value="handleCurrentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue3-easy-data-table/dist/style.css'

import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Header } from 'vue3-easy-data-table'

import type { IAviaOrders } from '~/types/avia'
import { statusColor, statusOrderAvia, statusPaymant } from '~/utils'

const { t } = useI18n()
const statusOrderT = ref(statusOrderAvia(t))
const statusPaymantT = ref(statusPaymant(t))
const allOrders: Ref<IAviaOrders | undefined> = ref(null)
const filteredItems: Ref<IAviaOrders['data'] | undefined> = ref(null)
const loading = ref(true)
const searchValue = ref('')
const pageNumber = ref(1)
const tableFilter = ref(false)
const headers: Header[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: t('90'), value: 'created_at', sortable: true },
  { text: t('366'), value: 'provider_id' },
  { text: t('310'), value: 'status' },
  { text: t('311'), value: 'status_pay' },
  { text: t('362'), value: 'price_usd', sortable: true },
  { text: t('241'), value: 'passengers', sortable: true },
  { text: t('150'), value: 'comment', sortable: true },
]
const typeProvider = ref('all')
const providers = [
  { value: 'all', label: t('446') },
  { value: 1, label: t('367') },
  { value: 'regular', label: t('287') },
]
const typeStatusOrder: Ref<string | number> = ref('all')
const statuses = [
  { value: 'all', label: t('66') },
  { value: 0, label: t('469') },
  { value: 1, label: t('470') },
  { value: 3, label: t('471') },
  { value: 4, label: t('473') },
  { value: 5, label: t('517') },
]
const statusPayment = ref('all')
const allPaymentStatuses = [
  { value: 'all', label: t('446') },
  { value: 0, label: t('180') },
  { value: 1, label: t('217') },
  { value: 2, label: t('60') },
]

// const user = computed(() => authStore.user?.data);
const dateTime = (date) => {
  return new Date(date).getTime()
}
const items = computed(
  ():
    | {
        price_usd: number | undefined
        status_pay: number | undefined
        provider_id: number | undefined
        created_at: number | string
        comment: string | null | undefined
        id: number
        status: number | undefined
        passengers: number | undefined
      }[]
    | undefined => {
    return filteredItems.value?.map((item) => {
      return {
        id: item.data.id,
        status: item.data?.status,
        provider_id: item.data?.provider_id,
        created_at: dateTime(item.data?.created_at),
        status_pay: item?.data?.status_pay,
        price_usd: item?.data?.price_usd,
        passengers: computed(() => {
          return item?.data?.passengers.map((el: any) => {
            return `${el.first_name} ${el.last_name}`
          })
        }).value?.join(', <br>'),
        comment: item?.data?.comment,
      }
    })
  },
)

watch(
  () => typeProvider.value,
  (value) => {
    if (value == 'all') filteredItems.value = allOrders.value?.data
    if (value == 1) {
      filteredItems.value = allOrders.value?.data.filter(
        (item) => item.data.provider_id == 1,
      )
    }
    if (value != 1 && value !== 'all') {
      filteredItems.value = allOrders.value?.data.filter(
        (item) => item.data.provider_id != 1,
      )
    }
  },
)
watch(
  () => typeStatusOrder.value,
  (value) => {
    if (value == 'all') {
      filteredItems.value = allOrders.value?.data.filter(
        (item) => item.data.status != 4,
      )
    } else {
      if (value == 3) {
        filteredItems.value = allOrders.value?.data.filter(
          (item) => item.data.status == 3 || item.data.status == 2,
        )
      } else {
        filteredItems.value = allOrders.value?.data.filter(
          (item) => item.data.status == value,
        )
      }
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
watch(
  () => statusPayment.value,
  (value) => {
    if (value == 'all') {
      filteredItems.value = allOrders.value?.data
    } else {
      filteredItems.value = allOrders.value?.data.filter(
        (item) => item.data.status_pay == value,
      )
    }
  },
  {
    immediate: true,
    deep: true,
  },
)

const ordersList = async (page: number) => {
  try {
    loading.value = true
    const res = await useApi().$get('/v1/flight/order', {
      params: {
        sort: '-id',
        page: page,
        include: 'passengers',
      },
    })
    allOrders.value = res
    filteredItems.value = res?.data?.filter((item) => item.data.status !== 4)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
const handleCurrentPage = (newPage: number) => {
  pageNumber.value = newPage
  ordersList(pageNumber.value)
}

onMounted(async () => {
  await ordersList(pageNumber.value)
})
</script>
