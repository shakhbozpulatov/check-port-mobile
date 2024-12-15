<template>
  <div>
    <UIHeader without-image> {{ $t('824') }} </UIHeader>

    <div class="container mt-32">
      <div class="grid grid-cols-12 gap-3">
        <form class="col-span-12 md:col-span-8" @submit.prevent="submitForm">
          <div class="bg-white p-3 rounded-lg shadow booking-form px-2 mt-5">
            <div class="bg">
              <h5 class="b-title">{{ $t('89') }}</h5>
              <div class="grid md:grid-cols-3 gap-3">
                <CInput
                  v-model="state.full_name"
                  :placeholder="$t('261')"
                  :text="$t('261')"
                  :error="v$.full_name?.$error"
                  required
                />
                <CInput
                  v-model="state.email"
                  :placeholder="$t('371')"
                  :text="$t('371')"
                  :error="v$.email?.$error"
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
                      'border-red-700': touched
                        ? !phoneValidation?.valid
                        : false,
                    }"
                    @validate="(e) => (phoneValidation = e)"
                  ></VueTelInput>
                </div>
              </div>
            </div>

            <div class="bg">
              <h5 class="b-title mb-4">{{ $t('88') }}</h5>
              <div
                v-for="(elem, index) in state.passengers"
                :key="index"
                class="mb-3"
              >
                <div class="flex justify-between items-center mb-3">
                  <p v-if="elem.type === 'ADT'" class="b-text">
                    {{ index + 1 }} - {{ $t('58') }}
                  </p>
                  <p v-else-if="elem.type === 'CHI'" class="b-text">
                    {{ index + 1 }} - {{ $t('103') }}
                  </p>
                  <p v-else class="b-text">{{ index + 1 }} - {{ $t('167') }}</p>
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
                    v-model="elem.last_name"
                    :placeholder="$t('357')"
                    :error="
                      v$.passengers.$each?.$response?.$data[index]?.last_name
                        ?.$error
                    "
                    :text="$t('357')"
                    is-latin
                    required
                    input-class="uppercase"
                    @update:model-value="checkChangedValues(index)"
                  />
                  <CInput
                    v-model="elem.first_name"
                    :placeholder="$t('135')"
                    :error="
                      v$.passengers.$each?.$response?.$data[index]?.first_name
                        ?.$error
                    "
                    :text="$t('135')"
                    is-latin
                    required
                    input-class="uppercase"
                    @update:model-value="checkChangedValues(index)"
                  />
                  <div>
                    <CLabel :text="$t('102')" />
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
                                checkData.flight_data[0].segments?.[0]
                                  ?.departure?.date_format,
                              )
                            : elem?.type === 'CHI'
                              ? disableChildCalendar(
                                  e,
                                  checkData.flight_data[0].segments?.[0]
                                    ?.departure?.date_format,
                                )
                              : disableInfantCalendar(
                                  e,
                                  checkData.flight_data[0].segments?.[0]
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
                  <div>
                    <CLabel :text="$t('258')" />
                    <USelectMenu
                      v-model="elem.gender"
                      class="w-full alt_select"
                      :options="genders"
                      option-attribute="label"
                      value-attribute="value"
                      :placeholder="$t('73')"
                      :class="{
                        error:
                          v$.passengers.$each?.$response?.$data[index]?.gender
                            ?.$error,
                      }"
                      @update:model-value="checkChangedValues(index)"
                    >
                      <template #option-empty="{ query }">
                        <q>{{ query }}</q> {{ $t('768') }}
                      </template>
                      <template #empty> {{ $t('768') }} </template>
                    </USelectMenu>
                  </div>
                  <div>
                    <CLabel :text="$t('84')" />
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
                    v-model="elem.document_number"
                    is-latin
                    :placeholder="$t('297')"
                    :error="
                      v$.passengers.$each?.$response?.$data[index]
                        ?.document_number?.$error
                    "
                    :text="$t('297')"
                    required
                    input-class="uppercase placeholder:!lowercase"
                    @update:model-value="checkChangedValues(index)"
                    @change="onDocumentNumber(index, elem.type)"
                  />
                  <div>
                    <CLabel :text="$t('304')" />
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
                  <div v-if="elem.type === 'INF' && parents?.length > 0">
                    <CLabel :text="$t('290')" />
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
                <UCheckbox
                  v-if="
                    (elem.index === null || elem.index === undefined) &&
                    authStore.loggedIn
                  "
                  v-model="elem.save"
                  label="Сохранить данные пассажира"
                  class="mt-6"
                  size="large"
                />
              </div>
            </div>
            <div class="bg">
              <h5 class="b-title mb-3">{{ $t('11') }}</h5>
              <UTextarea
                v-model="state.comment"
                :autosize="{ minRows: 5, maxRows: 10 }"
                type="textarea"
                :placeholder="$t('150')"
                class="mt-3"
              />
            </div>

            <div class="bg">
              <!--            <p class="b-text">{{ $t("41") }}</p>-->
              <div class="moreinfo my-2 flex flex-col gap-2 mb-3">
                <a
                  class="!text-[#0073FF]"
                  href="/docs/ofer_2024.pdf"
                  target="_blank"
                  >{{ $t('282') }}</a
                >
                <UCheckbox
                  v-model="agreement"
                  :label="$t('376')"
                  size="large"
                />
              </div>
              <UButton
                type="submit"
                :disabled="!agreement"
                :loading="loading"
                class="rounded-[1rem] px-4 w-full h-12 justify-center"
              >
                {{ $t('120') }}
              </UButton>
            </div>
          </div>
        </form>
        <div class="col-span-12 md:col-span-4 order-[-1] md:order-0">
          <TourOrderDetail
            class="mt-5"
            :loading="loading"
            :data="checkData"
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
import '@vuepic/vue-datepicker/dist/main.css'

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

