<template>
  <div>
    <UIHeader without-image>
      {{ $t('690') }}
    </UIHeader>
    <div class="container mt-32">
      <div class="gap-3 grid grid-cols-12">
        <aside class="aside-nav h-max col-span-12 rounded p-2 bg-white mb-3">
          <ul class="grid md:grid-cols-3 grid-cols-2 gap-2">
            <li
              v-for="(item, index) in menus"
              :key="index"
              class="border rounded border-gray-100 transition-300"
            >
              <!--          <a-->
              <!--            target="_blank"-->
              <!--            :href="item.link"-->
              <!--            v-if="item.label === '579'"-->
              <!--            class="py-1.5 px-2.5 block text-lg text-center transition-300"-->
              <!--          >-->
              <!--            <i :class="item.ico"></i>-->
              <!--            {{ $t(item.label) }}-->
              <!--          </a>-->
              <NuxtLink
                :to="item.link"
                exact-active-class="bg-blue-400 rounded text-white"
                class="py-1.5 px-2.5 block border rounded text-lg text-center transition-300"
              >
                <i :class="item.ico"></i>
                {{ $t(item.label) }}
              </NuxtLink>
            </li>
          </ul>
        </aside>
        <main class="col-span-12 md:col-span-12">
          <Transition mode="out-in">
            <NuxtPage />
          </Transition>
        </main>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
definePageMeta({
  middleware: 'auth-required',
})
const { t, locale } = useI18n()
const menus = ref([
  {
    label: '23',
    link: `/${locale.value}/profile/orders/avia-orders`,
    ico: 'fa-light fa-plane me-2',
  },
  {
    label: '226',
    link: `/${locale.value}/profile/orders/hotel-orders`,
    ico: 'fa-light fa-hotel me-2',
  },
  {
    label: '346',
    link: `/${locale.value}/profile/orders/tour-orders`,
    ico: 'fa-light fa-bags-shopping me-2',
  },
])

useSeoMeta({
  title: t('690'),
  ogTitle: t('690'),
  description: `${t('448')}, ${t('224')}, ${t('346')}`,
  ogDescription: `${t('448')}, ${t('224')}, ${t('346')}`,
})
</script>
<style scoped lang="scss"></style>
