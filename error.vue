<script setup lang="ts">
import type { NuxtError } from '#app'

interface Props {
  error: NuxtError
}
defineProps<Props>()
</script>

<template>
  <div class="w-full px-3 h-screen flex items-center flex-col justify-center">
    <pre class="whitespace-pre-line container py-6"> {{ error }} </pre>
    <NuxtLinkLocale to="/" class="mb-[44px]">
      <img src="/images/ny_logo.svg" alt="logo" class="w-[93px]" />
    </NuxtLinkLocale>
    <div class="text-center mb-[44px]">
      <img src="/images/404.svg" alt="404" />
    </div>
    <p class="text-center text-[28px] font-bold">
      {{ $t('764') }}
    </p>
    <p class="text-center text-[14px] font-light mb-[44px]">
      {{ $t('765') }}
    </p>
    <div class="flex items-center gap-[30px] sm:gap-[59px]">
      <NuxtLinkLocale to="/">
        <span class="text-[16px] text-[#0073FF] font-bold">
          {{ $t('23') }}
        </span>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/hotels">
        <span class="text-[16px] text-[#0073FF] font-bold">
          {{ $t('224') }}
        </span>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/tours">
        <span class="text-[16px] text-[#0073FF] font-bold">
          {{ $t('346') }}
        </span>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/charter">
        <span class="text-[16px] text-[#0073FF] font-bold">
          {{ $t('367') }}
        </span>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
