<template>
  <div class="flex flex-col gap-[22px]">
    <p class="font-normal text-sm text-greyscale-500 text-center">
      {{ $t('822') }}
    </p>
    <div>
      <label
        for="logEmail"
        :class="{ label_error: $v.phone_or_email.$error }"
        class="label text-sm"
        >{{ $t('329') }}</label
      >
      <vue-tel-input
        v-bind="editBindProps"
        v-model="layoutStore.loginForm.phone_or_email"
        class="py-[2px]"
        :class="{
          '!border-red-700':
            (phoneValidation?.number && !phoneValidation?.valid) ||
            $v.phone_or_email.$error,
        }"
        @validate="(e) => (phoneValidation = e)"
      />
    </div>
    <div>
      <label
        for="logPass"
        :class="{ label_error: $v.password.$error }"
        class="label text-sm"
        >{{ $t('238') }}</label
      >
      <div class="relative">
        <UInput
          id="logPass"
          v-model="layoutStore.loginForm.password"
          class="h-10 rounded mb-2"
          required
          :class="{ input_error: $v.password.$error }"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="$t('238')"
          size="lg"
        />
        <i
          :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
          class="fa-solid absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
          @click="togglePasswordVisibility"
        ></i>
      </div>
      <div class="flex items-center justify-between">
        <ULink
          class="text-gray-400 inline cursor-pointer border-b border-[#3f9eff]"
          @click="
            isModal
              ? (layoutStore.authRequiredMain = 'reset')
              : (layoutStore.activeSidebar = 'reset')
          "
          >{{ $t('295') }}</ULink
        >
        <ULink
          v-if="!isModal"
          class="text-gray-600 inline cursor-pointer border-b border-[#3f9eff]"
          @click="layoutStore.activeSidebar = 'main'"
        >
          {{ $t('618') }}
        </ULink>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <UButton
        size="lg"
        v-bind="{ loading }"
        class="mb-2 flex justify-center rounded-[1rem]"
        @click="onSubmit"
        >{{ $t('425') }}</UButton
      >
      <div class="flex gap-2 w-full">
        <!--        <a-->
        <!--          v-if="!isModal"-->
        <!--          class="w-full"-->
        <!--          href="https://accounts.google.com/o/oauth2/auth?client_id=602868976557-7ck9rl8m6g616a38plnqc42n3mv5oc7r.apps.googleusercontent.com&redirect_uri=https://crm.asialuxe.app/auth/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&access_type=offline"-->
        <!--        >-->
        <!--          <UButton size="lg" class="w-full flex justify-center"-->
        <!--            ><i class="fa-brands fa-google mr-2"></i>-->
        <!--            <p>Google</p></UButton-->
        <!--          >-->
        <!--        </a>-->
        <!--        <a-->
        <!--          class="w-full"-->
        <!--          href="https://www.facebook.com/v19.0/dialog/oauth?client_id=1694018378013332&amp;redirect_uri=https://crm.asialuxe.app/auth/facebook&amp;state=email"-->
        <!--        >-->
        <!--          <UButton size="large" class="w-full"-->
        <!--            ><i class="fa-brands fa-facebook mr-2"></i>-->
        <!--            <p>Facebook</p></UButton-->
        <!--          >-->
        <!--        </a>-->
        <!--        <a class="w-full" href="">-->
        <!--          <UButton size="large" class="w-full"-->
        <!--            ><i class="fa-brands fa-apple mr-2"></i>-->
        <!--            <p>Apple</p></UButton-->
        <!--          >-->
        <!--        </a>-->
      </div>
      <UDivider>
        {{ $t('385') }}
      </UDivider>
      <UButton
        size="lg"
        type="primary"
        class="flex justify-center rounded-[1rem]"
        @click="
          isModal
            ? (layoutStore.authRequiredMain = 'register')
            : (layoutStore.activeSidebar = 'register')
        "
        >{{ $t('130') }}</UButton
      >
      <!--      <UButton size="large" @click="layoutStore.activeSidebar = 'main'">{{-->
      <!--        $t('618')-->
      <!--      }}</UButton>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'

import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { VueTelInput } from 'vue-tel-input'
interface Props {
  isModal?: boolean
}
defineProps<Props>()
const $emit = defineEmits<{
  (e: 'on-success'): void
}>()
const { myToast } = useCustomToast()
const { t } = useI18n()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()
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
const showPassword = ref(false)
const loading = ref(false)
const rules = {
  phone_or_email: { required },
  password: { required },
}
const $v = useVuelidate(rules, layoutStore.loginForm)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
const onSubmit = async () => {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    loading.value = true
    try {
      const data = {
        ...layoutStore.loginForm,
        phone_or_email: phoneValidation.value?.number,
      }
      await authStore.login(data)
      await authStore.fetchUser()
      layoutStore.activeSidebar = 'main'
      layoutStore.isSidebarOpen = false
      myToast('success', t('598'))
      $emit('on-success')
    } catch (err) {
      myToast('error', t('163'))
      console.log(err)
    } finally {
      loading.value = false
    }
  }
}
</script>
<style lang="scss" scoped>
//.input_error {
//  border-bottom: 1px solid red !important;
//  border-radius: 6px !important;
//}
.label_error {
  color: red;
}
</style>