const authRequired = ref(false)
const passengersListArray = ref([])
const getPassengersTemplate = async () => {
  await useApi()
    .$get('/mobile/user-document')
    .then((res) => {
      passengersListArray.value = res.data
    })
}
const choosePassenger = (index, idx) => {
  if (!selectedUsers.value.includes(idx)) {
    selectedUsers.value.push(idx)
  }
  state.passengers[index].first_name =
    passengersListArray.value[idx].data.first_name
  state.passengers[index].last_name =
    passengersListArray.value[idx].data.last_name
  state.passengers[index].birth =
    passengersListArray.value[idx].data.country_birth
  state.passengers[index].gender = passengersListArray.value[idx].data.gender
  state.passengers[index].citizenship =
    passengersListArray.value[idx].data.citizenship
  state.passengers[index].document_number =
    passengersListArray.value[idx].data.number
  state.passengers[index].document_expire =
    passengersListArray.value[idx].data.place_birth

  if (state.passengers[index].type === 'ADT') {
    parents.value[index].parent_document_number =
      state.passengers[index].document_number
  }
}
const checkChangedValues = (index) => {
  state.passengers[index].index = null
}

const dashboardStore = useDashboardStore()
const authStore = useAuthStore()
const store = useTourStore()
const agreement = ref(false)
const loading = ref(false)
const selectedUsers = ref([])
const { myToast } = useCustomToast()
const needPayOrders = ref([])
const layoutStore = useLayoutStore()
const state = reactive({
  full_name: '',
  email: authStore.user?.email,
  phone: authStore.user?.phone_mobile
    ? '+' + String(authStore.user?.phone_mobile)
    : '',
  reservation_id: '',
  product_id: 8,
  comment: null,
  insurance_status: 0,
  transfer_status: 0,
  promo_code: '',
  passengers: [] as PersonalInfo[],
})
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
const v$ = useVuelidate(rules, state, {
  $lazy: true,
})

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
const passengerObject = {
  type: 'ADT',
  first_name: null,
  last_name: null,
  phone: null,
  email: null,
  birth: null,
  gender: null,
  citizenship: null,
  document_number: null,
  document_expire: null,
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
const parents = ref([])

const checkParams = computed(() => {
  return {
    product_id: '8',
    flight_buy_id: route.query.flight_buy_id,
    hotel_buy_id: route.query.hotel_buy_id,
    request_id: route.query.request_id,
    search_mode: route.query?.search_mode,
  }
})
const checkData = computed(() => store.orderCheck)
const citizenship = computed(() => dashboardStore.citizenship)

function disableFutureDates(time: Date) {
  // Get the current date
  const currentDate = new Date()

  // Calculate the date one month ahead
  const oneMonthAhead = new Date()
  oneMonthAhead.setMonth(currentDate.getMonth() + 6)

  // Disable dates that are one month or more ahead
  return time.getTime() < oneMonthAhead.getTime()
}
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
const submitData = async () => {
  try {
    const res = await useApi().$post('/v1/tour/book', {
      body: {
        ...state,
        phone: phoneValidation.value?.number,
      },
      params: {
        platform: 'app',
        search_mode: route.query?.search_mode,
      },
    })
    if (authStore.loggedIn) {
      myToast('success', t('435'))
      await router.push(`/${locale.value}/orders/tour/${res?.data?.id}`)
    } else {
      if (res.data?.auth_token) {
        authStore.setToken(res.data?.auth_token?.token)
        myToast('success', t('435'))
        await router.push(`/${locale.value}/orders/tour/${res?.data?.id}`)
      }
    }
    /*useGtm()?.trackEvent({
      event: 'Tour_Booking',
      category: 'Form',
      label: 'Tour_Booking',
    })*/
  } catch (err) {
    console.log(err)
  }
}
const onModalClose = () => {
  authRequired.value = false
  if (authStore.loggedIn) submitData()
}
const submitForm = async () => {
  touched.value = true
  const result = await v$.value.$validate()
  if (result && phoneValidation.value?.valid) {
    loading.value = true
    state.reservation_id = checkData.value?.reservation_id
    state.passengers.forEach((el) => {
      el.document_number = el.document_number?.toUpperCase()
      el.first_name = el.first_name?.toUpperCase()
      el.last_name = el.last_name?.toUpperCase()
      el.birth = dayjs(el.birth).format('YYYY-MM-DD')
      el.document_expire = dayjs(el.document_expire).format('YYYY-MM-DD')
    })
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
      if (err.status === 423) {
        needPayOrders.value.push(err?._data?.errors)
        layoutStore.bookError = true
      }
      myToast('error', err?._data?.message)
      console.log(err)
    } finally {
      loading.value = false
    }
  } else {
    myToast('warning', t('234'))
    // toast.warning(t('234'))
    loading.value = false
    window.scrollTo({
      top: 50,
      behavior: 'smooth',
    })
  }
}

