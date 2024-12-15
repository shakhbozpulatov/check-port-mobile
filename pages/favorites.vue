<template>
  <div>
    <UIHeader without-image> {{ $t('819') }} </UIHeader>
    <div
      class="container w-full flex flex-col gap-3 mb-10"
      :class="
        !store.favouritesData?.length
          ? 'items-center justify-center pt-48'
          : 'pt-36'
      "
    >
      <template v-if="!store.favouritesData?.length">
        <img src="/images/icons/favorites.png" alt="img" />
        <p class="text-2xl font-bold text-center">{{ $t('817') }}</p>
        <p class="text-lg text-gray-500 text-center">
          {{ $t('818') }}
        </p>
      </template>
      <div v-else class="grid grid-cols-2 gap-3">
        <NuxtLinkLocale
          v-for="(item, index) in store.favouritesData"
          :key="index"
          :to="`/hotels/${item?.code}?type=hotel`"
          class="flex flex-col gap-3 bg-white border rounded-2xl"
        >
          <div class="relative">
            <img
              :src="item?.image"
              alt="img"
              class="rounded-t-2xl aspect-video object-cover h-[200px] w-full"
            />
            <div
              class="rounded-full bg-[#ffffff] w-[30px] h-[30px] flex items-center justify-center absolute right-2 top-[10px] z-10"
              @click.prevent="store.saveFavouritesData(item)"
            >
              <i class="fa-solid fa-bookmark text-[#0073ff]"></i>
            </div>
          </div>
          <div class="p-3 pt-0">
            <div class="flex gap-3 items-center mb-2">
              <UBadge
                size="sm"
                color="amber"
                variant="soft"
                class="!rounded-[1rem] !text-[10px]"
              >
                {{ item?.stars }}
                <i class="!text-[10px] ml-1 fa fa-star !text-yellow-500"></i>
              </UBadge>
              <span class="text-left line-clamp-1 text-[12px]">{{
                item?.address
              }}</span>
            </div>
            <p class="text-sm font-bold text-left line-clamp-2">
              {{ item?.name }}
            </p>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useCookieStore()
store.getFavourites()
</script>

<style></style>
