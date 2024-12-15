<template>
  <div>
    <UIHeader without-image>
      {{ $t('226') }}
    </UIHeader>
    <div v-if="!hotel" class="container mt-32">
      <LazyUIOrderCardPreloader v-for="item in 2" :key="item" />
    </div>
    <div v-else class="container mt-32">
      <div v-if="hotel" class="pb-24">
        <div class="grid grid-cols-12 gap-3">
          <div class="col-span-12 md:col-span-3">
            <div class="card-wrap mb-3">
              <div class="card-title flex items-center justify-between">
                <h4>{{ t('135') }}:</h4>
                <div class="flex items-baseline gap-1">
                  {{ hotel.full_name }}
                </div>
              </div>
              <p class="text mb-3">
                {{ dayjs(hotel.updated_at).format('DD.MM.YYYY hh:mm') }}
              </p>

              <div class="flex flex-col gap-1">
                <div class="text flex gap-3">
                  {{ t('195') }}:
                  <p>#{{ route.params.id }}</p>
                  <p v-if="hotel?.ex_id" class="text-[13px]">
                    ({{ hotel?.ex_id }})
                  </p>
                </div>
                <p class="text">{{ t('329') }}: {{ hotel?.phone }}</p>
                <div class="flex gap-3">
                  <p v-if="hotel?.email !== ''" class="text">Email:</p>
                  <p class="text">{{ hotel?.email }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-3">
            <div class="card-wrap mb-3">
              <div class="flex justify-between items-start">
                <div>
                  <p class="text">{{ t('309') }}</p>
                  <h4 class="card-title mb-3">{{ hotel.status_text }}</h4>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <!--            <div>-->
                <!--              <p class="text mb-1">{{ t("320") }}</p>-->
                <!--              <p class="card-title price">-->
                <!--                {{ hotel.data.price }}-->
                <!--                <sup class="text-[#555]">{{ hotel.data.currency }}</sup>-->
                <!--              </p>-->
                <!--            </div>-->
                <div class="flex items-center gap-3">
                  <p class="info">{{ t('397') }}:</p>
                  <div class="info flex items-center gap-1">
                    <i
                      class="fa-regular fa-circle-check text-success"
                      :class="statuses[hotel?.status_pay]"
                    ></i>
                    <p :class="statuses[hotel?.status_pay]">
                      {{ statusPaymantT[hotel?.status_pay] }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <p class="info">{{ t('362') }}:</p>
                <div class="info flex items-center gap-1">
                  <p class="card-title price">
                    {{ hotel?.price_usd.toFixed(2) }}
                  </p>
                  <p>{{ hotel?.currency }}</p>
                </div>
              </div>
              <div v-if="hotel?.promo_code" class="flex items-center gap-3">
                <p class="info">{{ t('743') }}:</p>
                <p class="">
                  {{ hotel?.promo_code }}
                </p>
              </div>
              <div
                v-if="hotel.status_pay !== 1 && hotel?.status !== 4"
                class="grid grid-cols-1 md:grid-cols-2 mt-3 gap-3"
              >
                <NuxtLinkLocale
                  :to="`/payment/?type=hotel&orderId=${hotel?.id}&orderType=tour&typeCode=tour`"
                  class="w-full"
                >
                  <UButton
                    class="rounded-[1rem] flex items-center justify-center bg-[#0073ff] w-full"
                    >{{ t('213') }}</UButton
                  >
                </NuxtLinkLocale>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-3">
            <div class="card-wrap mb-3">
              <p class="text">{{ t('176') }}</p>
              <h4 class="card-title mb-3">{{ hotel.main_region }}</h4>
              <div class="flex flex-col gap-1 mb-3">
                <label class="text">{{ t('123') }}</label>
                <div class="as-input mb-1">
                  <p>{{ dayjs(hotel.checkin).format('DD.MM.YYYY hh:mm') }}</p>
                </div>
                <div class="as-input">
                  <p>{{ dayjs(hotel.checkout).format('DD.MM.YYYY hh:mm') }}</p>
                </div>
              </div>
              <div class="flex items-center justify-between mb-3">
                <div>
                  <label class="label">ADL</label>
                  <div v-if="adt_count.ADT" class="input">
                    {{ adt_count.ADT }}
                  </div>
                  <div v-else class="input">0</div>
                </div>
                <div>
                  <label class="label">CHD</label>
                  <div v-if="adt_count.CHI" class="input">
                    {{ adt_count.CHI }}
                  </div>
                  <div v-else class="input">0</div>
                </div>
                <div>
                  <label class="label">INF</label>
                  <div v-if="adt_count.INF" class="input">
                    {{ adt_count.INF }}
                  </div>
                  <div v-else class="input">0</div>
                </div>
              </div>
              <!--          <el-button-->
              <!--            @click="openInvoice"-->
              <!--            v-if="hotel.data.status_pay !== 1 && order?.status !== 4"-->
              <!--            class="w-full my-2"-->
              <!--            type="primary"-->
              <!--            plain-->
              <!--            >{{ t('324') }}</el-button-->
              <!--          >-->
              <UButton
                v-if="hotel?.status_pay === 1"
                class="rounded-[1rem] w-full py-2 flex items-center justify-center"
                @click="openTicket"
                >{{ t('52') }}</UButton
              >
              <UButton
                v-if="hotel?.status === 0 || hotel?.status === 1"
                color="red"
                class="rounded-[1rem] px-4 mt-1 w-full flex items-center justify-center"
                @click="cancelStatus"
                >{{ $t('230') }}
              </UButton>
            </div>
          </div>
          <div class="col-span-12 md:col-span-3">
            <div class="card-wrap mb-3">
              <p class="text mb-1">{{ t('150') }}</p>
              <p v-html="hotel?.comment"></p>
            </div>
          </div>
        </div>
        <div class="card-wrap mt-3 py-3">
          <h5 class="p-2">{{ t('226') }}</h5>
          <UTable :rows="hotelData" :columns="hotelColumns" style="width: 100%">
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
        <div class="card-wrap mt-3 py-3">
          <h5 class="p-2">
            {{ $t('241') }}
          </h5>
          <UTable
            :rows="passengers"
            :columns="passengerColumns"
            style="width: 100%"
          />
        </div>
        <div class="grid grid-cols-12 gap-3">
          <div
            v-if="hotel.transfer_status === 1 && hotel.transfers.length !== 0"
            class="md:col-span-6 col-span-12"
          >
            <div class="card-wrap mt-3 py-3">
              <h5 class="p-2">{{ t('337') }}</h5>
              <UTable
                :rows="transferData"
                :columns="transferColumn"
                style="width: 100%"
              />
            </div>
          </div>
          <div
            v-if="hotel.insurance_status === 1"
            class="md:col-span-6 col-span-12"
          >
            <div v-if="hotel.insurances[0].price" class="card-wrap mt-3 py-3">
              <h5 class="p-2">{{ t('317') }}</h5>
              <UTable
                :rows="insuranceData"
                :columns="insuranceColumn"
                style="width: 100%"
              />
            </div>
          </div>
        </div>
        <!--    <UModal-->
        <!--      v-model="openDialogCash"-->
        <!--      :fullscreen="!!isScreenSmall"-->
        <!--      :title="$t('757')"-->
        <!--      width="50%"-->
        <!--    >-->
        <!--      <div-->
        <!--        class="w-full h-[80vh] md:h-full flex flex-col justify-center items-center p-5"-->
        <!--      >-->
        <!--        <div class="mb-3">-->
        <!--          <img class="w-[100px] m-auto" src="/images/logo.svg" alt="logo" />-->
        <!--        </div>-->
        <!--        <div class="w-full text-center">-->
        <!--          <div class="mb-3">-->
        <!--            <span class="me-2">-->
        <!--              {{ $t('703') }}-->
        <!--            </span>-->
        <!--            <br />-->
        <!--            <NuxtLink to="/offices" class="mt-3 block">-->
        <!--              <UButton color="blue">-->
        <!--                {{ $t('757') }}-->
        <!--              </UButton>-->
        <!--            </NuxtLink>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--    </UModal>-->
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
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const { width } = useWindowSize()

const { t } = useI18n()
const orderStore = useOrdersStore()
const route = useRoute()
const hotel = ref(null)
const adt_count = ref({})
const dialogVisible = ref(false)

const errorDialog = ref(false)
const isScreenSmall = ref(width.value < 768)
const { myToast } = useCustomToast()

const statusPaymantT = ref(statusPaymant(t))
const statuses = {
  0: '!text-red-500',
  1: '!text-green-500',
  2: '!text-[#0073FF]',
  3: '!text-yellow-500',
  4: '!text-green-500',
}
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
const insuranceColumn = [
  {
    label: t('362'),
    key: 'price',
  },
  {
    label: 'Netto',
    key: 'price_netto',
  },
  {
    label: t('148'),
    key: 'count',
  },
]
const transferColumn = [
  {
    label: t('362'),
    key: 'price',
  },
  {
    label: 'Netto',
    key: 'price_netto',
  },
  {
    label: t('148'),
    key: 'count',
  },
  {
    label: t('115'),
    key: 'type',
  },
]

const passengers = computed(() => {
  return hotel.value?.passenger.map((item, i) => {
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
const hotelData = computed(() => {
  return hotel.value.hotels.map((item) => {
    return {
      status_text: item.status_text,
      hotel_name: item.hotel_name,
      room_name: item.room_name,
      transfer: item.transfer ? item.transfer : '-',
      food: item.food ? item.food : '-',
    }
  })
})
const transferData = computed(() => {
  return hotel.value.transfers.map((item) => {
    return {
      price: item.price,
      price_netto: item.price_netto,
      count: hotel.value.insurances.length,
      type: item.type === 1 ? t('85') : t('136'),
    }
  })
})
const insuranceData = computed(() => {
  return hotel.value.insurances.map((item) => {
    return {
      price: item.price,
      price_netto: item.price_netto,
      count: hotel.value.insurances.length,
    }
  })
})

const handleResize = () => {
  isScreenSmall.value = window.innerWidth < 768
}
const getHotelItem = (id) => {
  return new Promise((resolve, reject) => {
    useApi()
      .$get(
        `/v1/hotel/order/${id}?include=manager,status_text,passenger.passenger,hotels,insurances,transfers,comment`,
        {
          params: {
            platform: 'app',
          },
        },
      )
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const cancelStatus = () => {
  useApi()
    .$get(`/v1/hotel/cancel/${route.params.id}`)
    .then(async () => {
      hotel.value = await getHotelItem(route.params.id)
    })
    .catch((err) => {
      myToast('error', err?.response?.data?.message)
      // toast.error(err.response.data.message)
      console.log(err)
    })
}

const openDialog = async () => {
  await orderStore.fetchMyCards()
  dialogVisible.value = true
  // let res = await hotelPayment(route.params.id);
  // paymentLinks.value = res;
}

// const openInvoice = () => {
//   // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
//   const pdfUrl = `https://api.asialuxe.app/v1/hotel/invoice?id=${route.params.id}`
//
//   // Open the PDF in a new window or tab
//   window.open(pdfUrl, '_blank')
// }

const openTicket = () => {
  // Replace 'your-pdf-file.pdf' with the actual path to your PDF file
  const pdfUrl = `https://api.asialuxe.app/v1/hotel/voucher?id=${route.params.id}`

  // Open the PDF in a new window or tab
  window.open(pdfUrl, '_blank')
}

onMounted(async () => {
  hotel.value = await getHotelItem(route.params.id)

  adt_count.value = hotel.value.passenger.reduce((acc, obj) => {
    const category = obj.passenger.type
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})
  hotel.value.hotels.forEach((elem) => {
    elem.status_text = hotel.value.status_text
  })
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
if (route.query?.msg && route.query.status) {
  errorDialog.value = true
}
useSeoMeta({
  title: t('690'),
  ogTitle: t('690'),
  description: t('739') + ': ' + t('224'),
  ogDescription: t('739') + ': ' + t('224'),
})
</script>

<style scoped lang="scss">
.card-wrap {
  background: #fff;
  padding: 12px;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  .as-input {
    border: 1px solid #cecece;
    border-radius: 10px;
    padding: 6px 12px;
    p {
      font-size: 14px;
      font-weight: 500;
    }
  }
  .card-title {
    font-size: 20px;
    font-weight: 500;
  }
  .text {
    font-size: 14px;
    font-weight: 500;
    color: #666;
  }
  .price {
    color: #288654;
  }
  .label {
    font-size: 13px;
    font-weight: 500;
    color: #666;
  }
  .input {
    border: 1px solid #cecece;
    border-radius: 10px;
    padding: 6px;
    width: 70px;
    font-size: 14px;
    font-weight: 500;
  }
}
.wallet-pay input:checked + div {
  border: 1px solid #3392ff;
  box-shadow: 0 0.5rem 1rem rgba(51, 146, 255, 0.15) !important;
}
</style>
