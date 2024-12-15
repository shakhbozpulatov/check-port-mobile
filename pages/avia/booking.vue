<template>
  <div>
    <UIHeader without-image> {{ $t('823') }} </UIHeader>
    <div class="container mt-32">
      <div class="grid grid-cols-12 gap-3">
        <form
          class="p-3 shadow bg-white rounded-lg col-span-12 md:col-span-8 booking-form"
          @submit.prevent="submitForm"
        >
          <div class="bg-white rounded-lg">
            <h5 class="b-title">{{ $t('89') }}</h5>
            <div class="grid md:grid-cols-3 gap-3">
              <CInput
                id="user_name"
                v-model="state.full_name"
                :text="$t('356')"
                :error="v$.full_name.$error"
                :placeholder="t('356')"
                required
                is-latin
              />
              <CInput
                id="user_email"
                v-model="state.email"
                :text="$t('371')"
                :error="v$.email.$error"
                :placeholder="t('371')"
                required
                type="email"
              />
              <div>
                <CLabel for-id="" :text="$t('200')" />
                <VueTelInput
                  v-bind="editBindProps"
                  v-model="state.phone"
                  class="py-[2px]"
                  :class="{
                    'border-red-700': touched ? !phoneValidation?.valid : false,
                  }"
                  @validate="(e) => (phoneValidation = e)"
                ></VueTelInput>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg mt-6">
            <h5 class="b-title mb-4">{{ t('88') }}</h5>
            <div
              v-for="(elem, index) in state.passengers"
              :key="index"
              class="mb-3"
            >
              <div class="flex justify-between items-center mb-3">
                <p v-if="elem.type === 'ADT'" class="b-text">
                  {{ index + 1 }} - {{ t('58') }}
                </p>
                <p v-else-if="elem.type === 'CHI'" class="b-text">
                  {{ index + 1 }} - {{ t('103') }}
                </p>
                <p v-else class="b-text">{{ index + 1 }} - {{ t('167') }}</p>
                <USelectMenu
                  v-if="authStore.loggedIn"
                  v-model="elem.index"
                  :placeholder="$t('241')"
                  :options="options(elem.type)"
                  option-attribute="label"
                  value-attribute="value"
                  class="!w-[200px] alt_select"
                  @change="choosePassenger(index, elem.index)"
                >
                  <template #option-empty="{ query }">
                    <q>{{ query }}</q> {{ $t('768') }}
                  </template>
                  <template #empty> {{ $t('768') }} </template>
                </USelectMenu>
              </div>
              <div class="grid md:grid-cols-3 gap-3">
                <CInput
                  id="last_name"
                  v-model="elem.last_name"
                  :text="$t('357')"
                  :error="
                    v$.passengers?.$each.$response?.$data[index]?.last_name
                      ?.$error
                  "
                  :placeholder="t('357')"
                  is-latin
                  required
                  input-class="uppercase"
                  @update:model-value="checkChangedValues(index)"
                />
                <CInput
                  id="first_name"
                  v-model="elem.first_name"
                  :text="$t('135')"
                  :error="
                    v$.passengers?.$each.$response?.$data[index]?.first_name
                      ?.$error
                  "
                  :placeholder="t('135')"
                  is-latin
                  required
                  input-class="uppercase"
                  @update:model-value="checkChangedValues(index)"
                />
                <div class="w-full">
                  <CLabel for-id="" :text="$t('102')" />
                  <VueDatePicker
                    v-model="elem.birth"
                    text-input
                    :enable-time-picker="false"
                    :format-locale="locales[locale]"
                    placeholder="DD.MM.YYYY"
                    :disabled-dates="
                      (e) =>
                        elem?.type === 'ADT'
                          ? disableAdultCalendar(
                              e,
                              ticketDetail?.data?.[0]?.segments?.[0]?.departure
                                ?.date_format,
                            )
                          : elem?.type === 'CHI'
                            ? disableChildCalendar(
                                e,
                                ticketDetail?.data?.[0]?.segments?.[0]
                                  ?.departure?.date_format,
                              )
                            : disableInfantCalendar(
                                e,
                                ticketDetail?.data?.[0]?.segments?.[0]
                                  ?.departure?.date_format,
                              )
                    "
                    format="dd/MM/yyyy"
                    :class="{
                      error:
                        v$.passengers.$each.$response?.$data[index]?.birth
                          ?.$error,
                    }"
                    :month-change-on-scroll="false"
                    auto-apply
                    @update:model-value="checkChangedValues(index)"
                  />
                </div>
                <div class="w-full">
                  <CLabel for-id="" :text="$t('258')" />
                  <USelectMenu
                    v-model="elem.gender"
                    class="alt_select w-full"
                    :class="{
                      error:
                        v$.passengers?.$each.$response?.$data[index]?.gender
                          ?.$error,
                    }"
                    :placeholder="$t('73')"
                    :options="genders"
                    option-attribute="label"
                    value-attribute="value"
                    @update:model-value="checkChangedValues(index)"
                  >
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> {{ $t('768') }}
                    </template>
                    <template #empty> {{ $t('768') }} </template>
                  </USelectMenu>
                </div>
                <div class="w-full">
                  <CLabel for-id="" :text="$t('84')" />
                  <USelectMenu
                    v-if="citizenship?.length"
                    v-model="elem.citizenship"
                    searchable
                    :search-attributes="['name_ru']"
                    :class="{
                      error:
                        v$.passengers?.$each.$response?.$data[index]
                          ?.citizenship?.$error,
                    }"
                    class="alt_select w-full"
                    :options="citizenship"
                    option-attribute="name_ru"
                    value-attribute="code"
                    :placeholder="$t('73')"
                    @update:model-value="checkChangedValues(index)"
                  >
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> {{ $t('768') }}
                    </template>
                    <template #empty> {{ $t('768') }} </template>
                  </USelectMenu>
                </div>
                <CInput
                  id="document_number"
                  v-model="elem.document_number"
                  :text="$t('297')"
                  is-latin
                  :error="
                    v$.passengers?.$each.$response?.$data[index]
                      ?.document_number?.$error
                  "
                  :placeholder="t('297')"
                  input-class="!uppercase placeholder:lowercase"
                  required
                  @change="onDocumentNumber(index, elem.type)"
                  @update:model-value="checkChangedValues(index)"
                />
                <div class="w-full">
                  <CLabel for-id="" :text="$t('304')" />
                  <VueDatePicker
                    v-model="elem.document_expire"
                    text-input
                    :enable-time-picker="false"
                    :format-locale="locales[locale]"
                    placeholder="DD.MM.YYYY"
                    :disabled-dates="disableFutureDates"
                    format="dd/MM/yyyy"
                    :class="{
                      error:
                        v$.passengers.$each?.$response?.$data[index]
                          ?.document_expire?.$error,
                    }"
                    :month-change-on-scroll="false"
                    auto-apply
                    @update:model-value="checkChangedValues(index)"
                  />
                </div>
                <div v-if="elem.type === 'INF' && parents.length > 0">
                  <CLabel for-id="" :text="$t('290')" />
                  <USelectMenu
                    v-model="elem.parent_document_number"
                    class="!w-full alt_select"
                    :class="{
                      error:
                        v$.passengers?.$each.$response?.$data[index]
                          ?.parent_document_number?.$error,
                    }"
                    :options="parents"
                    option-attribute="parent_document_number"
                    value-attribute="parent_document_number"
                    @update:model-value="checkChangedValues(index)"
                  >
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> {{ $t('768') }}
                    </template>
                    <template #empty> {{ $t('768') }} </template>
                  </USelectMenu>
                </div>
              </div>
              <div>
                <UCheckbox
                  v-if="elem.index === null && authStore.loggedIn"
                  v-model="elem.save"
                  label="Сохранить данные пассажира"
                  class="mt-3"
                  size="large"
                />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg mt-6">
            <h5 class="b-title mb-3">{{ t('11') }}</h5>
            <UTextarea
              v-model="state.comment"
              :autosize="{ minRows: 5, maxRows: 10 }"
              type="textarea"
              :placeholder="t('11') + '...'"
              class=""
            />
          </div>
          <div class="bg mt-5">
            <div class="moreinfo my-2 flex items-center gap-1 mb-3">
              <UCheckbox v-model="agreement" :label="t('376')" size="large" />
              <a
                class="!text-[#0073FF] cursor-pointer"
                href="/docs/ofer_2024.pdf"
                target="_blank"
              >
                {{ $t('282') }}
              </a>
            </div>
            <UButton
              :disabled="!agreement || loading"
              :loading="loading"
              class="rounded-[1rem] px-4 w-full h-12 justify-center"
              type="submit"
            >
              {{ t('120') }}
            </UButton>
          </div>
        </form>
        <div class="col-span-12 md:col-span-4 order-[-1] md:order-0">
          <AviaTicketDetail
            v-if="ticketDetail && !loading"
            :detail="ticketDetail"
            @on-promo="(e) => (state.promo_code = e)"
          />
        </div>
      </div>
      <UINeedPayOrderDialog
        :error-data="needPayOrders[0]?.data"
        @on-loading="loading = false"
        @on-agreement="agreement = false"
      />
      <LazyLayoutAuthRequiredModal
        :show="authRequired"
        @on-close="onModalClose"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'

