<template>
  <div class="grid grid-cols-1">
    <div
      class="w-full mb-5 border bg-white rounded-2xl flex items-center gap-3 p-3 h-[48px] justify-center"
      @click="openGoogleOAuth"
    >
      <img src="/images/google.svg" alt="auth" width="20px" />
      <span class="text-[14px]">{{ $t('851') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth'

import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'
import { useNuxtApp } from '#app'
const localePath = useLocalePath()
const { $firebaseAuth } = useNuxtApp()
const clientId =
  '673090903165-rr68dp01fd0nfakbvc1ijdmourrl5tbp.apps.googleusercontent.com'
const store = useAuthStore()
// const handleCredentialResponse = (response: any) => {
//   loginViaGoogle(response?.credential)
// }
function isIOSWebView() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  // iOS WebView has Mobile and Safari but lacks 'Version'
  return (
    /iPhone|iPad|iPod/.test(userAgent) &&
    /Safari/.test(userAgent) &&
    !/Version/.test(userAgent)
  )
}

async function openGoogleOAuth() {
  if (isIOSWebView()) {
    Object.defineProperty(navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
      writable: false,
    })
  }
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup($firebaseAuth, provider)
    await loginViaGoogle(result.user?.accessToken)
  } catch (error) {
    console.error('Error during sign-in:', error)
  }
}

async function loginViaGoogle(token: string) {
  try {
    const res = await useApi().$get('v1/user/login-by-google', {
      params: {
        token,
      },
    })
    store.setToken(res.data.token)
    await navigateTo(localePath('/'))
  } catch (err) {
    console.log(err)
  }
}
</script>

<style scoped></style>
