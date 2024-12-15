<template>
  <div>
    <UIHeader without-image>
      {{ $t('689') }}
    </UIHeader>
    <form class="container mt-32">
      <div class="bg-white shadow rounded p-3 mb-3">
        <FormCInput
          id="first_name"
          v-model="userData.name"
          :text="$t('135')"
          :disabled="user.user.role_id !== 4"
          :placeholder="t('135')"
          is-latin
          required
          class="mb-4"
        />
        <FormCInput
          id="email"
          v-model="userData.email"
          :text="$t('373')"
          :disabled="user.user.role_id !== 4"
          :placeholder="t('373')"
          is-latin
          required
          class="mb-4"
        />

        <!--        <div>-->
        <!--          <FormCLabel :text="$t('329')"></FormCLabel>-->
        <!--          <VueTelInput-->
        <!--            v-bind="editBindProps"-->
        <!--            v-model="userData.phone"-->
        <!--            :disabled="user.user.role_id !== 4"-->
        <!--            class="py-[2px]"-->
        <!--            :class="{-->
        <!--              'border-red-700': touched ? !phoneValidation?.valid : false,-->
        <!--            }"-->
        <!--            @validate="(e) => (phoneValidation = e)"-->
        <!--          ></VueTelInput>-->
        <!--        </div>-->

        <div>
          <FormCLabel :text="$t('98')"></FormCLabel>
          <VueDatePicker
            v-model="userData.birth"
            placeholder="dd.mm.yyyy"
            :month-change-on-scroll="false"
            :enable-time-picker="false"
            format="dd/MM/yyyy"
            text-input
            auto-apply
            class="w-full md:!w-[200px]"
          ></VueDatePicker>
        </div>
        <p
          class="text-[#409eef] text-[15px] hover:underline cursor-pointer mt-5"
          @click="updatePasswordPhone"
        >
          {{ $t('698') }}
        </p>
      </div>
      <UButton
        :disabled="
          userData.phone === user.user.phone_mobile &&
          userData.email === user.user.email &&
          userData.birth === user.user.date_of_birth
        "
        class="bg-[#0073ff] rounded-[1rem] w-full flex items-center justify-center h-12"
        @click="updateProfile"
      >
        {{ $t('7') }}
      </UButton>
    </form>
    <MbscPopup
      :is-open="passwordDialogPhone"
      theme-variant="light"
      display="bottom"
      theme="material"
      css-class="small-popup rounded-popup"
      @close="passwordDialogPhone = false"
    >
      <div
        class="w-[40px] bg-[#F3F4F6] my-5 h-[8px] rounded-full m-auto"
        @click="passwordDialogPhone = false"
      ></div>
      <div class="p-[22px]">
        <div v-if="codeWindow">
          <div class="flex flex-col w-full">
            <FormCLabel for="phone" class="mb-4" :text="$t('329')" />
            <VueTelInput
              v-bind="editBindProps"
              v-model="updateData.phone"
              class="py-[2px]"
              :class="{
                'border-red-700': touched
                  ? !updatePhoneValidation?.valid
                  : false,
              }"
              @validate="(e) => (updatePhoneValidation = e)"
            ></VueTelInput>
          </div>
          <UButton
            :loading="loading"
            class="rounded-[1rem] bg-[#0073ff] h-10 justify-center w-full mt-6"
            @click="sendCode(updateData.phone)"
            >{{ $t('232') }}</UButton
          >
        </div>
        <div v-else>
          <div class="w-full mb-4">
            <FormCLabel
              for="code"
              class="mb-3 block !font-bold !text-[14px]"
              :text="$t('145')"
            />
            <FormOtp id="code" v-model="code" />
          </div>
          <FormCLabel
            for="newPassword"
            class="mb-3 block !font-bold !text-[14px]"
            :text="$t('699')"
          />
          <FormCInput
            id="newPassword"
            v-model="newPassword"
            :placeholder="t('699')"
            is-latin
            required
            class="mb-4 w-full"
          />
          <div class="flex items-center justify-end gap-3">
            <UIButton
              id="confirm"
              variant="primary"
              class="h-[48px] !bg-[#0073ff] text-white w-full"
              :loading="loading"
              @click="confirmPassword"
              >{{ $t('248') }}</UIButton
            >
            <UIButton
              id="code"
              variant="primary"
              class="h-[48px] !bg-[#0073ff] text-white w-full"
              @click="codeWindow = true"
              >{{ $t('700') }}</UIButton
            >
          </div>
        </div>
      </div>
    </MbscPopup>
  </div>
</template>
<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'

import { MbscPopup } from '@mobiscroll/datepicker-vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { MaskInput } from 'maska'
import { ref } from 'vue'
import { VueTelInput } from 'vue-tel-input'

definePageMeta({
  middleware: 'auth-required',
})
const localePath = useLocalePath()
const { myToast } = useCustomToast()
const user = useAuthStore()
const phoneValidation = ref(null)
const updatePhoneValidation = ref(null)
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
const passwordDialogPhone = ref(false)
const token = ref('')
const codeWindow = ref(true)
const code = ref('')
const { t } = useI18n()
const newPassword = ref('')
const loading = ref(false)
const userData = reactive({
  phone: user.user?.phone_mobile ? '+' + user.user?.phone_mobile : '',
  email: user.user?.email || '',
  birth: user.user?.date_of_birth || '',
  name: user.user.userDetail?.first_name || '',
})
const updateData = reactive({
  phone: user.user?.phone_mobile ? '+' + user.user?.phone_mobile : '',
  email: user.user?.email || '',
})
const updatePasswordPhone = () => {
  passwordDialogPhone.value = true
}

const sendCode = async (phone_or_email) => {
  loading.value = true
  await useApi()
    .$post(
      `/v1/user/update-password-send-code?phone_or_email=${phone_or_email}`,
      {},
    )
    .then((res) => {
      codeWindow.value = false
      token.value = res?.data?.token
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}
const confirmPassword = async () => {
  loading.value = true
  await useApi()
    .$post(
      `/v1/user/update-password-confirm-code?code=${code.value}&password=${newPassword.value}&token=${token.value}`,
      {},
    )
    .then(() => {
      codeWindow.value = false

      passwordDialogPhone.value = false
      myToast('success', t('701'))
      // toast.success(t('701'))
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

// const delete_accaunt = async () => {
//   await useApi().$post('/v1/user/delete')
//   localStorage.removeItem('token')
//   window.location.replace('/')
// }
const updateProfile = () => {
  useApi()
    .$post('/v1/user/update', {
      body: {
        email: userData.email,
        first_name: userData.name,
        // phone: userData.phone.toString(),
        date_of_birth: userData.birth,
      },
    })
    .then(async () => {
      await user.fetchUser()
      await navigateTo(localePath('/profile/user-settings'))
      myToast('success', t('715'))
      // toast.success(t('715'))
    })
    .catch((err) => {
      myToast('error', err?._data?.message)
      console.log(err)
    })
}
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
})

useSeoMeta({
  title: t('178'),
  ogTitle: t('178'),
  description: `${t('689')}`,
  ogDescription: `${t('689')}`,
})
</script>
