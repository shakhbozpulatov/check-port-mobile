<template>
  <div class="container mt-4">
    <div class="grid grid-cols-12 gap-3">
      <div class="col-span-12 md:col-span-8">
        <div class="booking-form md:mt-5">
          <div class="bg shadow-md">
            <h5 class="b-title">{{ $t('89') }}</h5>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
              <CInput
                v-model="state.full_name"
                :placeholder="$t('261')"
                :text="$t('261')"
                required
                :error="v$.full_name?.$error"
              />
              <CInput
                v-model="state.email"
                :error="v$.email?.$error"
                :text="$t('371')"
                required
                :placeholder="$t('371')"
              />
              <div class="input-wrap">
                <span class="label">
                  {{ $t('200') }}
                  <span class="text-[#3392FF]">*</span>
                </span>
                <vue-tel-input
                  v-bind="editBindProps"
                  v-model="state.phone"
                  class="py-[2px]"
                  :class="{
                    'border-red-700': touched ? !phoneValidation?.valid : false,
                  }"
                  @validate="(e) => (phoneValidation = e)"
                />
              </div>
            </div>
          </div>

          <div class="bg shadow-md">
            <h5 class="b-title mb-4">{{ $t('88') }}</h5>
            <div
              v-for="(elem, index) in state.passengers"
              :key="index"
              class="mb-3"
            >
              <p v-if="elem.type === 'ADT'" class="b-text mb-3">
                {{ index + 1 }} - {{ $t('58') }}
              </p>
              <p v-else-if="elem.type === 'CHI'" class="b-text mb-3">
                {{ index + 1 }} - {{ $t('103') }}
              </p>
              <p v-else class="b-text mb-3">
                {{ index + 1 }} - {{ $t('167') }}
              </p>
              <div class="mb-3 gap-3 grid grid-cols-1 md:grid-cols-3">
                <CInput
                  v-model="elem.last_name"
                  :placeholder="$t('357')"
                  :text="$t('357')"
                  :error="
                    v$.passengers.$each?.$response?.$data[index]?.last_name
                      ?.$error
                  "
                  is-latin
                  required
                />
                <CInput
                  v-model="elem.first_name"
                  :placeholder="$t('135')"
                  :text="$t('135')"
                  required
                  :error="
                    v$.passengers.$each?.$response?.$data[index]?.first_name
                      ?.$error
                  "
                  is-latin
                />
                <div>
                  <span class="text-dark text-[12px] font-medium mb-1">{{
                    $t('102')
                  }}</span>
                  <VueDatePicker
                    v-model="elem.birth"
                    text-input
                    :enable-time-picker="false"
                    :format-locale="locales[locale]"
                    placeholder="DD.MM.YYYY"
                    format="dd/MM/yyyy"
                    :disabled-dates="
                      (e) =>
                        elem?.type === 'ADT'
                          ? disableAdultCalendar(e, $route.query?.date_from)
                          : elem?.type === 'CHI'
                            ? disableChildCalendar(e, $route.query?.date_from)
                            : disableInfantCalendar(e, $route.query?.date_from)
                    "
                    :class="{
                      error:
                        v$.passengers.$each.$response?.$data[index]?.birth
                          ?.$error,
                    }"
                    :month-change-on-scroll="false"
                    auto-apply
                  />
                </div>
              </div>
              <div class="mb-3 gap-3 grid grid-cols-1 md:grid-cols-3">
                <div>
                  <span class="text-dark text-[12px] font-medium mb-1">{{
                    $t('258')
                  }}</span>
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
                  >
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> {{ $t('768') }}
                    </template>
                    <template #empty> {{ $t('768') }} </template>
                  </USelectMenu>
                </div>
                <div>
                  <span class="text-dark text-[12px] font-medium mb-1">{{
                    $t('84')
                  }}</span>
                  <USelectMenu
                    v-if="allCitizenships?.length"
                    v-model="elem.citizenship"
                    searchable
                    :searchable-placeholder="$t('253')"
                    :search-attributes="['name_ru']"
                    :class="{
                      error:
                        v$.passengers?.$each.$response?.$data[index]
                          ?.citizenship?.$error,
                    }"
                    class="alt_select w-full"
                    :options="allCitizenships"
                    option-attribute="name_ru"
                    value-attribute="code"
                    :placeholder="$t('73')"
                  >
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> {{ $t('768') }}
                    </template>
                    <template #empty> {{ $t('768') }} </template>
                  </USelectMenu>
                </div>
                <CInput
                  v-model="elem.document_number"
                  :text="$t('297')"
                  is-latin
                  size="lg"
                  required
                  :placeholder="t('297')"
                  :error="
                    v$.passengers.$each?.$response?.$data[index]
                      ?.document_number?.$error
                  "
                  input-class="uppercase placeholder:!lowercase"
                />
              </div>
              <div class="mb-3 gap-3 grid grid-cols-1 md:grid-cols-3">
                <div>
                  <span class="text-dark text-[12px] font-medium mb-1">{{
                    $t('304')
                  }}</span>
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
                  />
                </div>
                <div v-if="elem.type === 'INF' && parents.length > 0">
                  <span class="text-dark text-[12px] font-medium mb-1">{{
                    $t('290')
                  }}</span>
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
                  >
                    <template #option-empty="{ query }">
                      <q>{{ query }}</q> {{ $t('768') }}
                    </template>
                    <template #empty> {{ $t('768') }} </template>
                  </USelectMenu>
                  <div v-if="v$.passengers.$errors.length > 0">
                    <div
                      v-for="error in v$.passengers.$each.$response.$errors[
                        index
                      ].document_number"
                      :key="error"
                      class="input-error"
                    >
                      {{ error.$message }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg shadow-md">
            <h5 class="b-title mb-3">{{ $t('11') }}</h5>
            <div class="grid grid-cols-12 gap-3">
              <div class="col-span-12">
                <UTextarea
                  v-model="state.comment"
                  :autosize="{ minRows: 5, maxRows: 10 }"
                  type="textarea"
                  :placeholder="t('150')"
                  class=""
                />
              </div>
            </div>
          </div>

          <div class="bg shadow-md mt-5">
            <div class="moreinfo my-2 flex items-center gap-2">
              <UCheckbox v-model="agreement" :label="t('376')" size="large" />
              <a
                class="!text-[#0073FF]"
                href="/docs/ofer_2024.pdf"
                target="_blank"
                >{{ $t('282') }}</a
              >
            </div>
            <UButton
              :disabled="!agreement"
              :loading="loading"
              class="rounded-[1rem] px-4 justify-center"
              @click="submitForm"
            >
              {{ $t('120') }}
            </UButton>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-4 order-[-1] md:order-0">
        <div class="mt-5">
          <TourCustomDetail />
        </div>
      </div>
    </div>
    <UINeedPayOrderDialog
      :error-data="needPayOrders[0]?.data"
      @on-loading="loading = false"
      @on-agreement="agreement = false"
    />
  </div>
</template>

<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'

import { useVuelidate } from '@vuelidate/core'
import { email, helpers, required } from '@vuelidate/validators'
import VueDatePicker from '@vuepic/vue-datepicker'
import { az, bg, cs, enUS, ru, tr, uz } from 'date-fns/locale'
import { MaskInput } from 'maska'
import { computed, nextTick, onMounted, reactive, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { VueTelInput } from 'vue-tel-input'

// import { toast } from 'vue3-toastify'
import CInput from '@/components/Form/CInput.vue'
import {
  disableAdultCalendar,
  disableChildCalendar,
  disableInfantCalendar,
} from '@/utils'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const dashboardStore = useDashboardStore()
const authStore = useAuthStore()
const agreement = ref(false)
const allPassengers = ref([])
const parents = ref([])
const pageLoading = ref(true)
const { myToast } = useCustomToast()
const customArr = ref([])
const allCitizenships = computed(() => dashboardStore.citizenship)
const needPayOrders = ref([])
const layoutStore = useLayoutStore()
const locales = {
  en: enUS,
  uz: uz,
  tr: tr,
  bg: bg,
  che: cs,
  az: az,
  ru: ru,
}
const state = reactive({
  full_name: '',
  email: authStore.user?.email,
  phone: authStore.user?.userDetail?.mobile_phone,
  reservation_id: route.query.request_id,
  data_umra: route.query,
  product_id: 8,
  type: route.query.type,
  comment: null,
  insurance_status: 0,
  transfer_status: 0,
  star: route.query.star,
  passengers: allPassengers.value,
  info_tour: route.query.info_tour,
  umra_status: route.query.umra_status,
})
const loading = ref(false)

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

const getData = async function () {
  await useApi()
    .$post('/v1/umrah/book', state, {
      params: {
        platform: 'app',
      },
    })
    .then((res) => {
      myToast('success', t('435'))
      // toast.success(t('435'))
      router.push(`/tour-orders/${res.data.data.id}`)
    })
    .catch((err) => {
      if (err.status === 423) {
        needPayOrders.value.push(err?._data?.errors)
        layoutStore.bookError = true
      }
      myToast('error', err?.data?.message)
    })
}

const submitForm = async () => {
  let invalidAge = true
  loading.value = true
  touched.value = true
  const result = await v$.value.$validate()
  for (let i = 0; i < state.passengers.length; i++) {
    let age =
      new Date().getTime() - new Date(state.passengers[i].birth).getTime()
    age = new Date(age).getFullYear() - 1970

    if (age >= 12 && state.passengers[i].type === 'ADT') {
      invalidAge = false
    } else if (age < 12 && age >= 2 && state.passengers[i].type === 'CHI') {
      invalidAge = false
    } else if (age < 2 && state.passengers[i].type === 'INF') {
      invalidAge = false
    }
  }
  if (result && !invalidAge && phoneValidation.value?.valid) {
    await getData()
    loading.value = false
  } else {
    myToast('warning', t('234'))
    // toast.warning(t('234'))
    loading.value = false
  }
  loading.value = false
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
function disableFutureDates(time) {
  // Get the current date
  const currentDate = new Date()

  // Calculate the date one month ahead
  const oneMonthAhead = new Date()
  oneMonthAhead.setMonth(currentDate.getMonth() + 6)

  // Disable dates that are one month or more ahead
  return time.getTime() < oneMonthAhead.getTime()
}

onMounted(async () => {
  try {
    state.full_name =
      authStore.user?.userDetail?.first_name ??
      '' + ' ' + authStore.user?.userDetail?.last_name ??
      ''
    pageLoading.value = true
    await dashboardStore.getCitizenship()

    for (let i = 0; i < Number(route.query.adults); i++) {
      state.passengers.push({
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
      })
    }
    for (let i = 0; i < Number(route.query.childs); i++) {
      state.passengers.push({
        type: 'CHI',
        first_name: null,
        last_name: null,
        birth: null,
        gender: null,
        citizenship: null,
        document_number: null,
        document_expire: null,
      })
    }
    // for (let i = 0; i < tour.tourBooking?.data?.inf_qnt; i++) {
    //   allPassengers.value.push({
    //     type: "INF",
    //     first_name: null,
    //     last_name: null,
    //     birth: null,
    //     gender: null,
    //     citizenship: null,
    //     document_number: null,
    //     document_expire: null,
    //     parent_document_number: null,
    //   });
    // }
    state.passengers.filter((x) => {
      if (x.type === 'ADT') {
        customArr.value.push({
          parent_document_number: null,
        })
      }
    })
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
  } catch (err) {
    console.log(err)
  } finally {
    pageLoading.value = false
  }
})

watchEffect(() => {
  for (let i = 0; i < customArr.value.length; i++) {
    if (state.passengers[i].type === 'ADT') {
      customArr.value[i].parent_document_number =
        state.passengers[i].document_number
    }
  }
  parents.value = customArr.value
})

useSeoMeta({
  title: t('410'),
  ogTitle: t('410'),
  description: t('779'),
  ogDescription: t('779'),
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
    padding: 28px 12px;
    border-radius: 6px;
    margin-bottom: 20px;
    .input-error {
      color: #e74848;
      font-weight: 600;
      font-size: 12px;
    }
  }
}
</style>
