<template>
  <div>
    <UIHeader without-image> {{ $t('241') }} </UIHeader>
    <div class="container mt-32">
      <div
        class="grid grid-cols-1 gap-3 items-center mb-3 md:grid-cols-2 bg-white p-3 rounded shadow"
      >
        <h5 class="h5 !mb-0">{{ $t('729') }}</h5>
        <UButton
          class="bg-[#0073ff] justify-self-end rounded-[1rem]"
          @click="dialogVisible = true"
          >{{ $t('732') }} +</UButton
        >
      </div>
      <UModal
        v-model="dialogVisible"
        :fullscreen="width < 576"
        :title="t('732')"
        :width="width < 1028 ? '60%' : '50%'"
        :ui="{
          width: 'sm:max-w-[90%] md:!w-[60%]',
          wrapper: 'z-[200]',
          fullscreen: 'h-auto',
        }"
        @opened="dialogOpened"
      >
        <div class="flex p-3 justify-between items-center">
          <span>{{ $t('732') }}</span>
          <UButton
            class="rounded-[1rem]"
            @click="dialogVisible = !dialogVisible"
            ><i class="fa-solid fa-xmark"></i
          ></UButton>
        </div>
        <hr />
        <div class="grid md:grid-cols-3 grid-cols-1 gap-3 p-3">
          <div>
            <FormCLabel for-id="" :text="$t('728')" />
            <USelect
              v-model="passengerObject.middle_name"
              class="alt_select"
              :placeholder="$t('241')"
              :options="passengerType"
              option-attribute="label"
            >
            </USelect>
          </div>
          <FormCInput
            id="last_name"
            v-model="passengerObject.last_name"
            :text="$t('357')"
            :error="v$.last_name?.$error"
            :placeholder="t('357')"
            is-latin
            required
          />
          <FormCInput
            id="first_name"
            v-model="passengerObject.first_name"
            :text="$t('135')"
            :error="v$.first_name?.$error"
            :placeholder="t('135')"
            is-latin
            required
          />
          <div class="w-full">
            <FormCLabel for-id="" :text="$t('102')" />
            <VueDatePicker
              v-model="passengerObject.country_birth"
              placeholder="12/12/2000"
              :month-change-on-scroll="false"
              :enable-time-picker="false"
              :format-locale="locales[locale]"
              auto-apply
              text-input
              format="dd/MM/yyyy"
              class="!w-full dialog-calendar"
              :class="{
                error: v$.country_birth?.$error,
              }"
              :disabled-dates="
                (e) =>
                  passengerObject.middle_name === 'ADT'
                    ? disableAdultCalendar(e, new Date())
                    : passengerObject.middle_name === 'CHI'
                      ? disableChildCalendar(e, new Date())
                      : disableInfantCalendar(e, new Date())
              "
            ></VueDatePicker>
          </div>
          <div class="w-full">
            <FormCLabel for-id="" :text="$t('258')" />
            <USelect
              v-model="passengerObject.gender"
              class="!w-full alt_select"
              :class="{
                error: v$.gender?.$error,
              }"
              :placeholder="$t('73')"
              :options="genders"
              option-attribute="label"
            />
          </div>
          <div class="w-full border-re">
            <FormCLabel for-id="" :text="$t('84')" />
            <USelectMenu
              v-model="passengerObject.citizenship"
              searchable
              :class="{
                error: v$.citizenship?.$error,
              }"
              :ui="{ base: 'error-select-menu' }"
              :placeholder="$t('73')"
              class="!w-full dp_select_menu alt_select"
              :options="citizenship"
              value-attribute="code"
              option-attribute="name_ru"
            />
          </div>
          <FormCInput
            id="document_number"
            v-model="passengerObject.number"
            :text="$t('297')"
            is-latin
            :error="v$.number?.$error"
            :placeholder="t('297')"
            input-class="!uppercase"
            required
          />
          <div class="w-full">
            <FormCLabel for-id="" :text="$t('304')" />
            <VueDatePicker
              v-model="passengerObject.place_birth"
              placeholder="12/12/2000"
              :month-change-on-scroll="false"
              :enable-time-picker="false"
              :format-locale="locales[locale]"
              auto-apply
              text-input
              format="dd/MM/yyyy"
              class="!w-full dialog-calendar"
              :class="{
                error: v$.place_birth?.$error,
              }"
              :disabled-dates="disableFutureDates"
            ></VueDatePicker>
          </div>
          <UButton
            type="success"
            class="place-self-end rounded-[1rem] w-full !h-[40px] flex items-center justify-center"
            :loading="loadingBtn"
            @click="createPassenger"
          >
            Создать
          </UButton>
        </div>
      </UModal>
      <div
        v-if="passengersListArray?.length"
        class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10"
      >
        <ProfilePassengersEditForm
          v-for="(item, index) in passengersListArray"
          :key="index"
          :data="item"
          @on-get-data="getPassengersTemplate"
        />
      </div>
      <div
        v-else
        class="bg-amber-300 rounded-lg text-white py-5 text-center col-span-12"
        role="alert"
      >
        {{ $t('730') }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import VueDatePicker from '@vuepic/vue-datepicker'
import { useWindowSize } from '@vueuse/core'
import { az, bg, cs, enUS, ru, tr, uz } from 'date-fns/locale'
import { MaskInput } from 'maska'

// import { useI18n } from 'vue-i18n'
//   import { useDashboardStore } from '@/modules/Dashboard/store'
//   import CPassengersEditForm from '@/modules/Profile/components/CPassengersEditForm.vue'
import {
  disableAdultCalendar,
  disableChildCalendar,
  disableInfantCalendar,
} from '@/utils'
import { useApi } from '~/composables/useApi'
definePageMeta({
  middleware: 'auth-required',
})
const { t, locale } = useI18n()
const { width } = useWindowSize()
const { myToast } = useCustomToast()
const passengersListArray = ref([])
const dialogVisible = ref(false)
const dashboardStore = useDashboardStore()
const citizenship = computed(() => dashboardStore.citizenship)
const loadingBtn = ref(false)
const locales = {
  en: enUS,
  uz: uz,
  tr: tr,
  bg: bg,
  che: cs,
  az: az,
  ru: ru,
}
const passengerObject = ref({
  middle_name: 'ADT',
  first_name: '',
  last_name: '',
  country_birth: '',
  gender: '',
  citizenship: '',
  number: '',
  place_birth: '',
  save: 1,
  type: 'PASSPORT',
})
const passengerType = ref([
  {
    label: t('58'),
    value: 'ADT',
  },
  {
    label: t('725'),
    value: 'CHI',
  },
  {
    label: t(478),
    value: 'INF',
  },
])
const rules = computed(() => {
  return {
    first_name: {
      required,
    },
    last_name: {
      required,
    },
    country_birth: {
      required,
    },
    gender: {
      required,
    },
    citizenship: {
      required,
    },
    number: {
      required,
    },
    place_birth: {
      required,
    },
  }
})
const v$ = useVuelidate(rules, passengerObject.value)
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
const createPassenger = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    loadingBtn.value = true
    passengerObject.value.country_birth = formatDate(
      passengerObject.value.country_birth,
    )
    passengerObject.value.place_birth = formatDate(
      passengerObject.value.place_birth,
    )
    try {
      await useApi().$post('/mobile/user-document', {
        body: passengerObject.value,
      })
      await getPassengersTemplate()
      dialogVisible.value = false
      myToast('success', t('731'))
      //   $toast.success(t('731'))
    } catch (err) {
      console.log(err)
    } finally {
      loadingBtn.value = false
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
const formatDate = (date: Date) => {
  const dateObject = new Date(date)
  const day = dateObject.getDate()
  const month = dateObject.getMonth() + 1
  const year = dateObject.getFullYear()

  return `${year}-${month}-${day}`
}
const getPassengersTemplate = async () => {
  passengersListArray.value = []
  await useApi()
    .$get('/mobile/user-document?sort=1')
    .then((res) => {
      passengersListArray.value = res.data
    })
}
const disableFutureDates = function (time) {
  const currentDate = new Date()
  const oneMonthAhead = new Date()
  oneMonthAhead.setMonth(currentDate.getMonth() + 6)
  return time.getTime() < oneMonthAhead.getTime()
}

const dialogOpened = () => {
  const inputs = document.querySelectorAll('.dp__input')
  for (const key of inputs) {
    if (key) {
      key?.setAttribute('data-maska', '##/##/####')
      new MaskInput(key, {
        mask: () => '##/##/####',
      })
    }
  }
}

Promise.all([dashboardStore.getCitizenship()]).catch((e) => {
  console.log(e)
})

onMounted(async () => {
  await nextTick(() => {
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
  await getPassengersTemplate()
})

useSeoMeta({
  title: t('729'),
  ogTitle: t('729'),
  description: `${t('732')}`,
  ogDescription: `${t('732')}`,
})
</script>
