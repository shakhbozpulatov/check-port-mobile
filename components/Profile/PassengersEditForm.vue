<template>
  <div
    class="p-3 shadow rounded bg-white grid md:grid-cols-3 grid-cols-1 gap-3"
  >
    <div class="w-full">
      <FormCLabel for-id="" :text="$t('728')" />
      <USelectMenu
        v-model="item.data.middle_name"
        class="!w-full alt_select"
        :disabled="changeBtn"
        :options="passengerType"
        option-attribute="label"
        value-attribute="value"
      >
      </USelectMenu>
    </div>
    <FormCInput
      id="last_name"
      v-model="item.data.last_name"
      :text="$t('357')"
      :placeholder="$t('357')"
      is-latin
      :disabled="changeBtn"
      :error="$v.last_name.$error"
      required
    />
    <FormCInput
      v-model="item.data.first_name"
      :placeholder="$t('135')"
      :text="$t('135')"
      is-latin
      :disabled="changeBtn"
      :error="$v.first_name.$error"
      required
    />
    <div class="w-full">
      <FormCLabel for-id="" :text="$t('102')" />
      <VueDatePicker
        v-model="item.data.country_birth"
        placeholder="12/12/2000"
        :month-change-on-scroll="false"
        :enable-time-picker="false"
        :format-locale="locales[locale]"
        auto-apply
        text-input
        format="dd/MM/yyyy"
        class="!w-full dialog-calendar"
        :disabled="changeBtn"
        :class="{
          error: $v.country_birth?.$error,
        }"
        :disabled-dates="
          (e) =>
            item?.data.middle_name === 'ADT'
              ? disableAdultCalendar(e, new Date())
              : item?.data.middle_name === 'CHI'
                ? disableChildCalendar(e, new Date())
                : disableInfantCalendar(e, new Date())
        "
      ></VueDatePicker>
    </div>
    <div class="w-full">
      <FormCLabel for-id="" :text="$t('258')" />
      <USelectMenu
        v-model="item.data.gender"
        class="!w-full alt_select"
        :placeholder="$t('73')"
        :disabled="changeBtn"
        :error="$v.gender.$error"
        :options="genders"
        option-attribute="label"
        value-attribute="value"
      >
      </USelectMenu>
    </div>
    <div class="w-full">
      <FormCLabel for-id="" :text="$t('84')" />
      <USelectMenu
        v-model="item.data.citizenship"
        filterable
        class="!w-full alt_select"
        :searchable-placeholder="$t('253')"
        searchable
        :disabled="changeBtn"
        :error="$v.citizenship.$error"
        :options="citizenship"
        option-attribute="name_ru"
        value-attribute="code"
      >
        <template #option-empty="{ query }">
          <q>{{ query }}</q> {{ $t('768') }}
        </template>
        <template #empty> {{ $t('768') }} </template>
      </USelectMenu>
    </div>
    <FormCInput
      id="document_number"
      v-model="item.data.number"
      :text="$t('297')"
      :error="$v.number.$error"
      is-latin
      :disabled="changeBtn"
      :placeholder="t('297')"
      input-class="!uppercase"
      required
    />
    <div class="w-full">
      <FormCLabel for-id="" :text="$t('304')" />
      <VueDatePicker
        v-model="item.data.place_birth"
        placeholder="12/12/2000"
        :month-change-on-scroll="false"
        :enable-time-picker="false"
        :format-locale="locales[locale]"
        auto-apply
        text-input
        format="dd/MM/yyyy"
        class="!w-full dialog-calendar"
        :disabled="changeBtn"
        :class="{
          error: $v.place_birth?.$error,
        }"
        :disabled-dates="disableFutureDates"
      ></VueDatePicker>
      <!--      <el-date-picker-->
      <!--        v-model="item.data.place_birth"-->
      <!--        class="!w-full"-->
      <!--        :class="{-->
      <!--          error: $v.place_birth?.$error,-->
      <!--        }"-->
      <!--        placeholder="DD.MM.YYYY"-->
      <!--        type="date"-->
      <!--        :disabled="changeBtn"-->
      <!--        size="large"-->
      <!--        :disabled-date="disableFutureDates"-->
      <!--        format="DD/MM/YYYY"-->
      <!--        value-format="YYYY-MM-DD"-->
      <!--      />-->
    </div>
    <UButton
      v-if="!changeBtn"
      class="bg-[#0073ff] rounded-[1rem] place-self-end w-full !h-[40px] flex items-center justify-center"
      @click="saveFunction"
    >
      {{ $t('7') }}</UButton
    >
    <UButton
      v-if="!changeBtn"
      class="rounded-[1rem] place-self-end w-full !h-[40px] flex items-center justify-center"
      color="red"
      @click="changeBtn = true"
    >
      {{ $t('230') }}</UButton
    >
    <UButton
      v-if="changeBtn"
      class="rounded-[1rem] place-self-end w-full !h-[40px] flex items-center justify-center"
      type="yellow"
      @click="changeFunction"
    >
      <i class="fa-light fa-pen"></i>
      {{ $t('133') }}</UButton
    >
    <PopConfirm
      v-if="changeBtn"
      :message="$t('697')"
      :confirm-button-text="$t('87')"
      :cancel-button-text="$t('188')"
      @confirm="delPassenger()"
    >
      <template #reference="{ toggle }">
        <UButton
          class="rounded-[1rem] trigger-button place-self-end w-full !h-[40px] justify-center"
          color="red"
          @click="toggle"
        >
          {{ $t('411') }}
        </UButton>
      </template>
    </PopConfirm>
    <!--    <el-popconfirm-->
    <!--      v-if="changeBtn"-->
    <!--      :title="$t('697')"-->
    <!--      width="300"-->
    <!--      class="w-full"-->
    <!--      :confirm-button-text="$t('87')"-->
    <!--      :cancel-button-text="$t('188')"-->
    <!--      :confirm-button-type="'text'"-->
    <!--      :cancel-button-type="'primary'"-->
    <!--      @confirm="delPassenger()"-->
    <!--    >-->
    <!--      <template #reference>-->
    <!--        <UButton class="place-self-end w-full !h-[40px]" type="danger">-->
    <!--          {{ $t('411') }}-->
    <!--        </UButton>-->
    <!--      </template>-->
    <!--    </el-popconfirm>-->
  </div>
