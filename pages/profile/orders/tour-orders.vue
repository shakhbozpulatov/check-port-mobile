<template>
  <div>
    <ProfileTableSkeleton v-if="loading" />
    <ClientOnly>
      <div
        v-if="items"
        class="bg-white p-4 shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)] rounded-lg"
      >
        <div class="flex items-end justify-between flex-col">
          <UButton
            class="rounded-[1rem] my-3"
            @click="
              tableFilter == true ? (tableFilter = false) : (tableFilter = true)
            "
            ><i class="fa-sharp fa-light fa-filter-list"></i
          ></UButton>
          <div
            v-if="tableFilter"
            class="flex items-end justify-between flex-wrap"
          >
            <UInput
              v-model="searchValue"
              size="lg"
              class="*:h-[48px] *:rounded-[1rem] mb-2 w-full flex items-center justify-end"
              :placeholder="$t('253')"
            />
            <div class="gap-2 grid grid-cols-1 w-full mb-3">
              <div class="flex flex-col mb-2">
                <label class="text-xs" for="from">{{ $t('94') }}</label>
                <VueDatePicker
                  v-model="from"
                  placeholder="dd.mm.yyyy"
                  format="dd.MM.yyyy"
                  class="w-full md:!w-[200px]"
                ></VueDatePicker>
              </div>
              <div class="flex flex-col mb-2">
                <label class="text-xs" for="to">{{ $t('95') }}</label>
                <VueDatePicker
                  v-model="to"
                  placeholder="dd.mm.yyyy"
                  format="dd.MM.yyyy"
                  class="w-full md:!w-[200px]"
                ></VueDatePicker>
              </div>
            </div>
            <div class="gap-2 grid grid-cols-2">
              <UButton
                color="primary"
                class="mb-2 flex items-center justify-center"
                @click="typeStatusOrder = 'all'"
              >
                {{ $t('739') }}
              </UButton>
              <UButton
                color="red"
                class="mb-2 flex items-center justify-center"
                @click="typeStatusOrder = 4"
              >
                {{ $t('738') }}
              </UButton>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <EasyDataTable
            :headers="headers"
            :items="items"
            class="w-full rounded-2xl overflow-hidden"
            :search-field="[
              'id',
              'status',
              'route',
              'checkin',
              'checkout',
              'hotel_name',
              'created_at',
              'status_pay',
              'price_usd',
              'passengers',
              'all_pax',
              'comment',
            ]"
            :search-value="searchValue"
          >
            <template #header-status>
              <UIDropdown>
                <template #header>
                  <div
                    class="flex items-center cursor-pointer text-[12px] text-[#373737]"
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
                    class="flex items-center cursor-pointer text-[12px] text-[#373737]"
                  >
                    <i class="fa-regular fa-filter"></i>
                    <p>{{ t('311') }}</p>
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
              <NuxtLinkLocale :to="`/orders/tour/${data.id}`">
                <UBadge class="cursor-pointer">{{ data.id }}</UBadge>
              </NuxtLinkLocale>
            </template>
            <template #item-created_at="data">
              {{ dayjs.unix(data.created_at / 1000).format('DD.MM.YYYY') }}
            </template>
            <template #item-route="data">
              <p>{{ data?.route }}</p>
            </template>
            <template #item-checkin="data">
              <p>{{ dayjs.unix(data.checkin / 1000).format('DD.MM.YYYY') }}</p>
            </template>
            <template #item-checkout="data">
              <p>{{ dayjs.unix(data.checkout / 1000).format('DD.MM.YYYY') }}</p>
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
                >{{ statusPaymentT[data.status_pay] }}</UBadge
              >
              <UBadge
                v-if="data.status_pay == 1"
                class="font-medium"
                color="green"
                variant="solid"
                >{{ statusPaymentT[data?.status_pay] }}</UBadge
              >
              <UBadge
                v-if="data.status_pay == 2"
                class="font-medium"
                variant="solid"
                color="orange"
                >{{ statusPaymentT[data?.status_pay] }}</UBadge
              >
              <UBadge
                v-if="data.status_pay == 3"
                class="font-medium"
                variant="solid"
                color="lime"
                >{{ statusPaymentT[data.status_pay] }}</UBadge
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
      </div>
    </ClientOnly>

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
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import dayjs from 'dayjs'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Header, Item } from 'vue3-easy-data-table'

