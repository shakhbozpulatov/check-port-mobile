<template>
  <div>
    <form @submit.prevent="onPaymentWithCard">
      <div class="grid grid-cols-12 gap-3">
        <div
          :class="
            form.cardType !== 'Visa, MasterCard'
              ? 'md:col-span-3'
              : 'md:col-span-2'
          "
          class="mb-3 col-span-12 flex flex-col"
        >
          <label for="cardSelect" class="form-label me-2 text-sm">{{
            $t('169')
          }}</label>
          <select
            id="cardSelect"
            v-model="form.selectedCard"
            class="form-select rounded-[1rem] h-[48px] outline-none border py-2 px-1 border-[#e5e7eb]"
          >
            <option v-for="card in cards" :key="card.value" :value="card.value">
              {{ card.label }}
            </option>
            <option
              v-for="(card, index) in myCards"
              :key="index + 'card'"
              :value="card?.data?.id"
            >
              {{ card?.data?.title }}
            </option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-2 items-end mb-2">
        <div
          v-if="form.selectedCard === 'new_card'"
          class="col-span-12 flex flex-col"
          :class="
            form.cardType !== 'bank_card' && form.cardType !== 'trl'
              ? 'md:col-span-3'
              : 'md:col-span-2'
          "
        >
          <label for="typeSelect" class="form-label text-sm">{{
            $t('334')
          }}</label>
          <select
            id="typeSelect"
            v-model="form.cardType"
            class="form-select rounded-[1rem] h-[48px] outline-none border py-2 px-1 border-[#e5e7eb]"
            :aria-label="$t('359')"
            required
            @change="resInputs"
          >
            <!--          <option value="Новая карта">-</option>-->
            <option value="uzcard">Uzcard</option>
            <option value="humo">Humo</option>
            <!--          <option value="Наличные">{{ $t("175") }}</option>-->
            <option value="bank_card">Visa, MasterCard</option>
            <option value="trl">Türk banka kartı</option>
          </select>
        </div>
        <div
          v-if="form.selectedCard === 'new_card'"
          class="mb-3 md:mb-0 col-span-12 md:col-span-3"
        >
          <label for="cardNumberInput" class="form-label text-sm">{{
            $t('197')
          }}</label>
          <input
            id="cardNumberInput"
            v-model="form.cardNumber"
            type="text"
            inputmode="numeric"
            class="form-control border-[#e5e7eb] rounded-[1rem] outline-none w-full border p-3"
            placeholder="____-____-____-____"
            @input="formatCardNumber"
          />
        </div>
        <div
          v-if="form.selectedCard === 'new_card'"
          class="mb-3 md:mb-0 col-span-12 md:col-span-2"
        >
          <label for="monthSelect" class="form-label text-sm">{{
            $t('70')
          }}</label>
          <select
            id="monthSelect"
            v-model="form.month"
            class="form-select rounded-[1rem] h-[48px] outline-none border py-2 px-1 border-[#e5e7eb] w-full"
          >
            <option value="" disabled selected hidden>MM</option>
            <option v-for="month in months" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
        </div>
        <div
          v-if="form.selectedCard === 'new_card'"
          class="mb-3 md:mb-0 col-span-12 md:col-span-2"
        >
          <label for="yearSelect" class="form-label text-sm">{{
            $t('69')
          }}</label>
          <select
            id="yearSelect"
            v-model="form.year"
            class="form-select rounded-[1rem] h-[48px] outline-none border p-3 border-[#e5e7eb] w-full"
          >
            <option value="" disabled selected hidden>YYYY</option>
            <option v-for="year in years" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        <div
          v-if="form.cardType === 'bank_card' || form.cardType === 'trl'"
          class="mb-3 md:mb-0 col-span-12 md:col-span-1"
        >
          <label for="cardNumberInput" class="form-label text-sm">CVV</label>
          <input
            id="cardNumberInput"
            v-model="form.cvv"
            type="text"
            inputmode="numeric"
            class="form-control border-[#e5e7eb] rounded-[1rem] outline-none w-full border p-3"
            placeholder="CVV"
          />
        </div>
        <div
          v-if="form.selectedCard === 'new_card'"
          class="form-check col-span-12 items-center gap-2 mb-3 flex"
        >
          <input
            id="saveCard"
            v-model="form.save"
            class="form-check-input"
            type="checkbox"
          />
          <label class="form-check-label" for="saveCard">
            {{ $t('303') }}
          </label>
        </div>
        <div class="col-span-12 md:col-span-2">
          <UButton
            :loading="loading"
            type="submit"
            :disabled="loading"
            class="bg-[#0073ff] rounded-[1rem] !h-[48px] order-1 w-full md:order-[0] mb-3 md:mb-0 flex items-center justify-center"
          >
            {{ $t('216') }}
          </UButton>
        </div>
      </div>
    </form>
    <form
      id="payForm"
      class="absolute opacity-0 h-1"
      autocomplete="off"
      action="https://sanalposprov.garanti.com.tr/servlet/gt3dengine"
      method="post"
    >
      <input type="hidden" autocomplete="false" />
      <input type="hidden" name="secure3dsecuritylevel" value="3D_PAY" />
      <input type="hidden" name="mode" value="PROD" />
      <input type="hidden" name="apiversion" value="v0.01" />
      <input type="hidden" name="terminalprovuserid" value="PROVAUT" />
      <input type="hidden" name="terminaluserid" value="18091065280" />
      <input type="hidden" name="terminalmerchantid" value="1563084" />
      <input type="hidden" name="txntype" value="sales" />
      <input v-model="trlForm.txnamount" type="hidden" name="txnamount" />
      <input type="hidden" name="txncurrencycode" value="949" />
      <input type="hidden" name="txninstallmentcount" value="" />
      <input v-model="trlForm.orderid" type="hidden" name="orderid" />
      <input type="hidden" name="terminalid" value="10228604" />
      <input v-model="trlForm.successurl" type="hidden" name="successurl" />
      <input v-model="trlForm.errorurl" type="hidden" name="errorurl" />
      <input
        v-model="trlForm.customeripaddress"
        type="hidden"
        name="customeripaddress"
      />
      <input type="hidden" name="customeremailaddress" :value="email" />
      <input v-model="trlForm.secure3dhash" type="hidden" name="secure3dhash" />
      <input type="hidden" name="orderFam" :value="last_name" />
      <input
        id="cardNumber"
        v-model="trlForm.cardnumber"
        required
        placeholder="xxxx-xxxx-xxxx-xxxx"
        name="cardnumber"
        type="text"
        class="form-control"
      />
      <input
        id="cardExpireMonth"
        v-model="trlForm.cardexpiredatemonth"
        required
        name="cardexpiredatemonth"
        placeholder="mm"
        type="text"
        class="mr-3 form-control"
      />
      <input
        id="cardExpireYear"
        v-model="trlForm.cardexpiredateyear"
        required
        name="cardexpiredateyear"
        placeholder="yy"
        type="text"
        class="form-control"
      />
      <input
        id="cardName"
        v-model="trlForm.cardName"
        required
        :placeholder="$t('135')"
        name="cardName"
        type="text"
        class="form-control"
      />
      <input
        id="cardCcv"
        v-model="trlForm.cardcvv2"
        required
        placeholder="xxx"
        name="cardcvv2"
        type="text"
        class="form-control"
      />
      <button id="payFormSubmit" ref="myButton" class="btn btn-primary w-full">
        {{ $t('213') }}
      </button>
    </form>
    <Teleport to="body">
      <MbscPopup
        :is-open="iframeModal"
        fullscreen
        class="z-[1000]"
        @close="emit('on-close')"
      >
        <div class="flex mb-3 justify-between items-center w-full">
          <p class="font-bold text-[16px]">{{ $t('429') }} {{ orderId }}</p>
          <UButton
            size="sm"
            color="white"
            class="rounded-[1rem]"
            variant="ghost"
            @click="iframeModal = false"
          >
            <i class="fa-solid fa-xmark text-[16px]"></i>
          </UButton>
        </div>
        <iframe
          v-if="octoResponse"
          ref="iframe"
          :src="octoResponse.url"
          class="!w-full"
          width="100%"
          height="600"
        ></iframe>
      </MbscPopup>
    </Teleport>
  </div>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'
