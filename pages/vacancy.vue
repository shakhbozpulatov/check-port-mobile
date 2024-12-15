<template>
  <div class="container mt-4">
    <UBreadcrumb :links="links" class="mb-4" />
    <!--    <NuxtLink-->
    <!--      to="/"-->
    <!--      class="dark:text-white-100 dark:bg-dark-700 mb-3 block w-max bg-white rounded drop-shadow-md p-3"-->
    <!--    >-->
    <!--      <i-->
    <!--        class="fa-regular fa-arrow-left me-2 dark:text-white-100 text-[#0073FF]"-->
    <!--      ></i>-->
    <!--      {{ $t('172') }}-->
    <!--    </NuxtLink>-->
    <div class="bg-white drop-shadow-md rounded p-3">
      <h2 class="h2">{{ $t('617') }}</h2>
      <div class="grid md:grid-cols-2 grid-cols-1 gap-3">
        <div class="bg-white border rounded p-3">
          <div class="h3 mb-0">{{ $t('623') }}</div>
          <div>
            <p>{{ $t('624') }}</p>
            <b>{{ $t('625') }}:</b>
            <ul>
              <li>{{ $t('626') }}</li>
              <li>{{ $t('627') }}</li>
              <li>{{ $t('628') }}</li>
              <li>{{ $t('629') }}</li>
              <li>{{ $t('630') }}</li>
              <li>{{ $t('631') }}</li>
              <li>{{ $t('632') }}</li>
            </ul>
            <b>{{ $t('633') }}:</b>
            <ul>
              <li>{{ $t('634') }}</li>
              <li>{{ $t('635') }}</li>
            </ul>
            <b>{{ $t('636') }}:</b>
            <ul>
              <li>{{ $t('637') }}</li>
              <li>{{ $t('638') }}</li>
              <li>{{ $t('639') }}</li>
              <li>{{ $t('640') }}</li>
            </ul>
            <b> {{ $t('641') }}: </b>
            <div>
              <a href="mailto:alena.v@asialuxe.uz">alena.v@asialuxe.uz</a>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded p-3">
          <div class="h3 mb-0">{{ $t('642') }}</div>
          <div>
            <p>
              {{ $t('643') }}
            </p>

            <b>{{ $t('644') }}:</b>
            <ul>
              <li>{{ $t('645') }}</li>
              <li>{{ $t('646') }}</li>
              <li>{{ $t('647') }}</li>
              <li>{{ $t('648') }}</li>
              <li>{{ $t('649') }}</li>
              <li>{{ $t('650') }}</li>
            </ul>

            <b>{{ $t('651') }}:</b>
            <ul>
              <li>{{ $t('652') }}</li>
              <li>{{ $t('653') }}</li>
              <li>{{ $t('654') }}</li>
              <li>{{ $t('655') }}</li>
              <li>{{ $t('656') }}</li>
            </ul>
            <b> {{ $t('657') }}: </b>
            <br />
            <div>
              <a href="mailto:alena.v@asialuxe.uz">alena.v@asialuxe.uz</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const links = [
  {
    label: t('79'),
    icon: 'i-heroicons-home',
    to: `/${locale.value}`,
  },
  {
    label: t('617'),
    icon: '',
  },
]
useSeoMeta({
  title: t('617'),
  ogTitle: t('617'),
  description: t('624'),
  ogDescription: t('624'),
})
</script>