import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import VueDatePicker from '@vuepic/vue-datepicker'
import { az, bg, cs, enUS, ru, tr, uz } from 'date-fns/locale'
import dayjs from 'dayjs'
import { MaskInput } from 'maska'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { VueTelInput } from 'vue-tel-input'

import CInput from '@/components/Form/CInput.vue'
import CLabel from '@/components/Form/CLabel.vue'
import type { PersonalInfo } from '@/types'
import {
  disableAdultCalendar,
  disableChildCalendar,
  disableInfantCalendar,
} from '@/utils'
const locales = {
  en: enUS,
  uz: uz,
  tr: tr,
  bg: bg,
  che: cs,
  az: az,
  ru: ru,
}
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const store = useAviaStore()
const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const needPayOrders = ref([])
const layoutStore = useLayoutStore()
const authRequired = ref(false)
const selectedUsers = ref([])
const typePassengers = reactive({
  ADT: [],
  CHI: [],
  INF: [],
})

const options = computed(
  () => (type) =>
    typePassengers[type].map((el, index) => {
      return {
        label: el.data.last_name + ' ' + el.data.first_name,
        value: index,
        disabled: selectedUsers.value.includes(index),
      }
    }),
)

const passengersListArray = ref([])

const getPassengersTemplate = async () => {
  await useApi()
    .$get('/mobile/user-document')
    .then((res) => {
      passengersListArray.value = res
    })
}
const choosePassenger = (index, idx) => {
  if (!selectedUsers.value.includes(idx)) {
    selectedUsers.value.push(idx)
  }
  state.passengers[index].first_name =
    passengersListArray.value.data[idx].data.first_name
  state.passengers[index].last_name =
    passengersListArray.value.data[idx].data.last_name
  state.passengers[index].birth =
    passengersListArray.value.data[idx].data.country_birth
  state.passengers[index].gender =
    passengersListArray.value.data[idx].data.gender
  state.passengers[index].citizenship =
    passengersListArray.value.data[idx].data.citizenship
  state.passengers[index].document_number =
    passengersListArray.value.data[idx].data.number
  state.passengers[index].document_expire =
    passengersListArray.value.data[idx].data.place_birth

  if (state.passengers[index].type === 'ADT') {
    parents.value[index].parent_document_number =
      state.passengers[index].document_number
  }
}
const ticketDetail = computed(() => store.ticketDetail)
const rules = computed(() => {
  return {
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
        document_expire: {
          required,
        },
        parent_document_number: {
          required,
        },
      }),
    },
  }
})
const citizenship = computed(() => dashboardStore.citizenship)

