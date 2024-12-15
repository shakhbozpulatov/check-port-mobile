<template>
  <div>
    <UIHeader without-image>
      {{ $t('354') }}
    </UIHeader>
    <div class="container mt-32">
      <div v-if="order">
        <div class="card-wrap dark:!bg-dark-700 dark:text-white-100">
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <div class="flex items-center gap-2">
                <p class="text-[22px] font-medium">
                  {{ t('135') }}: {{ order.full_name }}
                </p>
                <p v-if="order?.ex_id">({{ order?.ex_id }})</p>
              </div>

              <p>
                {{ t('392') }}
                {{ dayjs(order.created_at * 1000).format('DD.MM.YYYY hh:mm') }}
              </p>
            </div>

            <!--          <UModal v-model="openDialogCash" :title="$t('702')" width="50%">-->
            <!--            <div-->
            <!--              class="w-full h-[80vh] md:h-full flex flex-col justify-center items-center p-5"-->
            <!--            >-->
            <!--              <div class="mb-3">-->
            <!--                <img-->
            <!--                  class="w-[100px] m-auto dark:hidden"-->
            <!--                  src="/images/logo.svg"-->
            <!--                  alt="logo"-->
            <!--                />-->
            <!--                <img-->
            <!--                  class="w-[100px] m-auto dark:block"-->
            <!--                  src="/images/logo_white.svg"-->
            <!--                  alt="logo"-->
            <!--                />-->
            <!--              </div>-->
            <!--              <div class="w-full text-center">-->
            <!--                <div class="mb-3">-->
            <!--                  <span class="me-2 dark:text-white-100">-->
            <!--                    {{ $t('703') }}-->
            <!--                  </span>-->
            <!--                  <NuxtLink to="/offices">-->
            <!--                    <span class="!text-[#0074FF]">"{{ $t('603') }}"</span>-->
            <!--                  </NuxtLink>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          </UModal>-->
            <UModal
              v-model="dialogVisible"
              :fullscreen="width < 768"
              :ui="{ wrapper: 'z-[200]', width: 'sm:max-w-full md:!w-[60%]' }"
              width="w-full"
              class="p-3"
            >
              <div class="flex p-3 justify-between items-center">
                <span
                  >{{ $t('214') }}, {{ $t('320') }}:
                  {{ order.price.toFixed(2) }} {{ order.currency }}</span
                >
                <UButton @click="dialogVisible = !dialogVisible"
                  ><i class="fa-solid fa-xmark"></i
                ></UButton>
              </div>
              <hr />
              <ProfilePayment
                :order-id="route.params.id"
                type="tour"
                :email="order?.email"
                :last_name="order?.full_name"
                :currency="order?.currency"
                :price="order?.price.toFixed(2)"
                type_code="order"
                :gtag="'Avia_Octo_Window'"
                :return-url="`https://asialuxe.uz/orders/service/${route.params.id}`"
                @on-submit="dialogVisible = false"
                @on-close="orderItem(route.params.id)"
              />
            </UModal>
          </div>
          <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6 md:col-span-3 overflow-hidden">
              <div class="">
                <p
                  class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"
                >
                  {{ $t('195') }}: {{ order?.id }}
                </p>
                <p
                  class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"
                >
                  {{ t('150') }}: {{ order.comment }}
                </p>
              </div>
            </div>
            <div class="col-span-6 md:col-span-3">
              <p
                class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"
              >
                {{ t('329') }}: {{ order.phone }}
              </p>
              <p
                class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"
              >
                Email: {{ order.email }}
              </p>
            </div>
            <div
              :class="order?.status_pay ? 'col-span-6' : 'col-span-12'"
              class="md:col-span-3"
            >
              <div class="flex items-center gap-4">
                <p
                  class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"
                >
                  {{ t('8') }}:
                </p>
                <div
                  style="color: #03b115"
                  :class="'text-[14px] font-semibold leading-5 flex items-center gap-1 text-'"
                  :style="`color: ${statusColor[order.status]}`"
                >
                  <i class="fa-solid fa-file"></i>
                  <p>{{ statusOrderT[order.status] }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <p
                  class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"
                >
                  {{ t('397') }}:
                </p>
                <div
                  v-if="order.status_pay === 1"
                  style="color: #03b115"
                  class="text-[14px] font-semibold leading-5 text-success flex items-center gap-1"
                >
                  <i class="fa-regular fa-circle-check text-success"></i>
                  <p>{{ t('217') }}</p>
                </div>
                <div
                  v-else
                  style="color: #ec2012"
                  class="text-[14px] font-semibold leading-5 text-danger flex items-center gap-1"
                >
                  <i class="fa-solid fa-money-bill"></i>
                  <p>{{ t('186') }}</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <p
                  class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"
                >
                  {{ t('362') }}:
                </p>
                <div
                  class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100 flex items-center gap-1"
                >
                  <p>{{ order?.price_usd.toFixed(2) }} {{ order?.currency }}</p>
                </div>
              </div>
            </div>
            <!--          <div v-if="order?.promo_code" class="col-span-6 md:col-span-3">-->
            <!--            <p-->
            <!--              class="text-[14px] text-[#525252] font-semibold leading-5 dark:!text-white-100"-->
            <!--            >-->
            <!--              {{ $t('743') }}: {{ order?.promo_code }}-->
            <!--            </p>-->
            <!--          </div>-->
            <div class="col-span-12 md:col-span-3 flex items-center gap-2 mb-4">
              <div
                v-if="order.status_pay !== 1 && order.status !== 4"
                class="flex flex-col md:flex-row gap-3"
              >
                <UButton class="px-4 bg-[#0073ff]" @click="openDialog">{{
                  t('214')
                }}</UButton>
                <!--              <UButton-->
                <!--                class="px-4"-->
                <!--                color="blue"-->
                <!--                @click="openDialogCash = true"-->
                <!--                >{{ $t('702') }}</UButton-->
                <!--              >-->
              </div>
              <!--            <UButton-->
              <!--              v-if="-->
              <!--                (order.status === 0 || order.status === 1) &&-->
              <!--                order.provider_id === 1-->
              <!--              "-->
              <!--              class="px-4"-->
              <!--              color="red"-->
              <!--              @click="cancelStatus"-->
              <!--              >{{ $t('230') }}-->
              <!--            </UButton>-->
            </div>
          </div>
        </div>
        <!--      <div class="card-wrap mt-4 mb-10 dark:!bg-dark-700 dark:text-white-100">-->
        <!--        <div-->
        <!--          class="flex items-center justify-between order-detail-table-header"-->
        <!--        >-->
        <!--          <div>-->
        <!--            <p class="text-[20px] font-medium">Meet & Greet</p>-->
        <!--          </div>-->

        <!--          <UButton-->
        <!--            v-if="-->
        <!--              (order.provider_id === 1 &&-->
        <!--                order.status_pay === 1 &&-->
        <!--                order.status === 3) ||-->
        <!--              (order.status === 2 && order.provider_id === 1)-->
        <!--            "-->
        <!--            color="blue"-->
        <!--            class="py-3"-->
        <!--            @click="openTicket"-->
        <!--          >-->
        <!--            <i class="fa-solid fa-file"></i>-->
        <!--            {{ t('399') }}</UButton-->
        <!--          >-->
        <!--        </div>-->
        <!--        <UTable :rows="passengers" :columns="columns" style="width: 100%" />-->
        <!--      </div>-->
        <div class="card-wrap mt-4 mb-10 dark:!bg-dark-700 dark:text-white-100">
          <div
            class="flex items-center justify-between order-detail-table-header"
          >
            <div>
              <p class="text-[20px] font-medium">Passengers</p>
            </div>
          </div>
          <UTable :rows="passengers" :columns="columns" style="width: 100%" />
        </div>
      </div>
      <UModal
        v-model="errorDialog"
        :ui="{ width: 'sm:max-w-[90%] md:!w-[70%]' }"
      >
        <div class="my-6">
          <div
            v-if="$route.query?.status === '0'"
            class="bg-yellow-300 rounded-xl px-4 py-5"
            role="alert"
          >
            {{ $route.query?.msg }}
          </div>
          <div
            v-if="$route.query?.status === '1'"
            class="bg-green-400 rounded-xl px-4 py-5"
            role="alert"
          >
            {{ $route.query?.msg }}
          </div>
        </div>
      </UModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import dayjs from 'dayjs'
import { type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useOrdersStore } from '~/stores/orders'
import type { IResponse } from '~/types'
import type { IOrderAviaSingle } from '~/types/avia'

const { t, locale } = useI18n()
const { myToast } = useCustomToast()
const route = useRoute()
const statusOrderT = ref(statusOrder(t))
const orderStore = useOrdersStore()
const order: Ref<IOrderAviaSingle | null> = ref(null)
const errorDialog = ref(false)
// const openDialogCash = ref(false)
const dialogVisible = ref(false)
const { width } = useWindowSize()
const columns = [
  {
    label: 'N',
    key: 'id',
  },
  {
    label: t('357'),
    key: 'lastname',
  },
  {
    label: t('135'),
    key: 'firstname',
  },
  {
    label: t('98'),
    key: 'birth',
  },
  {
    label: t('258'),
    key: 'gender',
  },
  {
    label: t('84'),
    key: 'citizenship',
  },
  {
    label: t('296'),
    key: 'document_number',
  },
  {
    label: t('304'),
    key: 'document_expire',
  },
]

const passengers = computed(() => {
  return order.value?.largeOrderPassengers.map((item, i) => {
    return {
      id: i + 1,
      lastname: item.passenger.last_name,
      firstname: item.passenger.first_name,
      birth: dayjs(item.passenger.birth).format('DD.MM.YYYY'),
      gender: item.passenger.gender,
      citizenship: item.passenger.citizenship,
      document_number: item.passenger.document_number,
      document_expire: dayjs(item.passenger.document_expire).format(
        'DD.MM.YYYY',
      ),
    }
  })
})

const openDialog = async () => {
  await orderStore.fetchMyCards()
  dialogVisible.value = true
}

// const cancelStatus = async () => {
//   try {
//     await useApi().$get(`/v1/flight/cancel/${route.params.id}`)
//     await orderItem(route.params.id as string)
//     useTrackEvent('Avia_Cancel', {
//       event_category: 'Cancel',
//       event_label: 'Avia_Cancel',
//     })
//   } catch (e) {
//     console.log(e)
//     myToast('error', e?.response?.data?.message)
//     // toast.error(e?.response?.data?.message)
//   }
// }

const openTicket = () => {
  const pdfUrl = `https://api.asialuxe.app/v1/service/voucher/${order.value.id}`
  window.open(pdfUrl, '_blank')
}

// const openInvoice = () => {
//   const pdfUrl = `https://api.asialuxe.app/v1/service/invoice/${order.value.id}`
//   window.open(pdfUrl, '_blank')
// }
const orderItem = async (id: string) => {
  try {
    const res = await useApi().$get<IResponse<IOrderAviaSingle>>(
      `/v1/service/order?id=${id}&include=largeOrderPassengers.passenger`,
    )
    order.value = res.data
  } catch (e) {
    console.log(e)
  }
}

orderItem(route.params.id as string)

if (route.query?.msg && route.query.status) {
  errorDialog.value = true
}

useSeoMeta({
  title: t('690'),
  ogTitle: t('690'),
  description: t('739') + ': ' + t('448'),
  ogDescription: t('739') + ': ' + t('448'),
})
</script>

<style lang="scss" scoped>
.card-wrap {
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  background: #fff;
  .img-wrap {
    width: 140px;
  }
}

.wallet-pay input:checked + div {
  border: 1px solid #3392ff;
  box-shadow: 0 0.5rem 1rem rgba(51, 146, 255, 0.15) !important;
}
</style>
