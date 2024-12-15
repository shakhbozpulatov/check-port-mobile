<template>
  <div>
    <UIHeader without-image no-back> {{ $t('827') }} </UIHeader>
    <div class="mt-[140px] container">
      <ul class="px-3 bg-white rounded-lg mt-10">
        <template v-for="(item, i) in settings" :key="i">
          <li class="py-4 border-b-[1px]">
            <NuxtLinkLocale
              v-if="item.link"
              class="flex items-center justify-between"
              :to="item.link"
            >
              <div class="flex items-center gap-3">
                <i
                  v-if="item.ico"
                  :class="item.ico"
                  class="text-[#0073ff] text-[18px]"
                ></i>
                <img
                  v-else
                  src="/images/mini_logo_blue.svg"
                  alt="logo"
                  width="18px"
                  class="me-2"
                />
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
      </ul>
      <ul class="px-3 bg-white rounded-lg mt-10">
        <template v-for="(item, i) in menus" :key="i">
          <li class="py-4 border-b-[1px]">
            <NuxtLinkLocale
              v-if="item.link"
              class="flex items-center justify-between"
              :to="item.link"
            >
              <div class="flex items-center gap-3">
                <i v-if="item.ico" :class="item.ico"></i>
                <img
                  v-else
                  src="/images/mini_logo_blue.svg"
                  alt="logo"
                  width="18px"
                />
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
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const menus = computed(() => {
  return [
    {
      label: '819',
      link: '/favorites',
      ico: 'fa-light fa-heart me-2',
    },
  ]
})

const settings = [
  {
    label: '224',
    link: '/hotels',
    ico: 'fa-duotone fa-hotel',
  },
  {
    label: '808',
    link: '/avia/search/regular',
    ico: 'fa-duotone fa-plane',
  },
  {
    label: '809',
    link: '/tours',
    ico: 'fa-duotone fa-earth-asia',
  },
  {
    label: '367',
    link: '/charter',
    ico: '',
    charter: true,
  },
]
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
