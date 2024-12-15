<template>
  <div>
    <UIHeader without-image> {{ $t('825') }} </UIHeader>
    <div class="container mt-32">
      <form class="grid grid-cols-12 gap-6" @submit.prevent="submitForm">
        <div class="md:col-span-8 col-span-12">
          <div class="card-wrap !p-0 shadow mb-3 z-[1]">
            <div
              class="bg-[#0073ff] p-3 !rounded-t-lg text-white flex items-center gap-2 mb-3"
            >
              <h5 class="b-title mb-0">{{ t('89') }}</h5>
            </div>

            <div class="grid p-3 md:grid-cols-3 gap-3">
              <CInput
                v-model="state.full_name"
                :error="v$.full_name?.$error"
                :placeholder="t('261')"
                :text="$t('261')"
                required
              />
              <CInput
                v-model="state.email"
                :error="v$.email?.$error"
                :placeholder="t('371')"
                :text="$t('371')"
                required
                type="email"
              />
              <div>
                <CLabel :text="$t('200')" />
                <VueTelInput
                  v-bind="editBindProps"
                  v-model="state.phone"
                  class="py-[2px] max-h-[36px] min-h-[36px] border border-[#ddd]"
                  :class="{
                    '!border-red-700': touched
                      ? !phoneValidation?.valid
                      : false,
                  }"
                  :auto-default-country="!defaultCountry"
                  @validate="(e) => (phoneValidation = e)"
                ></VueTelInput>
              </div>
            </div>
          </div>
          <div class="card-wrap shadow">
            <h4 class="title-name">{{ t('139') }}</h4>
            <p class="text mt-1">
              {{ t('56') }}
            </p>
            <p class="text">* {{ t('61') }}</p>
            <hr class="my-4" />
            <div class="bg">
              <h5 class="b-title mb-4">{{ t('88') }}</h5>
              <div
                v-for="(elem, index) in state.passengers"
                :key="index"
                class="mb-3"
              >
                <div class="flex justify-between items-center mb-3">
                  <p class="b-text">
                    {{
                      elem.type === 'ADT'
                        ? t('57')
                        : elem.type === 'CHI'
                          ? t('103')
                          : t('478')
                    }}
                  </p>
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
                <div class="grid md:grid-cols-3 gap-3 mt-3">
                  <CInput
                    v-model="elem.last_name"
                    :error="
                      v$.passengers.$each.$response?.$data[index]?.last_name
                        ?.$error
                    "
                    :text="$t('357')"
                    :placeholder="t('357')"
                    required
                    is-latin
                    input-class="uppercase"
                    @update:model-value="checkChangedValues(index)"
                  />
                  <CInput
                    v-model="elem.first_name"
                    :error="
                      v$.passengers.$each.$response?.$data[index]?.first_name
                        ?.$error
                    "
                    :placeholder="t('135')"
                    required
                    :text="$t('135')"
                    input-class="uppercase"
                    is-latin
                    @update:model-value="checkChangedValues(index)"
                  />
                  <div>
                    <CLabel :text="$t('102')" />
                    <VueDatePicker
                      v-model="elem.birth"
                      :text-input="textInputOptions"
                      :enable-time-picker="false"
                      :format-locale="locales[locale]"
                      placeholder="DD.MM.YYYY"
                      :disabled-dates="
                        (e) =>
                          elem?.type === 'ADT'
                            ? disableAdultCalendar(
                                e,
                                checkData?.data.begin_date,
                              )
                            : elem?.type === 'CHI'
                              ? disableChildCalendar(
                                  e,
                                  checkData?.data.begin_date,
                                )
                              : disableInfantCalendar(
                                  e,
                                  checkData?.data.begin_date,
                                )
                      "
                      format="dd/MM/yyyy"
                      :class="{
                        error:
                          elem.error ||
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
                      v-if="genders?.length"
                      v-model="elem.gender"
                      :options="genders"
                      class="alt_select"
                      :class="{
                        error:
                          v$.passengers.$each?.$response?.$data[index]?.gender
                            ?.$error,
                      }"
                      option-attribute="label"
                      value-attribute="value"
                      :placeholder="$t('73')"
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
                      :options="citizenship"
                      class="alt_select"
                      :class="{
                        error:
                          v$.passengers.$each?.$response?.$data[index]
                            ?.citizenship?.$error,
                      }"
                      searchable
                      option-attribute="name_ru"
                      :search-attributes="['name_ru']"
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
                    :error="
                      v$.passengers.$each.$response?.$data[index]
                        ?.document_number?.$error
                    "
                    :placeholder="t('297')"
                    required
                    :text="$t('297')"
                    is-latin
                    input-class="uppercase placeholder:lowercase"
                    @update:model-value="checkChangedValues(index)"
                  />
                  <div>
                    <CLabel :text="$t('304')" />
                    <VueDatePicker
                      v-model="elem.document_expire"
                      :text-input="textInputOptions"
                      :enable-time-picker="false"
                      :format-locale="locales[locale]"
                      placeholder="DD.MM.YYYY"
                      :disabled-date="disableFutureDates"
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
                </div>
                <UCheckbox
                  v-if="
                    (elem.index === null || elem.index === undefined) &&
                    authStore.loggedIn
                  "
                  v-model="elem.save"
                  label="Сохранить данные пассажира"
                  class="mt-3"
                  size="large"
                />
              </div>
            </div>
          </div>

          <div class="card-wrap shadow my-3">
            <div class="bg">
              <h5 class="b-title mb-3">{{ t('11') }}</h5>
              <UTextarea
                v-model="state.comment"
                :autosize="{ minRows: 5, maxRows: 10 }"
                type="textarea"
                :placeholder="t('150') + '...'"
                class="mt-3"
              />
            </div>
          </div>

          <div class="card-wrap shadow mb-3">
            <h6 class="mb-1 text-[14px]">
              {{ t('242') }}
            </h6>
            <p class="text">- {{ t('384') }};</p>
            <p class="text">- {{ t('388') }};</p>
            <p class="text">- {{ t('389') }};</p>
            <p class="text mb-3">- {{ t('387') }};</p>
            <h6 class="text-[13px]">
              {{ t('48') }}
            </h6>
          </div>
        </div>
        <div class="md:col-span-4 col-span-12">
          <div class="sticky top-[70px]">
            <div class="card-wrap shadow">
              <div class="flex items-center justify-between mt-2">
                <p>
                  <b>{{ t('226') }}:</b>
                </p>
                <p class="text-[#AAAAAA]">
                  {{ checkData?.data.hotel_name }}
                </p>
              </div>

              <div class="flex items-center justify-between mt-2">
                <p>
                  <b>{{ t('194') }}:</b>
                </p>
                <p class="text-[#AAAAAA]">
                  {{ checkData?.data.room_code }}
                </p>
              </div>

              <div class="flex items-center justify-between mt-2">
                <p><b>Checkin:</b></p>
                <p class="text-[#AAAAAA]">
                  {{ dayjs(checkData?.data.begin_date).format('DD.MM.YYYY') }}
                </p>
              </div>
              <div class="flex items-center justify-between mt-2">
                <p><b>Checkout:</b></p>
                <p class="text-[#AAAAAA]">
                  {{ dayjs(checkData?.data.end_date).format('DD.MM.YYYY') }}
                </p>
              </div>

              <div class="mt-4">
                <p class="text-[#AAAAAA] text-center">
                  {{ checkData?.data?.room_name }}
                </p>
              </div>

              <div class="mt-4 ps-3">
                <ul class="list-style">
                  <li
                    v-for="(item, index) in checkData?.data.amenities"
                    :key="index"
                    class="text-[#AAAAAA]"
                  >
                    {{ item.name }}
                  </li>
                </ul>
              </div>

              <hr class="my-3" />
              <div class="my-2">
                <div
                  v-if="
                    checkData?.data?.transfer_type &&
                    checkData?.data?.transfer_type !== 'no'
                  "
                  class="mb-1"
                >
                  <div class="flex items-center gap-3">
                    <p>Transfer type:</p>
                    <p>
                      {{
                        checkData?.data?.transfer_type === 'gr'
                          ? t('86')
                          : checkData?.data?.transfer_type === 'in'
                            ? t('136')
                            : checkData?.data?.transfer_name
                      }}
                    </p>
                  </div>
                </div>
                <div v-if="route.query?.insurance !== 'no'" class="mb-1">
                  <div class="flex items-center gap-3">
                    <p>Insurance:</p>
                    <p>
                      {{ route.query?.insurance === 'gross' ? 'Gross' : '' }}
                    </p>
                  </div>
                </div>
              </div>
              <!--          <UIPromodeCode
                :product="2"
                :price="checkData?.data.price"
                class="my-5 !px-0"
                @on-success="onPromoSuccess"
              />-->
              <div class="flex items-center justify-between">
                <p>
                  {{ t('260') }}
                </p>
                <div class="price flex items-center flex-col">
                  <p v-if="promoResponse" class="text-2xl">
                    {{ formatNumber(promoResponse?.new_price) }}
                    <span> {{ checkData?.data.currency }}</span>
                  </p>
                  <p
                    class="text-2xl"
                    :class="promoResponse ? 'line-through text-red-500' : ''"
                  >
                    {{ formatNumber(checkData?.data.price) }}
                    <span> {{ checkData?.data.currency }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="card-wrap shadow mt-3">
              <div class="bg">
                <p class="mt-3 text-[14px]">
                  <span class="text-[#3392FF]">*</span> {{ t('347') }}
                </p>
                <UButton
                  :loading="loading"
                  type="submit"
                  class="rounded-[1rem] h-12 px-4 w-full mt-3 justify-center"
                >
                  {{ t('120') }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </form>
      <UINeedPayOrderDialog
        :error-data="needPayOrders[0]?.data"
        @on-loading="loading = false"
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
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { VueTelInput } from 'vue-tel-input'

import CInput from '@/components/Form/CInput.vue'
import CLabel from '@/components/Form/CLabel.vue'
import { formatNumber } from '@/utils'
import {
  disableAdultCalendar,
  disableChildCalendar,
  disableInfantCalendar,
} from '@/utils'

const { t, locale } = useI18n()
const locales = {
  en: enUS,
  uz: uz,
  tr: tr,
  bg: bg,
  che: cs,
  az: az,
  ru: ru,
}
const { myToast } = useCustomToast()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const store = useHotelStore()
const dashboardStore = useDashboardStore()
const loading = ref(false)
const needPayOrders = ref([])
const layoutStore = useLayoutStore()
const authRequired = ref(false)

const state = reactive({
  full_name: '',
  email: authStore.user?.email,
  phone: '',
  reservation_id: '',
  product_id: 2,
  comment: null,
  insurance_status: 0,
  transfer_status: 0,
  transfer_type: route.query?.transfer_type,
  promo_code: '',
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
const textInputOptions = {
  format: 'dd/MM/yyyy',
}
const promoResponse = ref(null)
const passengersListArray = ref([])
const getPassengersTemplate = async () => {
  await useApi()
    .$get('/mobile/user-document')
    .then((res) => {
      passengersListArray.value = res
    })
}
const citizenship = computed(() => dashboardStore.citizenship)
const onPromoSuccess = (e) => {
  promoResponse.value = e
  state.promo_code = e?.promo_code
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
}
const selectedUsers = ref([])
const checkChangedValues = (index) => {
  const ind = selectedUsers.value.findIndex((el) => el == index)
  if (ind !== -1) {
    selectedUsers.value.splice(ind, 1)
  }

  state.passengers[index].index = null
}

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

const defaultCountry = computed(() => !!authStore.user?.userDetail?.phone)
const checkData = computed(() => store.orderCheck)
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
    const res = await useApi().$post('/v1/hotel/book', {
      body: {
        ...state,
        phone: phoneValidation.value.number,
      },
      params: {
        platform: 'app',
      },
    })
    if (authStore.loggedIn) {
      myToast('success', t('435'))
      await router.push(`/${locale.value}/orders/hotel/${res?.data?.id}`)
    } else {
      if (res.data?.auth_token) {
        authStore.setToken(res.data?.auth_token?.token)
        myToast('success', t('435'))
        await router.push(`/${locale.value}/orders/hotel/${res?.data?.id}`)
      }
    }
  } catch (error) {
    console.log(error)
  }
}
const onModalClose = () => {
  authRequired.value = false
  if (authStore.loggedIn) submitData()
}
const submitForm = async () => {
  loading.value = true
  v$.value.$touch()
  touched.value = true
  state.passengers.forEach((el) => {
    el.document_number = el.document_number?.toUpperCase()
    el.first_name = el.first_name?.toUpperCase()
    el.last_name = el.last_name?.toUpperCase()
    el.birth = dayjs(el.birth).format('YYYY-MM-DD')
    el.document_expire = dayjs(el.document_expire).format('YYYY-MM-DD')
  })
  if (!v$.value.$invalid && phoneValidation.value?.valid) {
    state.reservation_id = checkData.value?.reservation_id
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
      /*useGtm()?.trackEvent({
        event: 'Hotel_Booking',
        category: 'Form',
        label: 'Hotel_Booking',
      })*/
      // toast.success(t('435'))
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
    window.scrollTo({
      top: 50,
      behavior: 'smooth',
    })
  }
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
Promise.all([dashboardStore.getCitizenship()]).catch((e) => {
  console.log(e)
})
function disableFutureDates(time: Date) {
  // Get the current date
  const currentDate = new Date()

  // Calculate the date one month ahead
  const oneMonthAhead = new Date()
  oneMonthAhead.setMonth(currentDate.getMonth() + 6)

  // Disable dates that are one month or more ahead
  return time.getTime() < oneMonthAhead.getTime()
}

onMounted(async () => {
  state.phone = authStore?.user?.userDetail?.phone || ''
  if (state.phone[0] !== '+') state.phone = `+${state.phone}`
  state.insurance_status = route.query?.insurance !== 'no' ? 1 : 0
  state.transfer_status = route.query?.transfer_type !== 'no' ? 1 : 0
  state.transfer_type = route.query?.transfer_type
  state.full_name =
    authStore.user?.userDetail?.first_name &&
    authStore.user?.userDetail?.last_name
      ? authStore.user?.userDetail?.first_name +
        ' ' +
        authStore.user?.userDetail?.last_name
      : authStore.user?.userDetail?.first_name
  if (authStore.user?.name) {
    state.full_name = authStore.user?.name
  }
  for (let i = 0; i < route.query.adult; i++) {
    state.passengers.push({
      type: 'ADT',
      first_name: null,
      last_name: null,
      birth: null,
      document_number: null,
      document_expire: null,
      error: false,
      gender: '',
      citizenship: '',
    })
  }
  const child =
    route.query.child.length !== 0 ? route.query.child.split(',') : []
  for (let i = 0; i < child.length; i++) {
    if (Number(child[i]) > 1) {
      state.passengers.push({
        type: 'CHI',
        first_name: null,
        last_name: null,
        birth: null,
        document_number: null,
        document_expire: null,
        gender: '',
        citizenship: '',
        error: false,
      })
    } else {
      state.passengers.push({
        type: 'INF',
        first_name: null,
        last_name: null,
        birth: null,
        document_number: null,
        document_expire: null,
        gender: '',
        citizenship: '',
        error: false,
      })
    }
  }
  if (!checkData.value) {
    await store.checkIsExistRoom(route.query.buy_id as string)
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
</script>

<style scoped lang="scss">
@import '@/assets/style/scss/style';
.card-wrap {
  border-radius: 8px;
  background: #fff;
  @include common-text-style(16px, 500, normal);
  padding: 20px;
  .price {
    color: #0073ff;
    font-size: 18px;
  }
  .title-name {
    @include common-text-style(20px, 500, normal);
  }
  .text {
    @include common-text-style(12px, 500, normal);
    color: #999999;
  }
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
.list-style {
  list-style-type: disc;
}
</style>