</template>
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import VueDatePicker from '@vuepic/vue-datepicker'
import { az, bg, cs, enUS, ru, tr, uz } from 'date-fns/locale'
const { myToast } = useCustomToast()
import dayjs from 'dayjs'
import { MaskInput } from 'maska'
// import { computed, nextTick, onMounted, ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'

// import FormCInput from '@/components/Form/FormCInput.vue'
// import FormCLabel from '@/components/Form/FormCLabel.vue'
import {
  disableAdultCalendar,
  disableChildCalendar,
  disableInfantCalendar,
} from '@/utils'
import PopConfirm from '~/components/UI/PopConfirm.vue'
import { useApi } from '~/composables/useApi'

interface Props {
  data: object
}

const props = defineProps<Props>()
const item = unref(props.data)
const { t, locale } = useI18n()
const emit = defineEmits<{ (e: 'on-get-data'): void }>()
const locales = {
  en: enUS,
  uz: uz,
  tr: tr,
  bg: bg,
  che: cs,
  az: az,
  ru: ru,
}
const rulesArray = computed(() => {
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
    label: t('478'),
    value: 'INF',
  },
])
const $v = useVuelidate(rulesArray, item.data, { $scope: false })
const delPassenger = async () => {
  await useApi().$delete(`/mobile/user-document/${item.data.id}`)
  emit('on-get-data')
  myToast('success', t('726'))
  // toast.success(t('726'))
}

const saveFunction = async () => {
  $v.value.$touch()

  if (!$v.value.$invalid) {
    try {
      item.data.country_birth = dayjs(item.data.country_birth).format(
        'YYYY-MM-DD',
      )
      item.data.place_birth = dayjs(item.data.place_birth).format('YYYY-MM-DD')

      await useApi().$put(`/mobile/user-document/${item?.data?.id}`, {
        body: item.data,
      })
      myToast('success', t('727'))
      // toast.success(t('727'))
      changeBtn.value = true
    } catch (err) {
      console.log(err)
    }
  } else {
    myToast('error', t('234'))
    // toast.warning(t('234'))
    window.scrollTo({
      top: 50,
      behavior: 'smooth',
    })
  }
}

const changeFunction = () => {
  changeBtn.value = false
}

const changeBtn = ref(true)

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
  const currentDate = new Date()
  const oneMonthAhead = new Date()
  oneMonthAhead.setMonth(currentDate.getMonth() + 6)
  return time.getTime() < oneMonthAhead.getTime()
}
const dashboardStore = useDashboardStore()

const citizenship = computed(() => dashboardStore.citizenship)
Promise.all([dashboardStore.getCitizenship()]).catch((e) => {
  console.log(e)
})

onMounted(async () => {
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
<style scoped lang="scss"></style>
