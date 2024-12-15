<template>
  <div>
    <UIHeader without-image>
      {{ $t('346') }}
    </UIHeader>
    <div class="container mt-32">
      <div>
        <div v-if="!order" class="container mt-32">
          <LazyUIOrderCardPreloader v-for="item in 2" :key="item" />
        </div>
        <div v-else>
          <div v-if="order" class="card-wrap">
            <div class="flex items-start justify-between gap-2 mb-2">
              <div>
                <div class="flex items-center gap-2">
                  <p class="number">{{ t('135') }}: {{ order.full_name }}</p>
                  <p v-if="order?.ex_id">({{ order?.ex_id }})</p>
                </div>

                <p>
                  {{ t('392') }}
                  {{ dayjs(order.created_at).format('DD.MM.YYYY hh:mm') }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-12 gap-3">
              <div class="col-span-12 overflow-hidden">
                <div class="">
                  <p class="info">{{ t('195') }}: #{{ order.id }}</p>
                  <p class="info">{{ t('150') }}: {{ order.comment }}</p>
                </div>
              </div>
              <div class="col-span-12">
                <p class="info">{{ t('329') }}: {{ order.phone }}</p>
                <p class="info">Email: {{ order.email }}</p>
              </div>
              <div class="col-span-12">
                <div class="flex items-center gap-4">
                  <p class="info">{{ t('8') }}:</p>
                  <div
                    style="color: #03b115"
                    :class="
                      'info flex items-center gap-1 text-' +
                      statusColor[order.status]
                    "
                    :style="`color: ${statusColor[order?.status]}`"
                  >
                    <i class="fa-solid fa-file"></i>
                    <p>{{ statusOrderT[order?.status] }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <p class="info">{{ t('397') }}:</p>
                  <div
                    v-if="order?.status_pay === 1"
                    style="color: #03b115"
                    class="info text-success flex items-center gap-1"
                  >
                    <i class="fa-regular fa-circle-check text-success"></i>
                    <p>{{ t('217') }}</p>
                  </div>
                  <div
                    v-else
                    style="color: #ec2012"
                    class="info text-danger flex items-center gap-1"
                  >
                    <i class="fa-solid fa-money-bill"></i>
                    <p>{{ t('186') }}</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <p class="info">{{ t('362') }}:</p>
                  <div class="info flex items-center gap-1">
                    <p>
                      {{ order?.price_usd.toFixed(2) }} {{ order?.currency }}
                    </p>
                  </div>
                </div>
                <div v-if="order?.promo_code">
                  <p class="info">{{ $t('743') }}: {{ order?.promo_code }}</p>
                </div>
              </div>
              <div class="col-span-12">
                <UButton
                  v-if="order?.status == 3"
                  class="bg-[#0073ff] rounded-[1rem] py-3 w-full mb-2"
                  @click="openTicket"
                >
                  <i class="fa-solid fa-file"></i>{{ t('399') }}
                </UButton>
                <!--            <UButton-->
                <!--              v-if="-->
                <!--                order.status_pay !== 1 &&-->
                <!--                order.status !== 4 &&-->
                <!--                order.status !== 5-->
                <!--              "-->
                <!--              -->
                <!--              color="blue"-->
                <!--              class="py-3 w-full"-->
                <!--              @click="openInvoice"-->
                <!--              ><el-icon class="mr-2"><Document /></el-icon> {{ $t('324') }}-->
                <!--            </UButton>-->
              </div>
            </div>
            <NuxtLinkLocale
              v-if="order.status_pay === 0 && order.status !== 4"
              :to="`/payment/?type=hotel&orderId=${order?.id}&orderType=tour&typeCode=tour`"
            >
              <UButton
                class="bg-[#0073ff] rounded-[1rem] px-4 w-full justify-center h-10"
              >
                {{ t('214') }}
              </UButton>
            </NuxtLinkLocale>
          </div>
          <div class="card-wrap mt-4">
            <div
              class="flex items-center justify-between order-detail-table-header"
            >
              <div>
                <p class="from-to">{{ t('226') }}</p>
              </div>
            </div>
            <UTable
              :rows="hotelData"
              :columns="hotelColumns"
              style="width: 100%"
            >
              <template #transfer-data="{ row }">
                {{
                  row.transfer == 'Individual'
                    ? $t('136')
                    : row.transfer == 'Group'
                      ? $t('86')
                      : '-'
                }}
              </template>
            </UTable>
          </div>
          <div class="card-wrap mt-4">
            <div
              class="flex items-center justify-between order-detail-table-header"
            >
              <div>
                <p class="from-to">{{ t('241') }}</p>
              </div>
            </div>
            <UTable
              :rows="passengers"
              :columns="passengerColumns"
              style="width: 100%"
            />
          </div>

          <div v-if="order?.insurances[0]?.provider_url" class="mt-3">
            {{ order.insurances }}
            <p class="from-to">{{ t('317') }}</p>
            <div
              v-for="(elem, int) in order?.insurances"
              :key="int"
              class="mb-2"
            >
              <a
                :href="elem?.provider_url"
                target="_blank"
                class="text-[#0073FF]"
              >
                <u>{{ elem?.provider_url }}</u>
              </a>
            </div>
          </div>
          <div class="card-wrap mt-4">
            <div
              class="flex items-center justify-between order-detail-table-header"
            >
              <div>
                <p class="from-to">{{ t('462') }}</p>
              </div>
            </div>
            <UTable
              :rows="reysData"
              :columns="reysColumns"
              style="width: 100%"
            />
          </div>
          <!--        <el-dialog-->
          <!--          v-model="openDialogCash"-->
          <!--          :fullscreen="width < 576"-->
          <!--          :title="$t('702')"-->
          <!--          width="50%"-->
          <!--        >-->
          <!--          <div-->
          <!--            class="w-full h-[80vh] md:h-full flex flex-col justify-center items-center"-->
          <!--          >-->
          <!--            <div class="mb-3">-->
          <!--              <img class="w-[100px] m-auto" src="/images/logo.svg" alt="logo" />-->
          <!--            </div>-->
          <!--            <div class="w-full text-center">-->
          <!--              <div class="mb-3">-->
          <!--                <span class="me-2">-->
          <!--                  {{ $t('703') }}-->
          <!--                </span>-->
          <!--                <router-link to="/offices">-->
          <!--                  <el-link class="!text-[#0073FF]"> "{{ $t('603') }}" </el-link>-->
          <!--                </router-link>-->
          <!--              </div>-->
          <!--              &lt;!&ndash;            <UButton&ndash;&gt;-->
          <!--              &lt;!&ndash;              v-if="&ndash;&gt;-->
          <!--              &lt;!&ndash;                order.status_pay !== 1 &&&ndash;&gt;-->
          <!--              &lt;!&ndash;                order.status !== 4 &&&ndash;&gt;-->
          <!--              &lt;!&ndash;                order.status !== 5&ndash;&gt;-->
          <!--              &lt;!&ndash;              "&ndash;&gt;-->
          <!--              &lt;!&ndash;              &ndash;&gt;-->
          <!--              &lt;!&ndash;              color="blue"&ndash;&gt;-->
          <!--              &lt;!&ndash;              class="py-3"&ndash;&gt;-->
          <!--              &lt;!&ndash;              @click="openInvoice"&ndash;&gt;-->
          <!--              &lt;!&ndash;              ><el-icon class="mr-2"><Document /></el-icon>&ndash;&gt;-->
          <!--              &lt;!&ndash;              {{ $t('324') }}</UButton&ndash;&gt;-->
          <!--              &lt;!&ndash;            >&ndash;&gt;-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </el-dialog>-->
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
import dayjs from 'dayjs'
import type { Ref } from 'vue'

import { useOrdersStore } from '~/stores/orders'
import type { IResponse } from '~/types'
import type { ITourOrder } from '~/types/tour'

const { t } = useI18n()
const route = useRoute()
const orderStore = useOrdersStore()

// const openDialogCash = ref(false)
const order: Ref<ITourOrder | undefined> = ref()
const dialogVisible = ref(false)
const selectedCardNumber = ref('')
const selectedYear = ref('')
const selectedMonth = ref('')
const cardType = ref('')

const loading = ref(true)
const statusOrderT = ref(statusOrder(t))
const selectedCard = ref('new_card')
const errorDialog = ref(false)
const baseUrl = import.meta.env.VITE_APP_BASE_URL

const passengerColumns = [
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
const reysColumns = [
  {
    label: t('463'),
    key: 'airline_name',
  },
  {
    label: t('464'),
    key: 'departure_code',
  },
  {
    label: t('465'),
    key: 'departure_time',
  },
  {
    label: t('466'),
    key: 'arrival_code',
  },
  {
    label: t('467'),
    key: 'arrival_time',
  },
  {
    label: t('294'),
    key: 'plane',
  },
]
const hotelColumns = [
  {
    label: t('309'),
    key: 'status_text',
  },
  {
    label: t('226'),
    key: 'hotel_name',
  },
  {
    label: t('194'),
    key: 'room_name',
  },
  {
    label: t('246'),
    key: 'food',
  },
  {
    label: t('337'),
    key: 'transfer',
  },
]

const hotelData = computed(() => {
  return order.value.hotels.map((item) => {
    return {
      status_text: item.status_text,
      hotel_name: item.hotel_name,
      room_name: item.room_name,
      transfer: item.transfer ? item.transfer : '-',
      food: item.food ? item.food : '-',
    }
  })
})
const passengers = computed(() => {
  return order.value?.passenger.map((item, i) => {
    return {
      id: i + 1,
      lastname: item.passenger.last_name,
      firstname: item.passenger.first_name,
      birth: dayjs(item.passenger.birth).format('DD.MM.YYYY'),
      citizenship: item.passenger.citizenship,
      document_number: item.passenger.document_number,
      document_expire: dayjs(item.passenger.document_expire).format(
        'DD.MM.YYYY',
      ),
    }
  })
})
const reysData = computed(() => {
  return order.value?.flight?.directions.map((item) => {
    return {
      airline_name: item.flight.airline_name,
      departure_code: item.flight.departure_code,
      departure_time: `${dayjs(item.flight.departure_date_format).format('DD.MM.YYYY')}, ${item.flight.departure_time_format}`,
      arrival_code: item.flight.arrival_code,
      arrival_time: `${dayjs(item.flight.arrival_date_format).format('DD.MM.YYYY')}, ${item.flight.arrival_time_format}`,
      plane: item.flight.plane,
    }
  })
})
const onSubmitPaymentWithCard = () => {
  dialogVisible.value = false
}

const openDialog = async () => {
  await orderStore.fetchMyCards()
  dialogVisible.value = true
}

const openTicket = () => {
  const pdfUrl = `${baseUrl}/v1/tour/voucher?id=${route.params.id}`
  window.open(pdfUrl, '_blank')
}

// const openInvoice = () => {
//   const pdfUrl = `${baseUrl}/v1/tour/invoice?id=${route.params.id}`
//   window.open(pdfUrl, '_blank')
// }

async function getTourSingle() {
  loading.value = true
  try {
    const res = await useApi().$get<IResponse<ITourOrder>>(
      `/v1/tour/order/${route.params.id}?include=hotels.board,transfers,insurances,passenger.passenger,flight,flight.directions,status_text`,
    )
    order.value = res.data
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await getTourSingle()
})

watchEffect(() => {
  selectedCardNumber.value = selectedCard.value.value
  selectedYear.value = selectedCard.value.year
  selectedMonth.value = selectedCard.value.month
  cardType.value = selectedCard.value.type
})
if (route.query?.msg && route.query.status) {
  errorDialog.value = true
}
useSeoMeta({
  title: t('690'),
  ogTitle: t('690'),
  description: t('739') + ': ' + t('346'),
  ogDescription: t('739') + ': ' + t('346'),
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
  .number {
    font-size: 22px;
    font-weight: 500;
  }
  .info {
    font-size: 14px;
    font-weight: 600;
    color: #525252;
  }
  .from-to {
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .when {
    font-size: 14px;
    font-weight: 500;
  }
}

.wallet-pay input:checked + div {
  border: 1px solid #3392ff;
  box-shadow: 0 0.5rem 1rem rgba(51, 146, 255, 0.15) !important;
}
</style>