import { useRoute } from 'vue-router'

import { useApi } from '~/composables/useApi'
const { t } = useI18n()
const { myToast } = useCustomToast()
interface Props {
  type: string
  returnUrl: string
  orderId: string
  email: string
  last_name: string
  type_code: string
  price: string
  currency: string
  gtag: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'on-submit'): void
  (e: 'on-close'): void
}>()
const route = useRoute()
const paymentStore = useOrdersStore()

const myCards = computed(() => paymentStore.cards)
console.log('cards', myCards.value)
const paymentCardForm = computed(() => {
  if (form.selectedCard === 'new_card') {
    return {
      card_number: form.cardNumber.replace(/\s/g, ''),
      expire_year: form.year + '',
      expire_month: form.month <= 9 ? '0' + form.month : form.month + '',
      type: form.cardType.toLowerCase(),
      cvv: form.cvv || undefined,
      order_type: props.type,
      order_id: Number(props.orderId),
      return_url: props.returnUrl,
      save_card: form.save ? 1 : 0,
    }
  } else {
    return {
      card_id: form.selectedCard,
      order_type: props.type,
      order_id: Number(props.orderId),
      return_url: props.returnUrl,
      save_card: form.save ? 1 : 0,
    }
  }
})
const resInputs = () => {
  ;(form.cardNumber = ''), (form.year = ''), (form.month = 0), (form.cvv = '')
}
const loading = ref(false)
const isScreenSmall = ref(window.innerWidth < 768)
const iframeModal = ref(false)
const octoResponse = ref(null)
const myButton = ref(null)
const form = reactive({
  selectedCard: 'new_card',
  cardNumber: '',
  cardType: '',
  year: '',
  month: 0,
  cvv: '',
  save: false,
})
const trlForm = ref({
  secure3dsecuritylevel: '3D_PAY',
  mode: 'PROD',
  apiversion: 'v0.01',
  terminalprovuserid: 'PROVAUT',
  terminaluserid: '18091065280',
  terminalmerchantid: '1563084',
  txntype: 'sales',
  txnamount: '',
  txncurrencycode: '949',
  txninstallmentcount: '',
  orderid: '',
  terminalid: '10228604',
  successurl: 'https://api.asialuxe.app/payment/uzum/try',
  errorurl: 'https://api.asialuxe.app/payment/uzum/try',
  customeripaddress: '',
  customeremailaddress: '',
  secure3dhash: '',
  orderFam: '',
  cardnumber: '',
  cardexpiredatemonth: '',
  cardexpiredateyear: '',
  cardName: '',
  cardcvv2: '',
})

