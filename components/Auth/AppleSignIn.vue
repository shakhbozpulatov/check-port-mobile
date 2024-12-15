<template>
  <div class="grid grid-cols-1">
    <div
      class="w-full mb-5 border bg-white rounded-2xl flex items-center gap-3 p-3 h-[48px] justify-center"
      @click="openAppleOAuth"
    >
      <img src="/images/apple.svg" alt="auth" width="20px" />
      <span class="text-[14px]">{{ $t('852') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OAuthProvider, signInWithPopup } from '@firebase/auth'

// import firebase from 'firebase'
import { useApi } from '@/composables/useApi'
import { useAuthStore } from '@/stores/auth'
import { useNuxtApp } from '#app'
const localePath = useLocalePath()
const { $firebaseAuth } = useNuxtApp()
const store = useAuthStore()

async function openAppleOAuth() {
  const provider = new OAuthProvider('apple.com')
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
