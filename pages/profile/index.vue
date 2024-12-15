<template>
  <div>
    <UIHeader without-image> {{ $t('479') }} </UIHeader>
    <div class="container mt-32">
      <ul class="bg-white rounded-lg px-4">
        <li v-for="(item, i) in menus" :key="i" class="py-4 border-b-[1px]">
          <NuxtLink
            :to="item.link"
            exact-active-class="rounded"
            class="flex items-center justify-between"
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
          </NuxtLink>
        </li>
        <li class="py-4 border-b-[1px]" @click="deleteAccount">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <!--              <i :class="item.ico"></i>-->
              <p>{{ $t('696') }}</p>
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
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
definePageMeta({
  middleware: ['auth-required'],
})
const { t, locale } = useI18n()
const store = useAuthStore()

const menus = ref([
  // {
  //   label: '479',
  //   link: `/${locale.value}/profile`,
  //   ico: 'fa-light fa-user me-2',
  // },
  {
    label: '241',
    link: `/${locale.value}/profile/passengers-settings`,
    ico: 'fa-light fa-passport me-2',
  },
  {
    label: '690',
    link: `/${locale.value}/profile/orders/avia-orders`,
    ico: 'fa-light fa-tickets-airline me-2',
  },
  {
    label: '358',
    link: `/${locale.value}/profile/finance`,
    ico: 'fa-sharp fa-regular fa-coins me-2',
  },
  {
    label: '689',
    link: `/${locale.value}/profile/user-settings`,
    ico: 'fa-regular fa-gear me-2',
  },
])
const deleteAccount = async () => {
  console.log('deleteAccount')
  await useApi().$post('/v1/user/delete')
  const token = useCookie('token')
  token.value = null
  window.location.replace('/')
}
</script>

<style scoped lang="scss">
.aside-nav {
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.transition-300 {
  transition: 0.3s ease-in-out;
}
</style>
