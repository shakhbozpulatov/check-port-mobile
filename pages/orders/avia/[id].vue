<template>
  <div>
    <UIHeader without-image>
      {{ $t('448') }}
    </UIHeader>
    <div v-if="loading" class="container mt-32">
      <LazyUIOrderCardPreloader v-for="item in 2" :key="item" />
    </div>
    <div v-else class="container mt-32">
      <div v-if="order">
        <div class="card-wrap">
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
            <!--                    <span class="!text-[#0073FF]">"{{ $t('603') }}"</span>-->
            <!--                  </NuxtLink>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
            <!--          </UModal>-->
            <MbscPopup
              :is-open="dialogVisible"
              theme-variant="light"
              display="bottom"
              theme="material"
              css-class="small-popup rounded-popup"
              @close="dialogVisible = false"
            >
              <div
                class="w-[40px] bg-[#F3F4F6] mb-4 h-[8px] rounded-full m-auto"
                @click="dialogVisible = false"
              ></div>
              <div class="flex mb-2 justify-between items-center">
                <p class="font-bold text-[16px]">
                  {{ $t('214') }}, {{ $t('320') }}:
                  {{ order.price.toFixed(2) }} {{ order.currency }}
                </p>
                <UButton
                  size="sm"
                  color="white"
                  variant="ghost"
                  class="rounded-[1rem]"
                  @click="dialogVisible = false"
                >
                  <i class="fa-solid fa-xmark text-[16px]"></i>
                </UButton>
              </div>
              <hr class="mb-4" />
              <ProfilePayment
                :order-id="route.params.id"
                type="flight"
                :email="order?.email"
                :last_name="order?.full_name"
                :currency="order?.currency"
                :price="order?.price.toFixed(2)"
                type_code="order"
                :gtag="'Avia_Octo_Window'"
                :return-url="`https://asialuxe.uz/orders/avia/${route.params.id}`"
                @on-submit="dialogVisible = false"
                @on-close="orderItem(route.params.id)"
              />
            </MbscPopup>
          </div>
          <div class="grid grid-cols-12 gap-3">
            <div class="col-span-12 overflow-hidden">
              <div class="">
                <p class="text-[14px] text-[#525252] font-semibold leading-5">
                  {{ $t('195') }}: {{ order?.id }}
                </p>
                <p class="text-[14px] text-[#525252] font-semibold leading-5">
                  {{ $t('150') }}: {{ order.comment }}
                </p>
              </div>
            </div>
            <div class="col-span-12">
              <p class="text-[14px] text-[#525252] font-semibold leading-5">
                {{ t('329') }}: {{ order.phone }}
              </p>
              <p class="text-[14px] text-[#525252] font-semibold leading-5">
                Email: {{ order.email }}
              </p>
            </div>
            <div class="col-span-12">
              <div class="flex items-center gap-4">
                <p class="text-[14px] text-[#525252] font-semibold leading-5">
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
                <p class="text-[14px] text-[#525252] font-semibold leading-5">
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
                <p class="text-[14px] text-[#525252] font-semibold leading-5">
                  {{ t('362') }}:
                </p>
                <div
                  class="text-[14px] text-[#525252] font-semibold leading-5 flex items-center gap-1"
                >
                  <p>{{ order?.price_usd.toFixed(2) }} {{ order?.currency }}</p>
                </div>
              </div>
            </div>
            <div v-if="order?.promo_code" class="col-span-12">
              <p class="text-[14px] text-[#525252] font-semibold leading-5">
                {{ $t('743') }}: {{ order?.promo_code }}
              </p>
            </div>
            <div class="col-span-12 flex items-center gap-2 mb-4">
              <div
                v-if="order.status_pay !== 1 && order.status !== 4"
                class="flex flex-col md:flex-row gap-3"
              >
                <NuxtLinkLocale
                  :to="`/payment/?type=avia&orderId=${order.id}&orderType=flight&typeCode=order`"
                >
                  <UButton class="bg-[#0073ff] rounded-[1rem] px-4">{{
                    t('214')
                  }}</UButton>
                </NuxtLinkLocale>
                <!--              <UButton-->
                <!--                class="px-4"-->
                <!--                color="blue"-->
                <!--                @click="openDialogCash = true"-->
                <!--                >{{ $t('702') }}</UButton-->
                <!--              >-->
              </div>
              <UButton
                v-if="
                  (order.status === 0 || order.status === 1) &&
                  order.provider_id === 1
                "
                class="rounded-[1rem] px-4"
                color="red"
                @click="cancelStatus"
                >{{ $t('230') }}
              </UButton>
            </div>
          </div>
        </div>
        <div class="card-wrap mt-4 mb-10">
          <div
            class="flex items-center justify-between order-detail-table-header"
          >
            <div>
              <p class="text-[20px] font-medium">{{ t('23') }}</p>
              <div class="flex items-center">
                (
                <p class="text-[14px] font-medium">
                  {{ order.directions[0]?.flight.departure_code }}
                </p>

                <p
                  v-for="(elem, index) in order?.directions"
                  :key="index"
                  class="text-[14px] font-medium"
                >
                  -{{ elem?.flight.arrival_code }}
                </p>
                )
                <p class="text-[14px] font-medium ml-1">
                  {{
                    dayjs(
                      order?.directions[0]?.flight.departure_date_format,
                    ).format('DD.MM.YYYY')
                  }}
                  -
                  {{
                    dayjs(
                      order?.directions[order.directions.length - 1]?.flight
                        .arrival_date_format,
                    ).format('DD.MM.YYYY')
                  }}
                </p>
              </div>
            </div>

            <UButton
              v-if="
                (order.provider_id === 1 &&
                  order.status_pay === 1 &&
                  order.status === 3) ||
                (order.status === 2 && order.provider_id === 1)
              "
              class="bg-[#0073ff] rounded-[1rem] py-3"
              @click="openTicket"
            >
              <i class="fa-solid fa-file"></i>
              {{ t('399') }}</UButton
            >
            <!--          <UButton-->
            <!--            v-if="order.status_pay === 0 && order.status !== 4"-->
            <!--            color="blue"-->
            <!--            class="py-2"-->
            <!--            @click="openInvoice"-->
            <!--            ><i class="fa-solid fa-file"></i> {{ $t('324') }}</UButton-->
            <!--          >-->
          </div>
          <UTable :rows="passengers" :columns="columns" style="width: 100%" />
        </div>
      </div>
      <UModal
        v-model="errorDialog"
        fullscreen
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
import { MbscPopup } from '@mobiscroll/datepicker-vue'
import { useWindowSize } from '@vueuse/core'
import dayjs from 'dayjs'
import { type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { IResponse } from '~/types'
import type { IOrderAviaSingle } from '~/types/avia'
const { t } = useI18n()
const { myToast } = useCustomToast()
const route = useRoute()
const statusOrderT = ref(statusOrder(t))

const order: Ref<IOrderAviaSingle | null> = ref(null)
const errorDialog = ref(false)
const loading = ref(false)
const dialogVisible = ref(false)

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
  return order.value?.passengers.map((item, i) => {
    return {
      id: i + 1,
      lastname: item.last_name,
      firstname: item.first_name,
      birth: dayjs(item.birth).format('DD.MM.YYYY'),
      gender: item.gender,
      citizenship: item.citizenship,
      document_number: item.document_number,
      document_expire: dayjs(item.document_expire).format('DD.MM.YYYY'),
    }
  })
})

const cancelStatus = async () => {
  try {
    await useApi().$get(`/v1/flight/cancel/${route.params.id}`)
    await orderItem(route.params.id as string)
    /*useGtm()?.trackEvent({
      event: 'Avia_Cancel',
      category: 'Cancel',
      label: 'Avia_Cancel',
    })*/
  } catch (e) {
    console.log(e)
    myToast('error', e?.response?.data?.message)
    // toast.error(e?.response?.data?.message)
  }
}

const openTicket = () => {
  const pdfUrl = `https://api.asialuxe.app/v1/flight/voucher/${order.value.id}`
  window.open(pdfUrl, '_blank')
}

// const openInvoice = () => {
//   const pdfUrl = `https://api.asialuxe.app/v1/flight/invoice/${order.value.id}`
//   window.open(pdfUrl, '_blank')
// }
const orderItem = async (id: string) => {
  try {
    loading.value = true
    const res = await useApi().$get<IResponse<IOrderAviaSingle>>(
      `/v1/flight/order/${id}?include=passengers.books.flight,directions`,
    )
    order.value = res.data
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
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