import { statusColor, statusOrder, statusPaymant } from '@/utils'
import type { ITourOrders } from '~/types/hotel'

const { t } = useI18n()
const statusOrderT = ref(statusOrder(t))
const statusPaymentT = ref(statusPaymant(t))
const allOrders: Ref<ITourOrders> = ref(null)
const filteredItems: Ref<ITourOrders['data'] | undefined> = ref(null)
const loading = ref(true)
const tableFilter = ref(false)
const pageNumber = ref(1)
const searchValue = ref('')
const from = ref(null)
const to = ref(null)
const headers: Header[] = [
  { text: 'ID', value: 'id', sortable: true },
  { text: t('90'), value: 'created_at', sortable: true },
  { text: t('454'), value: 'route', sortable: true },
  { text: t('340'), value: 'checkin', sortable: true },
  { text: t('204'), value: 'checkout', sortable: true },
  { text: t('345'), value: 'all_pax' },
  { text: t('310'), value: 'status' },
  { text: t('311'), value: 'status_pay' },
  { text: t('362'), value: 'price_usd', sortable: true },
  { text: 'Hotel name', value: 'hotel_name', sortable: true },
  { text: t('241'), value: 'passengers', sortable: true },
  { text: t('150'), value: 'comment', sortable: true },
]

const typeStatusOrder = ref('all')
const statuses = [
  { value: 'all', label: t('66') },
  { value: 0, label: 'Новый' },
  { value: 1, label: 'Обработка' },
  { value: 2, label: 'Нужно забронировать' },
  { value: 3, label: 'Забронирован' },
  { value: 4, label: 'Отмена' },
  { value: 5, label: 'К отмене' },
]
const statusPayment = ref('all')
const allPaymentStatuses = [
  { value: 'all', label: 'All' },
  { value: 0, label: 'Не оплачен' },
  { value: 1, label: 'Оплачен' },
  { value: 2, label: 'Возвратный' },
  { value: 3, label: 'Предоплата' },
  { value: 4, label: 'Бесплатный' },
]

const dateTime = (date) => {
  return new Date(date).getTime()
}

const items = computed((): Item[] => {
  return filteredItems.value?.map((item) => {
    return {
      id: item.data.id,
      status: item.data?.status,
      route: item.data?.route,
      created_at: dateTime(item.data?.created_at),
      checkin: dateTime(item.data?.checkin),
      checkout: dateTime(item.data?.checkout),
      status_pay: item?.data?.status_pay,
      price_usd: item?.data?.price_usd,
      hotel_name: item?.data?.hotel_name,
      all_pax: item?.data?.all_pax,
      comment: item?.data?.comment,
      passengers: computed(() => {
        return item?.data?.flight?.passengers?.map((el: any) => {
          return `${el?.first_name} ${el?.last_name}`
        })
      }).value?.join(', <br>'),
    }
  })
})

const getHotelOrders = async (page: number) => {
  try {
    loading.value = true
    const res = await useApi().$get('/v1/tour/order', {
      params: {
        sort: '-id',
        page: page,
        include: 'flight.passengers,status',
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
        console.log(value, 'typeStatusOrder')
        filteredItems.value = allOrders.value?.data.filter(
          (item) => item.data.status == value,
        )
      }
    }
  },
  {
    immediate: true,
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
  },
)
watch(
  () => [from.value, to.value],
  (val) => {
    const from = new Date(val[0]).getTime()
    const to = new Date(val[1]).getTime()
    filteredItems.value = allOrders.value.data.filter((item) => {
      const checkin = new Date(item.data.checkin).getTime()
      const checkout = new Date(item.data.checkout).getTime()
      if (val[0] && val[1]) {
        if (from < checkin && checkout < to) {
          return item
        }
      } else {
        if (val[0] && from < checkin) return item
        if (val[1] && checkout < to) return item
      }
      if (!val[0] && !val[1]) return item
    })
  },
)

const handleCurrentPage = (newPage: number) => {
  pageNumber.value = newPage
  getHotelOrders(pageNumber.value)
}
onMounted(async () => {
  await getHotelOrders(pageNumber.value)
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style.scss';
.filter-card {
  padding: 14px;
  border-radius: 8px;
  background: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .table {
    //width: 100vw;
  }
  .label-input {
    label {
      @include common-text-style(12px, 600, normal);
    }
  }
}
</style>
