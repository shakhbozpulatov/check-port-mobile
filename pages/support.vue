<template>
  <div>
    <UIHeader without-image no-back> {{ $t('249') }} 24/7 </UIHeader>
    <div class="mt-[140px] container">
      <ul class="px-[32px] bg-white rounded-lg mt-10">
        <template v-for="(item, i) in settings" :key="i">
          <li class="py-4 border-b-[1px]">
            <div
              v-if="item.action"
              class="flex items-center justify-between"
              @click="item.action()"
            >
              <div class="flex items-center gap-3">
                <i :class="item.ico"></i>
                <p>{{ $t(item.label) }}</p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <NuxtLinkLocale
              v-if="item.link && !item.bitrix"
              class="flex items-center justify-between"
              :to="item.link"
            >
              <div class="flex items-center gap-3">
                <i :class="item.ico"></i>
                <p>{{ $t(item.label) }}</p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </NuxtLinkLocale>
            <div
              v-if="!item.link && item.bitrix"
              class="flex items-center justify-between"
              @click="onBitrixClick"
            >
              <div class="flex items-center gap-3">
                <i :class="item.ico"></i>
                <p>{{ $t(item.label) }}</p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </li>
        </template>
      </ul>
      <ul class="px-[32px] bg-white rounded-lg mt-10">
        <template v-for="(item, i) in menu" :key="i">
          <li class="py-4 border-b-[1px]">
            <div
              v-if="item.action"
              class="flex items-center justify-between"
              @click="item.action()"
            >
              <div class="flex items-center gap-3">
                <i :class="item.ico"></i>
                <p>{{ $t(item.label) }}</p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <NuxtLinkLocale
              v-if="item.link && !item.bitrix"
              class="flex items-center justify-between"
              :to="item.link"
            >
              <div class="flex items-center gap-3">
                <i :class="item.ico"></i>
                <p>{{ $t(item.label) }}</p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </NuxtLinkLocale>
            <div
              v-if="!item.link && item.bitrix"
              class="flex items-center justify-between"
              @click="onBitrixClick"
            >
              <div class="flex items-center gap-3">
                <i :class="item.ico"></i>
                <p>{{ $t(item.label) }}</p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="#111827"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useUserLocation } from '~/composables/useuserLocation'

const { t } = useI18n()

const onBitrixClick = () => {
  const bitrix = document.querySelector('.b24-widget-button-openline_livechat')
  bitrix?.click?.()
}
const { getLocation, userLocation, locationError, isLoading } =
  useUserLocation()
const menu = [
  {
    label: 'Telegram',
    link: 'https://t.me/asialuxesupport_bot',
    ico: 'fa-brands fa-telegram me-2',
  },
  {
    label: 'Whatsapp',
    link: 'https://api.whatsapp.com/send/?phone=998773178788&text&type=phone_number&app_absent=0',
    ico: 'fa-brands fa-whatsapp me-2',
  },
  {
    label: '677',
    link: '',
    ico: 'fa-light fa-messages me-2',
    bitrix: true,
  },
]

const settings = [
  {
    label: `1111 - ${t('828')}`,
    link: 'tel:1111',
    ico: 'fa-light fa-phone me-2',
  },
  {
    label: '+998 (71) 201-77-77',
    link: 'tel:+998712017777',
    ico: 'fa-light fa-phone me-2',
  },
  {
    label: 'info@asialuxe.uz',
    link: 'mailto:info@asialuxe.uz',
    ico: 'fa-light fa-envelope me-2',
  },
]
onMounted(() => {
  getLocation()
})
onBeforeUnmount(() => {
  const btn = document.querySelector('.bx-livechat-control-btn-close')
  if (btn) btn.click()
})
</script>
