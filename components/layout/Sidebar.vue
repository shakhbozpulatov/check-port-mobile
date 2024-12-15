<template>
  <USlideover v-model="layoutStore.isSidebarOpen" class="z-[200]">
    <UCard
      :ui="{
        divide: '',
        ring: '',
        shadow: '',
        base: 'grid grid-rows-24 h-screen',
        header: {
          base: 'row-span-2 bg-white',
        },
        body: {
          base: 'row-span-7 overflow-y-scroll overflow-x-hidden d-scroll',
          padding: '!py-1',
        },
        footer: {
          base: 'row-span-3 self-end bg-white',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between pt-12">
          <div>
            <img
              class="logo-sidebar w-[90px]"
              src="/images/ny_logo.svg"
              alt=""
            />
            <img
              class="logo-sidebar hidden w-[90px]"
              src="/images/logo_white.svg"
              alt=""
            />
          </div>
          <div class="flex gap-3">
            <div
              class="border rounded bg-white px-2 py-1 cursor-pointer"
              @click="layoutStore.isSidebarOpen = false"
            >
              <i class="fa-sharp fa-solid fa-xmark-large"></i>
            </div>
          </div>
        </div>
      </template>
      <component
        :is="sidebarContent[layoutStore.activeSidebar]"
        :lang="locale"
        :currency="layoutStore.currency"
      ></component>
      <div class="flex flex-col border-t-2 border-dashed pt-3 mt-10">
        <div class="flex justify-between mb-3">
          <div class="text-left">
            <a href="mailto:info@asialuxe.uz" target="_blank"
              >info@asialuxe.uz</a
            >
            <p class="text-gray-400 text-[12px] text-left">
              {{ $t('620') }}
            </p>
          </div>
          <div class="text-right">
            <a href="tel:+998712017777" class="block" target="_blank"
              >+99871 201 77 77</a
            >
            <p class="text-gray-400 text-[12px] text-right mb-2">
              {{ $t('602') }}
            </p>
            <div class="flex gap-3">
              <a
                target="_blank"
                href="https://www.facebook.com/asia.luxe.travel"
                ><i class="fab fa-facebook fa-2x text-[#0073FF]"></i
              ></a>
              <a target="_blank" href="https://instagram.com/asialuxe.travel"
                ><i class="fab fa-instagram fa-2x text-[#0073FF]"></i
              ></a>
              <a target="_blank" href="https://t.me/asialuxesupport_bot"
                ><i class="fab fa-telegram fa-2x text-[#0073FF]"></i
              ></a>
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCqlYt1cED7Fn0tNpXvZ5MaQ"
                ><i class="fab fa-youtube fa-2x text-[#0073FF]"></i
              ></a>
            </div>
          </div>
        </div>
        <div class="flex justify-between gap-3 items-end">
          <div class="w-1/2">
            <span class="text-gray-400 text-[12px] text-left mb-1 block">{{
              $t('621')
            }}</span>
            <NuxtLinkLocale
              href="/police"
              class="text-gray-400 text-[12px] text-left"
              @click="layoutStore.isSidebarOpen = false"
            >
              {{ $t('716') }}
            </NuxtLinkLocale>
          </div>
          <a
            href="/docs/ofer_2024.pdf"
            class="text-gray-400 text-[12px] text-right"
            >{{ $t('282') }}</a
          >
        </div>
      </div>
    </UCard>
  </USlideover>
</template>
<script setup lang="ts">
import {
  LazyLayoutLogin,
  LazyLayoutMainSidebar,
  LazyLayoutRegister,
  LazyLayoutResetPassword,
} from '#components'

const layoutStore = useLayoutStore()

const { locale } = useI18n()
const { toggleTheme } = useTheme()
const sidebarContent = {
  main: LazyLayoutMainSidebar,
  login: LazyLayoutLogin,
  reset: LazyLayoutResetPassword,
  register: LazyLayoutRegister,
}
</script>