loading.value = true
Promise.allSettled([store.getTourOrderCheck(checkParams.value)])
  .then(async () => {
    if (checkData.value?.adult_qnt) {
      for (let i = 0; i < checkData.value?.adult_qnt; i++) {
        state.passengers.push({
          ...passengerObject,
          type: 'ADT',
        })
        parents.value.push({
          parent_document_number: '',
        })
      }
    }
    if (checkData.value?.child_qnt) {
      for (let i = 0; i < checkData.value?.child_qnt; i++) {
        state.passengers.push({
          ...passengerObject,
          type: 'CHI',
        })
      }
    }
    if (checkData.value?.inf_qnt) {
      for (let i = 0; i < checkData.value?.inf_qnt; i++) {
        state.passengers.push({
          ...passengerObject,
          parent_document_number: '',
          type: 'INF',
        })
      }
    }
    if (
      authStore.user?.userDetail?.first_name ||
      authStore.user?.userDetail?.last_name
    ) {
      state.full_name = `${authStore.user?.userDetail?.first_name ?? ''} ${
        authStore.user?.userDetail?.last_name ?? ''
      }`
    }
    if (authStore.user?.name) {
      state.full_name = authStore.user?.name
      console.log(authStore.user)
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
  typePassengers.ADT = passengersListArray.value.filter(
    (el) => el.data.middle_name === 'ADT',
  )
  typePassengers.CHI = passengersListArray.value.filter(
    (el) => el.data.middle_name === 'CHI',
  )
  typePassengers.INF = passengersListArray.value.filter(
    (el) => el.data.middle_name === 'INF',
  )

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
    margin-bottom: 10px;
    .input-error {
      color: #e74848;
      font-weight: 600;
      font-size: 12px;
    }
  }
}
</style>
