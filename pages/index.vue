<template>
  <div>
    <div class="bg-primary w-full z-0 pt-16 pb-4 rounded-b-[1rem]">
      <div class="container mb-3">
        <NuxtLinkLocale to="/notifications" class="float-right">
          <i class="fa-light fa-bell text-white text-[24px]"></i>
        </NuxtLinkLocale>
      </div>
      <div class="container">
        <div class="flex flex-col mb-4 items-center text-center gap-3">
          <img
            src="/images/logo_flag_white.svg"
            alt="logo"
            width="39px"
            class="mt-0.5"
          />
          <div>
            <div class="text-white mb-0 text-[24px] font-bold">
              {{ $t('807') }}, {{ user || $t('806') }}
            </div>
            <p class="text-xs text-[#ffffff90] text-[12px]">
              {{ $t('834') }}
            </p>
          </div>
        </div>
        <div class="flex justify-between gap-3 bg-white rounded-xl py-4 px-8">
          <div
            class="index-prod-grid transition-200"
            :class="{ 'active !shadow-none': activeSearch === 'hotel' }"
            @click="activeSearch = 'hotel'"
          >
            <div class="index-prod-img">
              <i
                class="fa-duotone fa-hotel text-[24px] mb-2 mt-1 text-[#0073ff]"
              ></i>
            </div>

            <span>{{ $t('224') }}</span>
          </div>

          <div
            class="index-prod-grid transition-200"
            :class="{ 'active !shadow-none': activeSearch === 'avia' }"
            @click="activeSearch = 'avia'"
          >
            <i
              class="fa-duotone fa-plane text-[24px] mb-2 mt-1 text-[#0073ff]"
            ></i>

            <span>{{ $t('23') }}</span>
          </div>

          <div
            class="index-prod-grid transition-200"
            :class="{ 'active !shadow-none': activeSearch === 'tour' }"
            @click="activeSearch = 'tour'"
          >
            <i
              class="fa-duotone fa-earth-asia text-[24px] mb-2 mt-1 text-[#0073ff]"
            ></i>
            <span>{{ $t('346') }}</span>
          </div>
          <NuxtLinkLocale to="/catalog" class="index-prod-grid transition-200">
            <img
              src="/images/icon_set/tab_icon_4.svg"
              class="w-[24px] h-[24px] mb-2 mt-1"
              alt="catalog"
            />
            <span>{{ $t('827') }}</span>
          </NuxtLinkLocale>
        </div>
        <div id="search" class="mt-4">
          <div class="transition-200 h-fit">
            <Transition name="opacity" mode="out-in">
              <AviaSearchMain v-if="activeSearch === 'avia'" />
              <HotelSearch v-else-if="activeSearch === 'hotel'" no-request />
              <TourSearch v-else no-request />
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <NuxtLinkLocale to="/profile/finance" class="container my-4 block">
      <img
        src="/images/banners/cashback.jpg"
        alt="cashback"
        class="rounded-xl shadow"
      />
    </NuxtLinkLocale>
    <div class="container">
      <!--      <LazySlidersCTimer />-->
      <UIStoryMain />
      <SlidersHotelHistory />
      <div class="col-span-12 md:col-span-4 mb-4">
        <NuxtLinkLocale
          v-if="singleImage?.[0]"
          :href="`/${locale}/${singleImage?.[0]?.link}`"
        >
          <NuxtImg
            v-lazy-load
            placeholder="/images/default.webp"
            fit="cover"
            format="webp"
            placeholder-class="aspect-auto object-cover"
            class="rounded-2xl w-full lg:h-[335px] xl:h-[420px] 2xl:h-[510px] md:overflow-hidden md:w-full aspect-auto"
            :src="singleImage?.[0]?.[`banner_${locale}`]"
            alt="img"
            loading="lazy"
          />
        </NuxtLinkLocale>
      </div>
      <div class="p-[10px] rounded-lg shadow-[0_0_9.1px_0_#0000001C] mb-3">
        <LazySlidersCTourTabs />
      </div>
      <!--      <div class="p-[10px] rounded-lg shadow-[0_0_9.1px_0_#0000001C] bg-white">
        <p class="text-[18px] font-bold !mb-3">{{ $t('856') }}</p>
        <LazySlidersCHotelDiscount />
      </div>-->
      <div class="mt-4">
        <LazySlidersBigSlider />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'

const { locale, t } = useI18n()

const store = useAuthStore()
const aviaStore = useAviaStore()
const hotelStore = useHotelStore()
const tourStore = useTourStore()
const dashboardStore = useDashboardStore()
const user = computed(
  () =>
    store.user?.name || store.user?.userDetail?.first_name || store.user?.email,
)
const singleImage = ref([])
const activeSearch: Ref<'avia' | 'hotel' | 'tour'> = ref('hotel')

onMounted(async () => {
  aviaStore.$reset()
  hotelStore.$reset()
  tourStore.$reset()
  try {
    singleImage.value = await useApi().$get(
      'https://b2c.asialuxe.app/api/banner/single/',
    )
  } catch (err) {
    console.log(err)
  }
})
watch(
  () => activeSearch.value,
  () => {
    dashboardStore.rules = null
  },
)
useSeoMeta({
  title: t('769'),
  ogTitle: t('769'),
  description: t('770'),
  ogDescription: t('770'),
})
</script>

<style>
.index-prod-grid.active {
  height: 100%;
}

.index-prod-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.index-prod-grid.active span {
  border-bottom: 3px solid #c0f202;
}

.index-prod-grid span {
  font-size: 0.7rem;
  display: block;
}
</style>
