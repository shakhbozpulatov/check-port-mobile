<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <!--      <transition name="bounceIn" mode="out-in">-->
      <NuxtPage />
      <!--      </transition>-->
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
import { calendarLocales } from 'assets/data'

const { locale, setLocale } = useI18n()
import { setOptions } from '@mobiscroll/datepicker-vue'

import { useDayjsLocale } from '~/composables/useDayjsLocale'

// Specify options globally for all components
const loc = useCookie('i18n_redirect')
useDayjsLocale()
setLocale(loc.value)

setOptions({
  locale: calendarLocales[locale],
  theme: 'ios',
  themeVariant: useColorMode().value,
})
onMounted(() => {
  document.documentElement.classList.remove('dark')
  const scriptSrc =
    'https://cdn-ru.bitrix24.com/b23640706/crm/site_button/loader_6_riwobt.js?' +
    ((Date.now() / 60000) | 0)

  // Check if the script is already in the document's head
  const existingScript = document.querySelector(
    `script[src^="${scriptSrc.split('?')[0]}"]`,
  )

  if (!existingScript) {
    // Script doesn't exist, so add it
    const scriptKey = `bitrix-script-${Date.now()}`
    useHead({
      script: [
        {
          key: scriptKey,
          src: scriptSrc,
          async: true,
        },
      ],
    })
  }
})
</script>
