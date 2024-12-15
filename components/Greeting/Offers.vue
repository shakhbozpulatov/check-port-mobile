<template>
  <div
    v-if="Object.keys(store.offers)?.length && store.offers?.airport?.code"
    class="flex items-center justify-center mb-[40px]"
  >
    <div class="offers-wrap w-[800px] rounded-[1rem] p-[20px] bg-white">
      <div class="flex items-center justify-between text-[20px] font-semibold">
        <div class="flex flex-wrap items-center gap-2">
          <p class="">{{ store.offers.product }}</p>
          <p>
            ({{ store.offers.airport.city }} - {{ store.offers.airport.code }})
          </p>
        </div>

        <p class="text-[#007eef]">
          {{ formatNumber(Math.ceil(store.offers.price)) }}
          {{ store.offers.currency }}
        </p>
      </div>
      <div class="grid grid-cols-3 gap-3 my-[24px]">
        <div>
          <label for="terminal" class="text-sm font-medium">{{
            $t('330')
          }}</label>
          <USelectMenu
            id="terminal"
            v-model="bookingData.flight_terminal"
            :ui="{
              base: `!h-[35px]`,
            }"
            :placeholder="$t('330')"
            :options="store.offers?.airport?.terminal"
            :class="{ error: v$.flight_terminal.$error }"
            class="alt_select"
          >
          </USelectMenu>
        </div>
        <div>
          <label for="flight-number" class="text-sm font-medium">{{
            $t('199')
          }}</label>
          <FormCInput
            v-model="bookingData.flight_number"
            :class="{ error: v$.flight_number.$error }"
            :placeholder="$t('199')"
            size="large"
          />
        </div>
        <div>
          <label for="flight-number" class="text-sm font-medium">{{
            $t('63')
          }}</label>
          <VueDatePicker
            v-model="bookingData.flight_time"
            :class="{ error: v$.flight_time.$error }"
            time-picker
            :placeholder="$t('63')"
            format="HH:mm"
          />
        </div>
      </div>
      <div class="my-[24px]">
        <h5 class="b-title">{{ $t('89') }}</h5>
        <div class="grid md:grid-cols-3 gap-3">
          <CInput
            id="user_name"
            v-model="bookingData.full_name"
            :text="$t('261')"
            :error="v$.full_name.$error"
            :placeholder="$t('261')"
            required
            is-latin
          />
          <CInput
            id="user_email"
            v-model="bookingData.email"
            :text="$t('371')"
            :error="v$.email.$error"
            :placeholder="$t('371')"
            required
            type="email"
          />
          <div>
            <CLabel for-id="" :text="$t('200')" />
            <VueTelInput
              v-bind="editBindProps"
              v-model="bookingData.phone"
              class="py-[2px]"
              :class="{
                error_input: touched ? !phoneValidation?.valid : false,
              }"
              @validate="(e) => (phoneValidation = e)"
            ></VueTelInput>
          </div>
        </div>
      </div>

      <div
        v-for="(elem, index) in bookingData.passengers"
        :key="index"
        class="mb-3"
      >
        <p v-if="elem.type === 'ADT'" class="b-text">
          {{ index + 1 }} - {{ $t('58') }}
        </p>
        <p v-else-if="elem.type === 'CHI'" class="b-text">
          {{ index + 1 }} - {{ $t('103') }}
        </p>
        <p v-else class="b-text">{{ index + 1 }} - {{ $t('167') }}</p>
        <div class="grid md:grid-cols-3 gap-3">
          <CInput
            id="last_name"
            v-model="elem.last_name"
            :text="$t('357')"
            :error="
              v$.passengers.$each.$response?.$data[index]?.last_name?.$error
            "
            :placeholder="$t('357')"
            is-latin
            required
            input-class="!uppercase"
          />
          <CInput
            id="first_name"
            v-model="elem.first_name"
            :text="$t('135')"
            :error="
              v$.passengers.$each.$response?.$data[index]?.first_name?.$error
            "
            :placeholder="$t('135')"
            is-latin
            required
            input-class="!uppercase"
          />
          <div class="w-full">
            <CLabel for-id="" :text="$t('102')" />
            <VueDatePicker
              v-model="elem.birth"
              text-input
              :enable-time-picker="false"
              :format-locale="locales[locale]"
              placeholder="DD.MM.YYYY"
              format="dd/MM/yyyy"
              :class="{
                error:
                  v$.passengers.$each.$response?.$data[index]?.birth?.$error,
              }"
              :month-change-on-scroll="false"
              auto-apply
              class="dark:!bg-gray-800"
            />
          </div>
          <div class="w-full">
            <CLabel for-id="" :text="$t('258')" />
            <USelectMenu
              v-model="elem.gender"
              class="!w-full alt_select"
              :class="{
                error:
                  v$.passengers.$each.$response?.$data[index]?.gender?.$error,
              }"
              :placeholder="$t('73')"
              :options="genders"
              option-attribute="label"
              value-attribute="value"
            >
            </USelectMenu>
          </div>
          <div class="w-full">
            <CLabel for-id="" :text="$t('84')" />
            <USelectMenu
              v-model="elem.citizenship"
              filterable
              :class="{
                error:
                  v$.passengers.$each.$response?.$data[index]?.citizenship
                    ?.$error,
              }"
              class="!w-full alt_select"
              :options="citizenships"
              option-attribute="name_ru"
              value-attribute="code"
            >
            </USelectMenu>
          </div>
          <CInput
            id="document_number"
            v-model="elem.document_number"
            :text="$t('297')"
            is-latin
            :error="
              v$.passengers.$each.$response?.$data[index]?.document_number
                ?.$error
            "
            :placeholder="t('297')"
            input-class="!uppercase"
            required
            @change="onDocumentNumber(index, elem.type)"
          />
          <div class="w-full">
            <CLabel for-id="" :text="$t('304')" />
            <vue-date-picker
              v-model="elem.document_expire"
              class="!w-full"
              placeholder="DD.MM.YYYY"
              type="date"
              auto-apply
              size="large"
              :disabled-date="disableFutureDates"
              format="dd/MM/yyyy"
              value-format="YYYY-MM-DD"
            />
          </div>
          <div v-if="elem.type === 'INF' && parents.length > 0">
            <CLabel for-id="" :text="$t('290')" />
            <USelectMenu
              v-model="elem.parent_document_number"
              class="!w-full alt_select"
              :class="{
                error:
                  v$.passengers.$each.$response?.$data[index]
                    ?.parent_document_number?.$error,
              }"
              :options="parents"
              option-attribute="parent_document_number"
              value-attribute="parent_document_number"
            >
            </USelectMenu>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg mt-6">
        <h5 class="b-title mb-3">{{ t('11') }}</h5>
        <UTextarea
          v-model="bookingData.comment"
          :autosize="{ minRows: 5, maxRows: 10 }"
          type="textarea"
          :placeholder="t('11') + '...'"
          class=""
        />
      </div>
      <div class="flex items-end flex-col justify-end mt-[20px]">
        <div class="moreinfo my-2">
          <UCheckbox v-model="agreement" :label="t('376')" size="large" />
        </div>
        <UButton
          :loading="loading"
          :disabled="!agreement"
          type="primary"
          class="justify-center"
          @click="bookBtn"
          >{{ $t('120') }}</UButton
        >
      </div>
    </div>
    <!--    <CNeedPayOrderDialog-->
    <!--      :error-data="needPayOrders[0]?.data"-->
    <!--      @on-loading="loading = false"-->
    <!--      @on-agreement="agreement = false"-->
    <!--    />-->
  </div>
