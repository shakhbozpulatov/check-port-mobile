<template>
  <div>
    <UIHeader without-image> {{ $t('162') }} </UIHeader>
    <div class="container mt-[140px]">
      <div class="form mt-6">
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
        <div class="relative mt-5">
          <UInput
            v-model="layoutStore.loginForm.password"
            :placeholder="$t('238')"
            size="xl"
            :type="showPassword ? 'text' : 'password'"
            class="*:rounded-[1rem] *:p-3 *:h-[48px]"
            :class="{ input_error: $v.password.$error }"
          />
          <i
            v-if="layoutStore.loginForm.password.length > 0"
            :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
            class="fa-solid absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            @click="togglePasswordVisibility"
          ></i>
        </div>

        <NuxtLink :to="`/${locale}/auth/update`">
          <p class="mt-3 mb-5">{{ $t('121') }}</p>
        </NuxtLink>

        <UButton
          class="w-full bg-[#0073ff] flex items-center justify-center rounded-[1rem] p-3"
          size="xl"
          :disabled="layoutStore.loginForm.password === ''"
          :loading="loading"
          variant="solid"
          @click="onSubmit"
          >{{ $t('425') }}</UButton
        >
        <div class="flex items-center gap-3 text-[#888] my-5">
          <span class="border-[1px] w-[50%]"></span>
          <span>{{ $t('385') }}</span>
          <span class="border-[1px] w-[50%]"></span>
        </div>
        <AuthGoogleSignInComponent />
        <AuthAppleSignIn />
        <div class="flex flex-col gap-3">
          <NuxtLinkLocale to="/auth/register">
            <UIButton
              id="link"
              variant="light"
              class="w-full !p-3 text-[16px] !h-[48px]"
            >
              {{ $t('130') }}
            </UIButton>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import 'vue-tel-input/vue-tel-input.css'

import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { ref } from 'vue'
import { VueTelInput } from 'vue-tel-input'
const { t, locale } = useI18n()

const { myToast } = useCustomToast()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const router = useRouter()

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
  phone_or_email: { required, minLength: minLength(9) },
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
      await router.push('/')
      myToast('success', t('598'))
      // $emit('on-success')
    } catch (err) {
      myToast('error', t('163'))
      console.log(err)
    } finally {
      loading.value = false
    }
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
.form {
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
}
</style>
