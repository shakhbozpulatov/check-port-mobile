<template>
  <div class="pb-4 container">
    <div
      class="w-full rounded-2xl shadow p-4 mb-4 bg-gray-100 flex gap-3 justify-between items-center"
    >
      <div class="flex gap-2 items-center">
        <i class="fa-brands fa-telegram text-[#409EFF]" aria-hidden="true"></i
        ><span class="text-[14px]">{{ $t('680') }}</span>
      </div>
      <div>
        <a
          target="_blank"
          href="https://t.me/Asialuxe"
          class="border p-2 rounded"
          >{{ $t('681') }}
        </a>
      </div>
    </div>
    <div
      class="w-full rounded-2xl shadow p-4 mb-4 bg-gray-100 xl:flex hidden gap-3 justify-between items-center"
    >
      <div class="flex gap-2 items-center">
        <i
          class="fa-duotone fa-plane fa-rotate-by text-[#409EFF]"
          aria-hidden="true"
          style="--fa-rotate-angle: -30deg"
        ></i
        ><span class="text-[14px]">{{ $t('664') }}</span>
      </div>
      <div>
        <NuxtLinkLocale to="/download-app" class="border p-2 rounded">
          {{ $t('665') }}
        </NuxtLinkLocale>
      </div>
    </div>
    <LazySlidersBigSlider />
    <LazySlidersCSaleSlider />
    <LazySlidersCHotTourBanners class="mb-4" />
    <LazySlidersCExTourSlider class="mb-4" />
    <div class="bg-[#0073FF10] transition-200 p-4 rounded-2xl mb-4">
      <h2 class="content-title my-3 h5 w-[50%] md:w-full transition-200">
        {{ $t('370') }} <span class="text-[#3392ff]">Asialuxe</span>
      </h2>
      <div>
        <LazySlidersCHotelBlocks :hotel-routes-store="hotelRoutesData" />
      </div>
    </div>
    <div class="bg-[#0073FF10] transition-200 p-4 rounded-2xl mb-4">
      <h2 class="content-title my-3 h5 w-[50%] md:w-full transition-200">
        {{ $t('686') }} <span class="text-[#3392ff]">Asialuxe</span>
      </h2>
      <div>
        <LazySlidersCHalalHotel :halal-hotel-routes-store="halalHotelData" />
      </div>
    </div>
    <LazySlidersCVideoSlider />
    <LazySlidersCNewsSlider :count="'10'" />
    <div class="line-block relative my-4">
      <div class="right-0 top-0 w-full h-full"></div>
      <div class="line-block-text text-center mb-5">
        <p class="h4 transition-200">{{ $t('705') }}</p>
      </div>
      <div
        class="gap-[37px] grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 grid-cols-1"
      >
        <div
          class="rounded-2xl p-[35px] bg-[#92929215] grid grid-cols-12 shadow-sm"
        >
          <div class="flex flex-wrap items-center gap-3 col-span-12">
            <img
              src="/images/mini_logo_blue.svg"
              class="w-[50px] col-span-3"
              alt="icon"
            />
            <p
              class="text-[24px] md:w-[210px] fw-bold mb-[12px] transition-200"
            >
              {{ $t('706') }}
            </p>
          </div>

          <div class="col-span-12">
            <p class="fw-normal text-[14px] transition-200">
              {{ $t('707') }}
            </p>
          </div>
        </div>
        <div
          class="rounded-2xl p-[35px] bg-[#92929215] grid grid-cols-12 shadow-sm"
        >
          <div class="flex flex-wrap items-center gap-3 col-span-12">
            <img
              src="/images/mini_logo_blue.svg"
              class="w-[50px] col-span-3"
              alt="icon"
            />
            <img
              src="/images/mini_logo_white.svg"
              class="w-[50px] col-span-3 hidden"
              alt="icon"
            />
            <p
              class="text-[24px] md:w-[210px] fw-bold mb-[12px] transition-200"
            >
              {{ $t('708') }}
            </p>
          </div>
          <div class="col-span-12">
            <p class="fw-normal text-[14px] transition-200">
              {{ $t('709') }}
            </p>
          </div>
        </div>
        <div
          class="rounded-2xl p-[35px] bg-[#92929215] grid grid-cols-12 shadow-sm"
        >
          <div class="flex flex-wrap items-center gap-3 col-span-12">
            <img
              src="/images/mini_logo_blue.svg"
              class="w-[50px] col-span-3"
              alt="icon"
            />
            <p
              class="text-[24px] md:w-[210px] fw-bold mb-[12px] transition-200"
            >
              {{ $t('710') }}
            </p>
          </div>
          <div class="col-span-12">
            <p class="fw-normal text-[14px] transition-200">
              {{ $t('711') }}
            </p>
          </div>
        </div>
        <div
          class="rounded-2xl p-[35px] bg-[#92929215] grid grid-cols-12 shadow-sm"
        >
          <div class="flex flex-wrap items-center gap-3 col-span-12">
            <img
              src="/images/mini_logo_blue.svg"
              class="mt-[15px] w-[50px] col-span-3"
              alt="icon"
            />
            <p
              class="text-[24px] md:w-[210px] fw-bold mb-[12px] transition-200"
            >
              {{ $t('712') }}
            </p>
          </div>
          <div class="col-span-12">
            <p class="fw-normal text-[14px] transition-200">
              {{ $t('713') }}
            </p>
          </div>
        </div>
      </div>
      <TourDefaultMain class="mb-4" />
    </div>
  </div>
</template>
<script setup lang="ts">
const hotelRoutesData = ref(null)
const halalHotelData = ref(null)

const { data: hotelData } = await useAsyncData('hotel', () =>
  $fetch('https://b2c.asialuxe.app/api/banner/content/?type=hotels'),
)
hotelRoutesData.value = hotelData.value

const { data: halalData } = await useAsyncData('halal', () =>
  $fetch('https://b2c.asialuxe.app/api/banner/halal/'),
)
halalHotelData.value = halalData.value
</script>
