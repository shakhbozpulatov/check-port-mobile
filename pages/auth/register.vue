<template>
  <div>
    <UIHeader without-image>{{ $t('820') }}</UIHeader>
    <div class="container mt-[140px]">
      <form>
        <template v-if="steps === 'validation'">
          <div class="my-3">
            <label
              for="fullname"
              class="label"
              :class="{ label_error: $v.full_name.$error }"
              >{{ $t('135') }}</label
            >
            <UInput
              id="fullname"
              v-model="register.full_name"
              size="lg"
              :class="{ input_error: $v.full_name.$error }"
              type="text"
              class="*:rounded-[1rem] *:p-3 *:h-[48px]"
            />
          </div>
          <div class="mb-3">
            <label
              for="phone"
              :class="{ label_error: $v.phone.$error }"
              class="label"
              >{{ $t('200') }}</label
            >
            <vue-tel-input
              v-bind="editBindProps"
              v-model="register.phone"
              class="*:!rounded-[1rem] *:p-3 *:h-[48px] !rounded-[1rem]"
              :class="{
                '!border-red-700':
                  (phoneValidation?.number && !phoneValidation?.valid) ||
                  $v.phone.$error,
              }"
              @validate="(e) => (phoneValidation = e)"
            />
          </div>
          <div class="mb-3">
            <label
              for="password"
              :class="{ label_error: $v.password.$error }"
              class="label"
              >{{ $t('601') }}</label
            >
            <div class="relative">
              <UInput
                id="password"
                v-model="register.password"
                size="lg"
                required
                class="*:rounded-[1rem] *:p-3 *:h-[48px]"
                :class="{ input_error: $v.password.$error }"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('601')"
              />
              <i
                :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                class="fa-solid absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                @click="togglePasswordVisibility"
              ></i>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <UButton
              size="lg"
              class="flex justify-center bg-[#0073ff] rounded-[1rem] p-3"
              @click="onSubmit"
              >{{ $t('130') }}</UButton
            >
            <UDivider>
              {{ $t('385') }}
            </UDivider>
            <UIButton
              id="login"
              class="flex text-[16px] justify-center rounded-[1rem] !p-3"
              type="button"
              variant="light"
              @click="router.push(`/${locale}/auth/login`)"
              >{{ $t('425') }}</UIButton
            >
            <UIButton
              id="main_sidebar"
              class="flex justify-center text-[16px] rounded-[1rem] !p-3"
              variant="light"
              type="button"
              @click="router.push(`/${locale}/menu`)"
              >{{ $t('618') }}</UIButton
            >
          </div>
        </template>
        <template v-if="steps === 'otp'">
          <div>
            <h2 class="text-dark text-xl text-center">{{ $t('805') }}</h2>
            <div
              class="px-2 w-fit py-1 border flex items-center border-blue-950 rounded-md bg-white/90 text-dark mx-auto mb-5"
              @click="steps = 'validation'"
            >
              <span class="flex items-center">{{
                maskPhoneNumber(register.phone)
              }}</span
              ><i class="fa-solid fa-pen-to-square ml-2"></i>
            </div>
          </div>
          <FormOtp
            v-model="register.confirm_code"
            :error="confirmCodeError"
            @update:model-value="confirmCodeError = false"
          />
          <p v-if="isDisabled" class="text-center mt-3">{{ formattedTime }}</p>
          <p
            v-else
            class="text-center mt-3 text-[#0073ff]"
            @click="resendPassword"
          >
            {{ $t('843') }}
          </p>
          <div class="flex justify-center mt-3 gap-3">
            <UButton
              size="lg"
              class="flex justify-center"
              @click="onConfirmCode"
              >{{ $t('248') }}</UButton
            >
          </div>
        </template>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'

import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { VueTelInput } from 'vue-tel-input'
const { myToast } = useCustomToast()

import { useAuthStore } from '~/stores/auth'
import { detectPlatform } from '~/utils'

const { t, locale } = useI18n()

const authStore = useAuthStore()
const router = useRouter()
const phoneValidation = ref({})
const steps = ref('validation')
const isDisabled = ref(true) // Начальное состояние кнопки
const timeLeft = ref(60) // Таймер на 50 секунд
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

const resendPassword = async () => {
  isDisabled.value = true
  try {
    const res = await useApi().$post('v1/user/send-code-mobile', {
      params: {
        phone: phoneValidation.value?.number,
      },
    })
    steps.value = 'otp'
    timeLeft.value = 60
    startTimer()
    console.log(res, 'response')
  } catch (err) {
    console.log(err, 'my_error')
    myToast('error', err?._data?.message)
  }
}

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

const startTimer = () => {
  const timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(timer)
      isDisabled.value = false // Активируем кнопку по истечению времени
    }
  }, 1000)
}

const maskPhoneNumber = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  return `+*** ** *** ${digits.slice(-4, -2)} ${digits.slice(-2)}`
}

const showPassword = ref(false)
const confirmCodeError = ref(false)
const loading = ref(false)
const rules = {
  full_name: { required },
  password: { required },
  phone: { required, minLength: minLength(13) },
}
const register = reactive({
  full_name: '',
  password: '',
  confirm_code: '',
  phone: '',
})

const $v = useVuelidate(rules, register)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const onSubmit = async () => {
  $v.value.$touch()
  if (!$v.value.$invalid && phoneValidation.value?.valid) {
    if (steps.value === 'validation') {
      try {
        const res = await useApi().$post('v1/user/send-code-mobile', {
          params: {
            phone: phoneValidation.value?.number,
          },
        })
        steps.value = 'otp'
        timeLeft.value = 60
        startTimer()
        console.log(res, 'response')
      } catch (err) {
        console.log(err, 'my_error')
        myToast('error', err?._data?.message)
      }
    }
  }
}
const onConfirmCode = async () => {
  if (register.confirm_code?.length < 4) return
  try {
    await useApi().$post('v1/user/registration', {
      params: {
        platform: detectPlatform(),
      },
      body: {
        ...register,
        phone: phoneValidation.value?.number,
      },
    })
    await authStore.login({
      phone_or_email: phoneValidation.value?.number,
      password: register.password,
    })
    await authStore.fetchUser()
    await router.push('/')
    // layoutStore.activeSidebar = 'main'
    // layoutStore.isSidebarOpen = false
    myToast('success', t('597'))
  } catch (err) {
    console.log(err)
    myToast('error', err?._data.message)
    confirmCodeError.value = true
  }
}
onMounted(() => {
  const input = document.querySelector('.vti__input')
  if (input) input.setAttribute('inputmode', 'tel')
})
useSeoMeta({
  title: t('224'),
})
</script>
<style scoped lang="scss">
.text {
  margin: 20px 0 30px 0;
  font-size: 32px;
  font-weight: 700;
}
.input {
  border-radius: 26px;
  margin-top: 20px;
  //padding: 12px;
}
</style>