const loading = ref(false)
const agreement = ref(false)
const parents = ref([])
const { myToast } = useCustomToast()
const state = reactive({
  full_name:
    authStore.user?.userDetail?.first_name ||
    authStore.user?.userDetail?.last_name
      ? `${authStore.user?.userDetail?.first_name ?? ''} ${
          authStore.user?.userDetail?.last_name ?? ''
        }`
      : '',
  email: authStore.user?.email,
  phone: authStore.user?.phone_mobile
    ? '+' + String(authStore.user?.phone_mobile)
    : '',
  reservation_id: null,
  product_id: 1,
  comment: '',
  passengers: [] as PersonalInfo[],
  tariff: route.query?.tariff_id
    ? String(route.query?.tariff_id)?.split(',')
    : [],
  promo_code: '',
})
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
  save: false,
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

const aviaSales = {
  token: 'acc123@#$&238465r3AyQBsX3pMay6N4IADSdaL',
  email: 'aviasales@asialuxe.uz',
}
const phoneValidation = ref(null)
const touched = ref(false)
const editBindProps = ref({
  mode: 'international',
  dropdownOptions: {
    disabledDialCode: false,
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

const v$ = useVuelidate(rules, state, {
  $lazy: true,
})
const checkUser = async (phone: string) => {
  return new Promise((resolve, reject) => {
    useApi()
      .$get(`/v1/user/check?phone=${phone}`)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
const onModalClose = () => {
  authRequired.value = false
  if (authStore.loggedIn) submitData()
}
const submitData = async () => {
  useApi()
    .$post('/v1/flight/book', {
      body: {
        ...state,
        phone: phoneValidation.value.number,
      },
      params: {
        platform: 'app',
      },
    })
    .then(async (res) => {
      myToast('success', t('124'))
      if (authStore.loggedIn) {
        await router.push(`/${locale.value}/orders/avia/${res?.data?.id}`)
      } else {
        if (res.data?.auth_token) {
          authStore.setToken(res.data?.auth_token?.token)
          await authStore.fetchUser()
          await router.push(`/${locale.value}/orders/avia/${res?.data?.id}`)
        }
      }
    })
    .catch((err) => {
      if (err.status === 423) {
        needPayOrders.value.push(err?._data?.errors)
        layoutStore.bookError = true
      }
      myToast('error', err?._data?.message)
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}
const submitForm = async () => {
  touched.value = true
  const result = await v$.value.$validate()
  state.passengers.forEach((el) => {
    el.save ? (el.save = 1) : (el.save = 0)
  })
  if (result && phoneValidation.value?.valid) {
    loading.value = true
    state.passengers.forEach((el) => {
      el.document_number = el.document_number?.toUpperCase()
      el.first_name = el.first_name?.toUpperCase()
      el.last_name = el.last_name?.toUpperCase()
      el.birth = dayjs(el.birth).format('YYYY-MM-DD')
      el.document_expire = dayjs(el.document_expire).format('YYYY-MM-DD')
    })
    state.reservation_id = ticketDetail.value?.reservation_id
    try {
      if (authStore.loggedIn) {
        await submitData()
        return
      }
      const res = await checkUser(phoneValidation.value.number)
      if (res?.data?.status) {
        layoutStore.loginForm.phone_or_email = phoneValidation.value.number
        authRequired.value = true
        return
      } else {
        await submitData()
      }
    } catch (err) {
      console.log(err)
    }
  } else {
    myToast('warning', t('234'))
    // toast.warning(t('234'))

    window.scrollTo({
      top: 50,
      behavior: 'smooth',
    })
  }
}
function disableFutureDates(time) {
  const currentDate = new Date()
  const oneMonthAhead = new Date()
  oneMonthAhead.setMonth(currentDate.getMonth() + 6)
  return time.getTime() < oneMonthAhead.getTime()
}
const checkChangedValues = (index) => {
  const ind = selectedUsers.value.findIndex((el) => el == index)
  if (ind !== -1) {
    selectedUsers.value.splice(ind, 1)
  }

  state.passengers[index].index = null
}
loading.value = true
Promise.allSettled([store.fetchTicketDetail(route.query?.buy_id as string)])
  .then(async () => {
    for (let i = 0; i < ticketDetail.value?.request.adult_qnt; i++) {
      state.passengers.push({
        ...passengerObject,
        type: 'ADT',
        index: null,
      })
      parents.value.push({
        parent_document_number: '',
      })
    }
    for (let i = 0; i < ticketDetail.value?.request.child_qnt; i++) {
      state.passengers.push({
        ...passengerObject,
        type: 'CHI',
        index: null,
      })
    }
    for (let i = 0; i < ticketDetail.value?.request.infant_qnt; i++) {
      state.passengers.push({
        ...passengerObject,
        type: 'INF',
        index: null,
        parent_document_number: '',
      })
    }
    if (
      authStore.user?.userDetail?.first_name ||
      authStore.user?.userDetail?.last_name ||
      authStore.user?.name
    ) {
      state.full_name = authStore.user?.name
        ? authStore.user?.name
        : `${authStore.user?.userDetail?.first_name ?? ''} ${
            authStore.user?.userDetail?.last_name ?? ''
          }`
    }
    await nextTick()
    const inputs = document.querySelectorAll('.dp__input')
    for (const key of inputs) {
      if (key) {
        key?.setAttribute('data-maska', '##/##/####')
        new MaskInput(key, {
          mask: () => '##/##/####',
        })
      }
    }
  })
  .catch((e) => {
    console.log(e)
  })
  .finally(() => {
    loading.value = false
  })
Promise.all([dashboardStore.getCitizenship()]).catch((e) => {
  console.log(e)
})
const onDocumentNumber = (index: number, type: string) => {
  if (type === 'ADT') {
    parents.value[index].parent_document_number =
      state.passengers[index].document_number
  }
}

onMounted(async () => {
  await getPassengersTemplate()
  typePassengers.ADT = passengersListArray.value.data.filter(
    (el) => el.data.middle_name === 'ADT',
  )
  typePassengers.CHI = passengersListArray.value.data.filter(
    (el) => el.data.middle_name === 'CHI',
  )
  typePassengers.INF = passengersListArray.value.data.filter(
    (el) => el.data.middle_name === 'INF',
  )
  if (route.query?.utm_source === 'aviasales') {
    token.value = aviaSales.token
  }
  await nextTick()
  const datePickerInputs = document.querySelectorAll('.dp__input')

  if (datePickerInputs.length) {
    datePickerInputs.forEach((input) => {
      ;(input as HTMLInputElement).setAttribute('inputmode', 'numeric')
    })
  }
  const input = document.querySelector('.vti__input')
  if (input) input.setAttribute('inputmode', 'tel')
})

watch(
  () => state.passengers,
  (newPassengers) => {
    newPassengers.forEach((passenger) => toUpperCaseFields(passenger))
  },
  { deep: true },
)

useSeoMeta({
  title: t('126'),
  ogTitle: t('126'),
  description: t('126') + ': ' + t('448'),
  ogDescription: t('126') + ': ' + t('448'),
})
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style';
.booking-form {
  .b-title {
    @include common-text-style(17px, 600, normal);
  }
  .b-text {
    @include common-text-style(16px, 500, normal);
  }
  .input-wrap {
    margin-top: 15px;
    .label {
      @include common-text-style(14px, 500, normal);
      color: #344054;
      margin-bottom: 6px;
    }
    .e-input {
      border-radius: 8px;
    }
  }
  .bg {
    background: #fff;
    border-radius: 6px;
    margin-bottom: 20px;
    .input-error {
      color: #e74848;
      font-weight: 600;
      font-size: 12px;
    }
  }
}
.label {
  @include common-text-style(14px, 500, normal);
  color: #344054;
  margin-bottom: 6px;
}
</style>
