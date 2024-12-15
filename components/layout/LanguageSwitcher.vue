<template>
  <MbscPopup
    :is-open="store.langDialog"
    display="bottom"
    close-on-overlay-click
    theme-variant="light"
    theme="material"
    css-class="small-popup"
    :scroll-lock="false"
    @close="store.langDialog = false"
  >
    <div class="p-4">
      <div class="w-full">
        <div>
          <label for="lang" class="label"> {{ $t('15') }}</label>
          <USelectMenu
            id="lang"
            v-model="region"
            class="w-full mb-3 alt_select"
            :options="regions($t)"
            option-attribute="label"
            value-attribute="value"
          >
          </USelectMenu>
        </div>
        <div>
          <label for="lang" class="label">{{ $t('377') }}</label>
          <USelectMenu
            id="lang"
            v-model="currentLanguage"
            class="w-full mb-3 alt_select"
            :options="languages($t)"
            option-attribute="label"
            value-attribute="value"
          >
          </USelectMenu>
        </div>
        <div>
          <label for="cur" class="label">{{ $t('50') }}</label>
          <USelectMenu
            id="cur"
            v-model="currency"
            class="w-full mb-3 alt_select"
            :options="currencies"
            option-attribute="label"
            value-attribute="value"
          >
          </USelectMenu>
        </div>
      </div>
      <UButton
        color="primary"
        class="w-full h-[48px] justify-center rounded-[1rem] !mt-[1rem]"
        @click="closeDialog"
      >
        {{ $t('7') }}
      </UButton>
    </div>
  </MbscPopup>
</template>
<script setup lang="ts">
import { MbscPopup } from '@mobiscroll/datepicker-vue'

import { currencies, languages, regions } from '@/assets/data'

const store = useLayoutStore()
const { locale, setLocale } = useI18n()

const region = ref(useCookie('region').value || 'UZB')
const loc = useCookie('i18n_redirect')
const currentLanguage = ref(locale.value)
const currency = ref(store.currency)
const { changeDayjsLocale } = useDayjsLocale()

const closeDialog = () => {
  store.setCurrency(currency.value)
  locale.value = currentLanguage.value
  loc.value = locale.value
  setLocale(currentLanguage.value)
  store.setRegion(region.value)
  store.langDialog = false
  changeDayjsLocale()
}
</script>