</template>
<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'
import '@vuepic/vue-datepicker/dist/main.css'

import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import VueDatePicker from '@vuepic/vue-datepicker'
import { az, bg, cs, enUS, ru, tr, uz } from 'date-fns/locale'
import dayjs from 'dayjs'
import { VueTelInput } from 'vue-tel-input'

import CInput from '@/components/Form/CInput.vue'
import CLabel from '@/components/Form/CLabel.vue'
import { formatNumber } from '@/utils'

const store = useGreetingStore()
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const agreement = ref(false)

const parents = ref([])
const loading = ref(false)
const needPayOrders = ref([])

const locales = {
  en: enUS,
  uz: uz,
  tr: tr,
  bg: bg,
  che: cs,
  az: az,
  ru: ru,
}
const passengerObject = {
  type: 'ADT',
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  birth: '',
  gender: '',
  citizenship: '',
  document_number: '',
  document_expire: '',
}
const bookingData = reactive({
  phone: '',
  email: '',
  full_name: '',
  comment: '',
  adt_qnt: 1,
  chi_qnt: 0,
  inf_qnt: 0,
  airport: '',
  type: route.query.type,
  flight_date: '',
  flight_time: '',
  flight_number: '',
  flight_terminal: String(''),
  currency: useCookie('currency').value || 'USD',
  passengers: [],
})
const genders = [
  {
    value: 'MALE',
    label: t('170'),
  },
  {
    value: 'FEMALE',
    label: t('118'),
  },
]
const phoneValidation = ref(null)
const touched = ref(false)
const editBindProps = ref({
  mode: 'international',
  dropdownOptions: {
    disabledDialCode: true,
    showDialCodeInList: true,
    showFlags: true,
    showSearchBox: true,
    width: '260px',
  },
  validCharactersOnly: true,
  inputOptions: {
    showDialCode: true,
    maxlength: 25,
  },
})
const citizenships = computed(() => dashboardStore.citizenship)
const rules = computed(() => {
  return {
    flight_number: {
      required,
    },
    flight_terminal: {
      required,
    },
    flight_time: {
      required,
    },
    full_name: {
      required,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
    },
    passengers: {
      $each: helpers.forEach({
        first_name: {
          required,
        },
        last_name: {
          required,
        },
        birth: {
          required,
        },
        gender: {
          required,
        },
        citizenship: {
          required,
        },
        document_number: {
          required,
        },
        // document_expire: {
        //   required,
        // },
        parent_document_number: {
          required,
        },
      }),
    },
  }
})
const v$ = useVuelidate(rules, bookingData, {
  $lazy: true,
})

