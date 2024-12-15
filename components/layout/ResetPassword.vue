<template>
  <div class="flex flex-col gap-[30px]">
    <div class="gird grid-cols-12 gap-3">
      <div v-if="currentStep === 'email'" class="md:col-span-12 col-span-12">
        <p class="form-title text-center">{{ $t('295') }}</p>
        <div>
          <CLabel text="Phone" required />
          <vue-tel-input
            v-bind="editBindProps"
            v-model="form.phone_or_email"
            class="py-[2px]"
            :class="{
              '!border-red-700':
                (phoneValidation?.number && !phoneValidation?.valid) ||
                $v.phone_or_email.$error,
            }"
            @validate="(e) => (phoneValidation = e)"
          />
        </div>
        <UButton
          class="w-full mt-4 flex justify-center rounded-[1rem]"
          size="lg"
          type="primary"
          :loading="loading"
          @click="sendCode"
        >
          {{ $t('295') }}
        </UButton>
      </div>
      <div v-if="currentStep === 'code'" class="md:col-span-12 col-span-12">
        <p class="form-title text-center">{{ $t('295') }}</p>
        <div>
          <CLabel :text="$t('145')" required />
          <FormOtp
            v-model="form.code"
            class="!h-10"
            size="lg"
            :error="$v.code.$error"
            :placeholder="$t('145')"
          />
        </div>
        <UButton
          class="w-full mt-4 flex justify-center rounded-[1rem]"
          size="lg"
          type="primary"
          :loading="loading"
          @click="confirmCode"
        >
          {{ $t('812') }}
        </UButton>
      </div>
      <div v-if="currentStep === 'password'" class="md:col-span-12 col-span-12">
        <p class="form-title text-center">{{ $t('295') }}</p>
        <div>
          <CLabel :text="$t('238')" required />
          <div class="relative">
            <UInput
              v-model="form.password"
              :error="$v.password.$error"
              :placeholder="$t('238')"
              :type="showPassword ? 'text' : 'password'"
              size="lg"
            />
            <i
              :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              class="fa-solid absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              @click="togglePasswordVisibility"
            ></i>
          </div>
        </div>
        <UButton
          class="w-full mt-4 flex justify-center rounded-[1rem]"
          size="lg"
          type="primary"
          :loading="loading"
          @click="resetPasswordStep"
        >
          {{ $t('424') }}
        </UButton>
      </div>
    </div>
    <UDivider v-if="!isModal">
      {{ $t('385') }}
    </UDivider>
    <UButton
      v-if="!isModal"
      class="w-full flex justify-center rounded-[1rem]"
      size="lg"
      @click="layoutStore.activeSidebar = 'main'"
      >{{ $t('618') }}</UButton
    >
  </div>
</template>
<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'

import { useVuelidate } from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VueTelInput } from 'vue-tel-input'

import CLabel from '@/components/Form/CLabel.vue'
interface Props {
  isModal?: boolean
}
const props = defineProps<Props>()
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
const phoneValidation = ref({})
const { myToast } = useCustomToast()
const layoutStore = useLayoutStore()

const { t } = useI18n()
// const emits = defineEmits(['on-reset'])
const loading = ref(false)
const currentStep = ref('email')
const codeResponse = ref({})
const confirmCodeResponse = ref({})
const showPassword = ref(false)

const form = reactive({
  phone_or_email: '',
  code: '',
  password: '',
})

const rules = {
  phone_or_email: { required },
  code: { required },
  password: { required },
}

const $v = useVuelidate(rules, form)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const sendCode = async () => {
  $v.value.phone_or_email.$touch()
  if (!$v.value.phone_or_email.$invalid) {
    loading.value = true
    try {
      const res = await useApi().$post('/v1/user/send-code', {
        body: {
          phone_or_email: phoneValidation.value?.number,
        },
      })
      codeResponse.value = res?.data
      if (res?.data?.status === 'sending') {
        myToast('success', t('600'))
        // toast.success(t('600'))
      } else {
        myToast('success', res?.data?.email)
        // toast.success(res?.data?.data?.email)
      }
      currentStep.value = 'code'
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }
}
const confirmCode = async () => {
  $v.value.code.$touch()
  if (!$v.value.code.$invalid) {
    try {
      const res = await useApi().$get('/v1/user/confirm-code', {
        params: {
          token: codeResponse.value?.token,
          code: form.code,
        },
      })
      console.log(res)
      confirmCodeResponse.value = res?.data
      currentStep.value = 'password'
      console.log('contoken', confirmCodeResponse.value)
    } catch (err) {
      console.log(err)
    }
  }
}
const resetPasswordStep = async () => {
  $v.value.password.$touch()
  if (!$v.value.password.$invalid) {
    loading.value = true
    try {
      const res = await useApi().$post('/v1/user/reset-password', {
        body: {
          token: confirmCodeResponse.value?.token,
          password: form.password,
        },
      })
      if (res?.data?.status) {
        layoutStore.loginForm.phone_or_email = form.phone_or_email
        layoutStore.loginForm.password = form.password
        if (props.isModal) {
          layoutStore.authRequiredMain = 'login'
        } else {
          layoutStore.activeSidebar = 'login'
        }
      }
    } catch (err) {
      console.log(err)
    } finally {
      loading.value = false
    }
  }
}
</script>
