<template>
  <div>
    <UIHeader without-image>
      <p v-if="order">
        {{ $t('214') }}, {{ $t('320') }}: {{ order.price.toFixed(2) }}
        {{ order.currency }}
      </p>
    </UIHeader>
    <div v-if="order" class="container mt-[120px]">
      <ProfilePayment
        :order-id="route.query.orderId"
        :type="route.query.orderType"
        :email="order?.email"
        :last_name="order?.full_name"
        :currency="order?.currency"
        :price="order?.price.toFixed(2)"
        :type_code="route.query.typeCode"
        :gtag="'Avia_Octo_Window'"
        :return-url="`https://asialuxe.uz/${locale}/orders/${route.query.type}/${route.query.orderId}`"
        @on-close="dialogVisible = false"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'

import { useOrdersStore } from '~/stores/orders'
import type { IResponse } from '~/types'
import type { IOrderAviaSingle } from '~/types/avia'
const orderStore = useOrdersStore()
const route = useRoute()
const { locale } = useI18n()

const order: Ref<IOrderAviaSingle | null> = ref(null)
const orderItem = async (id: string) => {
  try {
    const res = await useApi().$get<IResponse<IOrderAviaSingle>>(
      `/v1/flight/order/${id}?include=passengers.books.flight,directions`,
    )
    order.value = res.data
  } catch (e) {
    console.log(e)
  }
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
        order.value = res.data
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function fetchOrder() {
  if (route.query.type === 'avia') {
    orderItem(route.query.orderId)
  }
  if (route.query.type === 'hotel') {
    getHotelItem(route.query.orderId)
  }
}
fetchOrder()
Promise.allSettled([orderStore.fetchMyCards()]).catch((err: Error) => {
  console.log(err)
})
</script>
