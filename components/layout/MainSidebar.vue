<template>
  <div class="flex flex-col gap-3">
    <div v-if="authStore.user && authStore.user?.id !== 5951">
      <div class="flex items-center justify-between">
        <NuxtLinkLocale
          to="/profile"
          class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
          @click="layoutStore.isSidebarOpen = false"
        >
          <i class="fa-regular fa-user fa-lg text-blue"></i>
          <div>
            <p class="test-base text-gray-400 leading-4">
              {{ $t('479') }}
            </p>
            <p v-if="authStore.user?.email" class="text-[15px]">
              {{ authStore.user?.email }}
            </p>
            <p v-else class="text-[15px]">{{ authStore.user?.phone_mobile }}</p>
          </div>
        </NuxtLinkLocale>
        <UButton class="rounded-[1rem]" plain @click="logout">{{
          $t('74')
        }}</UButton>
      </div>
    </div>
    <div
      v-else
      class="cursor-pointer"
      @click="layoutStore.activeSidebar = 'login'"
    >
      <div
        class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
      >
        <i style="color: #0073ff" class="fa-regular fa-house fa-lg"></i>
        <p class="text-[15px]">{{ $t('425') }}</p>
      </div>
    </div>
    <a
      href="tel:+998712017777"
      class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
    >
      <i style="color: #0073ff" class="fa-regular fa-phone fa-lg"></i>
      <p class="text-[15px]">(71) 201-77-77</p>
    </a>
    <NuxtLinkLocale
      to="/offices"
      class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
      @click="layoutStore.isSidebarOpen = false"
    >
      <i style="color: #0073ff" class="fa-regular fa-location-dot fa-lg"></i>
      <p class="text-[15px]">{{ $t('603') }}</p>
    </NuxtLinkLocale>
    <NuxtLinkLocale
      to="/vacancy"
      class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
      @click="layoutStore.isSidebarOpen = false"
    >
      <i style="color: #0073ff" class="fa-regular fa-briefcase fa-lg"></i>
      <p class="text-[15px]">{{ $t('617') }}</p>
    </NuxtLinkLocale>
    <a
      v-if="!isWebView()"
      href="https://b2b.asialuxe.uz/"
      class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
    >
      <i style="color: #0073ff" class="fa-regular fa-user-secret fa-lg"></i>
      <p class="text-[15px]">{{ $t('591') }}</p>
    </a>
    <NuxtLinkLocale
      to="/about"
      class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
      @click="layoutStore.isSidebarOpen = false"
    >
      <i style="color: #0073ff" class="fa-regular fa-building fa-lg"></i>
      <p class="text-[15px]">{{ $t('592') }}</p>
    </NuxtLinkLocale>
    <!--    <a href="/support" class="flex items-center gap-3">
          <i style="color: #409eef" class="fa-regular fa-headset fa-lg"></i>
          <p class="text-[15px]">{{ $t('249') }} </p>
        </a>-->
    <a
      href="/docs/contract_2024.pdf"
      class="flex items-center gap-3 hover:bg-[#0073FF20] p-3 rounded-lg transition-all"
    >
      <i style="color: #0073ff" class="fa-light fa-file-contract fa-lg"></i>
      <p class="text-[15px]">{{ $t('514') }}</p>
    </a>
    <UButton
      variant="outline"
      class="flex items-center justify-center md:hidden rounded-[1rem]"
      size="lg"
      @click="
        (layoutStore.langDialog = true), (layoutStore.isSidebarOpen = false)
      "
    >
      <i class="fa-regular fa-globe text-blue"></i>
      <p class="uppercase text-blue">{{ props.lang }} / {{ props.currency }}</p>
    </UButton>
  </div>
</template>
<script setup lang="ts">
type TCurrency = {
  currency: string
  lang: string
}

const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const props = defineProps<TCurrency>()
import { isWebView } from '@/composables/useWebViewDetector'

const token = useCookie('token')

definePageMeta({
  middleware: ['auth'],
})
const logout = () => {
  token.value = null
  window.location.replace('/')
}
</script>
