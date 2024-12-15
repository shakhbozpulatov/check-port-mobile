<template>
  <div
    class="grid grid-cols-2 md:grid-cols-none md:flex gap-4 items-center w-full my-6"
  >
    <NuxtLinkLocale
      to="/"
      exact-active-class="tab-active"
      class="text-[14px] py-[11px] px-[10px] border-2 bg-white md:drop-shadow-sm min-w-[90px] rounded-2xl md:flex-grow-0"
    >
      <div class="flex gap-2 items-center justify-center">
        <i class="fa-duotone fa-plane text-[22px] text-[#0073FF]"></i>
        <p class="">{{ $t('23') }}</p>
      </div>
    </NuxtLinkLocale>
    <NuxtLinkLocale
      to="/hotels"
      exact-active-class="tab-active"
      class="text-[14px] py-[12px] px-[10px] bg-white border-2 md:drop-shadow-sm min-w-[90px] rounded-2xl md:flex-grow-0"
    >
      <div class="flex gap-2 items-center justify-center">
        <i class="fa-duotone fa-hotel text-[22px] text-[#0073FF]"></i>
        <p class="">{{ $t('224') }}</p>
      </div>
    </NuxtLinkLocale>
    <NuxtLinkLocale
      to="/tours"
      exact-active-class="tab-active"
      class="text-[14px] p-[10px] border-2 bg-white md:drop-shadow-sm min-w-[90px] rounded-2xl md:flex-grow-0"
    >
      <div class="flex gap-2 items-center justify-center">
        <i class="fa-duotone fa-earth-asia text-[25px] text-[#0073FF]"></i>
        <p class="">{{ $t('346') }}</p>
      </div>
    </NuxtLinkLocale>
    <NuxtLinkLocale
      to="/charter/AYT"
      exact-active-class="tab-active"
      class="text-[14px] py-[11px] px-[10px] bg-white border-2 md:drop-shadow-sm min-w-[90px] rounded-2xl md:flex-grow-0"
    >
      <div class="flex gap-2 items-center justify-center">
        <i
          class="fa-duotone text-[#0073FF] fa-plane-circle-check text-[22px]"
        ></i>
        <p class="">{{ $t('charters') }}</p>
      </div>
    </NuxtLinkLocale>
    <!--    <NuxtLinkLocale-->
    <!--      to="/services/greeting"-->
    <!--      exact-active-class="tab-active"-->
    <!--      class="text-[14px] py-[11px] px-[10px] dark:bg-dark-700 dark:border-gray-700 border-2 bg-white md:drop-shadow-sm min-w-[90px] rounded-2xl md:flex-grow-0"-->
    <!--    >-->
    <!--      <div class="flex gap-2 items-center justify-center">-->
    <!--        <i-->
    <!--          class="fa-duotone fa-layer-group text-[22px]"-->
    <!--          style="&#45;&#45;fa-primary-color: #0074ff; &#45;&#45;fa-secondary-color: #0074ff"-->
    <!--        ></i>-->
    <!--        <p>{{ $t('354') }}</p>-->
    <!--      </div>-->
    <!--    </NuxtLinkLocale>-->
  </div>
</template>

<style>
.tab-active {
  border: 2px solid #3f9eff !important;
}
</style>
