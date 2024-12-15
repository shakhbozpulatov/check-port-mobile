<template>
  <header class="sticky top-0 z-[199] bg-white transition-200 py-4">
    <div class="container flex items-center justify-between">
      <div class="cursor-pointer">
        <NuxtLinkLocale to="/">
          <NuxtImg
            class="logo transition-200"
            src="/images/ny_logo.svg"
            height="40"
            width="99"
            alt="site_logo"
          />
          <NuxtImg
            class="logo hidden transition-200"
            src="/images/logo_white.svg"
            alt="site_logo"
            height="40"
            width="99"
          />
        </NuxtLinkLocale>
      </div>
      <div class="flex items-center gap-1 gap-md-2">
        <a class="mr-2" href="https://b2b.asialuxe.uz" target="_blank">
          <UButton
            id="lang_switcher"
            color="primary"
            variant="outline"
            class="!hidden md:!flex items-center"
          >
            <i class="icon fa fa-user"></i>
            <span class="font-normal">
              {{ $t('591') }}
            </span>
          </UButton>
        </a>
        <UButton
          id="lang_switcher"
          color="primary"
          variant="outline"
          class="!hidden md:!flex items-center"
          @click="layoutStore.langDialog = true"
        >
          <i class="fa-regular fa-globe"></i>
          <p class="uppercase font-normal">
            {{ locale }} / {{ layoutStore.currency }}
          </p></UButton
        >
        <div class="md:block hidden ms-2">
          <div v-if="auth.user && auth.user?.id !== 5951">
            <NuxtLinkLocale to="/profile">
              <UButton variant="outline" color="primary">
                {{ $t('479') }}
              </UButton>
            </NuxtLinkLocale>
          </div>
          <div v-else class="flex">
            <UButton
              id="sidebar"
              variant="outline"
              color="primary"
              @click="
                (layoutStore.activeSidebar = 'login'),
                  (layoutStore.isSidebarOpen = true)
              "
            >
              <i class="icon fa fa-user me-1"></i>
              <span>
                {{ t('425') }}
              </span>
            </UButton>
          </div>
        </div>
        22
        <UButton
          id="toggle_theme"
          variant="outline"
          color="primary"
          class="p-[9px_10px] ms-2"
          @click="toggleTheme"
        >
          <i
            v-if="useColorMode().value !== 'dark'"
            class="fa-light fa-sun-bright"
          ></i>
          <i v-else class="fa-thin fa-moon"></i>
        </UButton>
        <div
          class="burger cursor-pointer mx-[10px]"
          @click="layoutStore.isSidebarOpen = true"
        >
          <i class="fa-regular fa-bars fa-xl transition-200"></i>
        </div>
      </div>
    </div>
  </header>
</template>
<!--https://t.me/Asialuxe-->
<script setup lang="ts">
const { t, locale } = useI18n()
const layoutStore = useLayoutStore()
const auth = useAuthStore()
const { toggleTheme } = useTheme()
</script>