const onTrlPayment = async () => {
  trlForm.value.cardnumber = form.cardNumber.replace(/\s/g, '')
  trlForm.value.cardexpiredatemonth =
    form.month <= 9 ? '0' + form.month : form.month + ''
  trlForm.value.cardexpiredateyear = String(form.year).slice(-2)
  trlForm.value.cardcvv2 = form.cvv
  trlForm.value.cardName = props.last_name
  trlForm.value.customeremailaddress = props.email
  trlForm.value.orderFam = props.last_name
  trlForm.value.orderid = props.orderId
  await nextTick()
  myButton.value?.click()
}
const onPaymentWithCard = () => {
  if (form.cardType === 'trl') {
    onTrlPayment()
  } else {
    loading.value = true

    useApi()
      .$post('/v1/finance/payment-octo', {
        body: paymentCardForm.value,
      })
      .then((response) => {
        octoResponse.value = response
        iframeModal.value = true
      })
      .catch((err) => {
        console.log(err)
        myToast('error', t('685'))
        // toast.error(t('685'))
      })
      .finally(() => {
        loading.value = false
      })
  }
}
const fetchHashApi = async () => {
  try {
    const res = await useApi().$get<{
      hash: string
      ipAddress: string
      amount: string
      strSuccessURL: string
      strErrorURL: string
    }>(`payment/try/hash?id=${route.query.orderId}&type=${props.type_code}`)
    trlForm.value.secure3dhash = res?.hash
    trlForm.value.customeripaddress = res?.ipAddress
    trlForm.value.txnamount = res?.amount
    trlForm.value.successurl = res?.strSuccessURL
    trlForm.value.errorurl = res?.strErrorURL
  } catch (e) {
    console.log(e)
  }
}
watch(
  () => form.cardType,
  (val) => {
    if (val === 'trl') {
      fetchHashApi()
    }
  },
)
const formatCardNumber = () => {
  let cleanedValue = form.cardNumber.replace(/\D/g, '')
  cleanedValue = cleanedValue.slice(0, 16)
  form.cardNumber = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ')
}
const cards = ref([
  {
    value: 'new_card',
    type: 'new_card',
    label: 'Новая карта',
    year: '',
    month: '',
    number: '',
  },
])
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, index) => currentYear + index)
const months = Array.from({ length: 12 }, (_, index) => index + 1)
</script>
