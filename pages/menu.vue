<template>
  <div>
    <UIHeader without-image no-back> {{ $t('619') }} </UIHeader>
    <div class="mt-[140px] container">
      <ul class="px-[32px] bg-white rounded-lg">
        <template v-for="(item, i) in menus" :key="i">
          <li v-if="item.show" class="py-4 border-b-[1px]">
            <NuxtLinkLocale
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
            </NuxtLinkLocale>
          </li>
        </template>
        <li v-if="store.loggedIn" class="py-4 border-b-[1px]" @click="logout">
          <i class="fa-light fa-arrow-left-from-arc mr-3"></i>
          {{ $t('74') }}
        </li>
      </ul>
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
              v-if="item.link"
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
          </li>
        </template>
        <!-- <li v-if="store.loggedIn" class="py-4 border-b-[1px]" @click="logout">
          <i class="fa-light fa-arrow-left-from-arc mr-3"></i>
          {{ $t('74') }}
        </li> -->
      </ul>
    </div>
    <LazyLayoutLanguageSwitcher />
  </div>
</template>

<script setup lang="ts">
const store = useAuthStore()
const layoutStore = useLayoutStore()
const token = useCookie('token')
const menus = computed(() => {
  return [
    {
      label: '162',
      link: '/auth/login',
      ico: 'fa-light fa-right-to-bracket me-2',
      show: !store.loggedIn,
    },
    {
      label: '479',
      link: '/profile',
      ico: 'fa-light fa-user me-2',
      show: store.loggedIn,
    },
    // {
    //   label: '241',
    //   link: '/profile/passengers-settings',
    //   ico: 'fa-light fa-passport me-2',
    // },
    // {
    //   label: '690',
    //   link: '/profile/orders/avia-orders',
    //   ico: 'fa-light fa-tickets-airline me-2',
    // },
    // {
    //   label: '689',
    //   link: '/profile/user-settings',
    //   ico: 'fa-regular fa-gear me-2',
    // },
    // {
    //   label: '691',
    //   link: '/profile/contact-us',
    //   ico: 'fa-light fa-phone-volume me-2',
    // },
    // {
    //   label: '358',
    //   link: '/profile/finance',
    //   ico: 'fa-sharp fa-regular fa-coins me-2',
    // },
  ]
})

const settings = [
  {
    label: '377',
    action: () => {
      layoutStore.langDialog = true
    },
    ico: 'fa-light fa-earth me-2',
  },
  {
    label: '592',
    link: '/about',
    ico: 'fa-light fa-circle-info me-2',
  },
  {
    label: '835',
    link: '/offices',
    ico: 'fa-light fa-building me-2',
  },
  {
    label: '871',
    link: '/sale-archive',
    ico: 'fa-solid fa-percent me-2',
  },
  // {
  //   label: '689',
  //   link: '/profile/user-settings',
  //   ico: 'fa-regular fa-gear me-2',
  // },
  // {
  //   label: '691',
  //   link: '/profile/contact-us',
  //   ico: 'fa-light fa-phone-volume me-2',
  // },
  // {
  //   label: '358',
  //   link: '/profile/finance',
  //   ico: 'fa-sharp fa-regular fa-coins me-2',
  // },
]
const logout = () => {
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