const bookBtn = async () => {
  bookingData.adt_qnt = store.offers.adt_qnt
  bookingData.chi_qnt = store.offers.chi_qnt
  bookingData.inf_qnt = store.offers.inf_qnt
  bookingData.flight_date = store.offers.date
  bookingData.airport = store.offers.airport.code
  touched.value = true
  const result = await v$.value.$validate()
  if (result && phoneValidation.value?.valid) {
    bookingData.passengers.forEach((item) => {
      item.birth = dayjs(item?.birth).format('YYYY-MM-DD')
    })
    loading.value = true
    bookingData.type = route.query.type
    await useApi()
      .$post('/v1/service/book-meet', {
        body: bookingData,
        params: {
          platform: 'app',
        },
      })
      .then((res) => {
        router.push({
          name: 'GreetingSingle',
          params: { id: res?.data?.id },
        })
        console.log(res)
      })
      .catch((err) => {
        console.log(err, 'greet and meet')
        if (err.response?.status === 423) {
          needPayOrders.value.push(err.response?.data?.errors)
          // config.bookError = true
        }
        // toast.error(err.response.data.message)
        console.log(err)
      })
      .finally(() => {
        loading.value = false
      })
  }
}
Promise.all([dashboardStore.getCitizenship()]).catch((e) => {
  console.log(e)
})
watch(
  () => store.offers,
  async () => {
    bookingData.passengers = []
    for (let i = 0; i < store.offers.adt_qnt; i++) {
      bookingData.passengers.push({
        ...passengerObject,
        type: 'ADT',
      })
      parents.value.push({
        parent_document_number: '',
      })
    }
    for (let i = 0; i < store.offers.chi_qnt; i++) {
      bookingData.passengers.push({
        ...passengerObject,
        type: 'CHI',
      })
    }
    for (let i = 0; i < store.offers.inf_qnt; i++) {
      bookingData.passengers.push({
        ...passengerObject,
        type: 'INF',
        parent_document_number: '',
      })
    }
    if (
      authStore.user?.userDetail?.first_name ||
      authStore.user?.userDetail?.last_name
    ) {
      bookingData.full_name = `${
        authStore.user?.userDetail?.first_name ?? ''
      } ${authStore.user?.userDetail?.last_name ?? ''}`
    }
  },
  { immediate: true, deep: true },
)
function disableFutureDates(time) {
  const currentDate = new Date()
  const oneMonthAhead = new Date()
  oneMonthAhead.setMonth(currentDate.getMonth() + 5)
  return time.getTime() < oneMonthAhead.getTime()
}
const onDocumentNumber = (index: number, type: string) => {
  if (type === 'ADT') {
    parents.value[index].parent_document_number =
      bookingData.passengers[index].document_number
  }
}
const toUpperCaseFields = (passenger) => {
  if (passenger.first_name) {
    passenger.first_name = passenger.first_name.toUpperCase()
  }
  if (passenger.last_name) {
    passenger.last_name = passenger.last_name.toUpperCase()
  }
  if (passenger.document_number) {
    passenger.document_number = passenger.document_number.toUpperCase()
  }
}
watch(
  () => bookingData.passengers,
  (newPassengers) => {
    newPassengers.forEach((passenger) => toUpperCaseFields(passenger))
  },
  { deep: true },
)
onBeforeUnmount(() => {
  store.$reset()
})
</script>
<style scoped lang="scss">
.offers-wrap {
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}
.error_input {
  border: 1px solid red;
}
</style>
