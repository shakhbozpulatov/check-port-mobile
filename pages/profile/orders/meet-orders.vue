<template>
  <!--  <div></div>-->
  <div>
    <ProfileTableSkeleton v-if="loading" />
    <div
      v-if="items"
      class="bg-white dark:bg-dark-700 p-4 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] rounded-lg"
    >
      <div class="flex flex-wrap justify-between items-center">
        <UInput
          v-model="searchValue"
          class="*:h-[48px] *:rounded-[1rem] mb-2 md:!w-[300px] flex items-center justify-end"
          :placeholder="$t('253')"
        />
        <div class="gap-2 flex items-center">
          <UButton class="mb-2" @click="typeStatusOrder = 'all'">
            {{ $t('739') }}
          </UButton>
          <UButton class="mb-2" color="red" @click="typeStatusOrder = 4">
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
          'checkin',
          'status_pay',
          'price_usd',
          'passengers',
          'comment',
        ]"
        :search-value="searchValue"
      >
        <template #header-provider_id>
          <UIDropdown>
            <template #header>
              <div
                class="flex items-center gap-2 cursor-pointer dark:text-white-100 text-[12px] text-[#373737]"
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
                class="flex items-center gap-2 cursor-pointer dark:text-white-100 text-[12px] text-[#373737]"
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
                class="alt_select"
                :options="statuses"
                option-attribute="label"
              />
            </template>
          </UIDropdown>
        </template>
        <template #header-status_pay>
          <UIDropdown>
            <template #header>
              <div
                class="flex items-center gap-2 cursor-pointer dark:text-white-100 text-[12px] text-[#373737]"
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
          <NuxtLinkLocale :to="`/orders/service/${data.id}`">
            <UBadge type="primary" class="cursor-pointer" :label="data.id" />
          </NuxtLinkLocale>
        </template>
        <template #item-checkin="data">
          {{ dayjs(data.checkin).format('DD.MM.YYYY hh:mm') }}
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

    <!--    <div class="flex justify-center mt-3 mb-[32px]">-->
    <!--      <UPagination-->
    <!--        v-model="pageNumber"-->
    <!--        :page-count="allOrders?.meta.perPage"-->
    <!--        :total="allOrders?.meta.totalCount"-->
    <!--        @update:model-value="handleCurrentPage"-->
    <!--      />-->
    <!--    </div>-->
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
const allOrders = ref([])
const filteredItems = ref([])
const loading = ref(true)
const searchValue = ref('')
const pageNumber = ref(1)
const headers: Header[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: t('90'), value: 'checkin', sortable: true },
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
const dateTime = (date) => {
  return new Date(date).getTime()
}
const items = computed(
  ():
    | {
        price_usd: number | undefined
        status_pay: number | undefined
        provider_id: number | undefined
        checkin: number | string
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
        checkin: item.data?.checkin,
        status_pay: item?.data?.status_pay,
        price_usd: item?.data?.price_usd,
        passengers: computed(() => {
          return item?.data?.largeOrderPassengers.map((el: any) => {
            return `${el.passenger.first_name} ${el.passenger.last_name}`
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
    if (value == 'all') filteredItems.value = allOrders.value
    if (value == 1) {
      filteredItems.value = allOrders.value?.filter(
        (item) => item.data.provider_id == 1,
      )
    }
    if (value != 1 && value !== 'all') {
      filteredItems.value = allOrders.value.filter(
        (item) => item.data.provider_id != 1,
      )
    }
  },
)
watch(
  () => typeStatusOrder.value,
  (value) => {
    if (value == 'all') {
      filteredItems.value = allOrders.value.filter(
        (item) => item.data.status != 4,
      )
    } else {
      if (value == 3) {
        filteredItems.value = allOrders.value.filter(
          (item) => item.data.status == 3 || item.data.status == 2,
        )
      } else {
        filteredItems.value = allOrders.value.filter(
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
      filteredItems.value = allOrders.value
    } else {
      filteredItems.value = allOrders.value.filter(
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
    allOrders.value = await useApi().$get('/v1/service/orders', {
      params: {
        sort: '-id',
        page: page,
        include: 'largeOrderPassengers.passenger',
      },
    })
    console.log('allorders', allOrders.value)
    filteredItems.value = allOrders.value.filter(
      (item) => item?.data.status !== 4,
    )
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
<style scoped lang="scss"></style>
