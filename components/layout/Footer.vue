<template>
  <div
    class="pb-5 pt-3 px-6 bg-white w-full fixed bottom-0 rounded-t-[1rem] shadow-lg z-10 menu-icons"
    style="box-shadow: 0 -8px 32px 0 rgba(107, 114, 128, 0.08)"
  >
    <div class="flex items-center justify-between relative">
      <NuxtLinkLocale
        to="/"
        exact-active-class="active !text-primary font-bold"
        class="flex items-center flex-col px-2 py-1"
      >
        <div>
          <img
            src="/images/icons/footer_home.svg"
            width="20px"
            class="mb-1 h-[20px]"
            alt="logo"
          />
          <img
            src="/images/icons/footer_home_act.svg"
            width="20px"
            class="mb-1 h-[20px] act hidden"
            alt="logo"
          />
        </div>
        <p class="text-[10px] font-medium">{{ $t('79') }}</p>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/catalog"
        exact-active-class="active !text-primary font-bold"
        class="flex items-center flex-col px-2 py-1"
      >
        <div>
          <i class="fa-light fa-grid-2"></i>
        </div>
        <p class="text-[10px] font-medium">{{ $t('827') }}</p>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/favorites"
        exact-active-class="active !text-primary font-bold"
        class="flex items-center flex-col px-2 py-1"
      >
        <div>
          <img
            src="/images/icons/footer_favorites.svg"
            width="20px"
            class="mb-1 h-[20px]"
            alt="logo"
          />
          <img
            src="/images/icons/footer_favorites_act.svg"
            width="20px"
            class="mb-1 h-[20px] act hidden"
            alt="logo"
          />
        </div>
        <p class="text-[10px] font-medium">{{ $t('819') }}</p>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/support"
        exact-active-class="active !text-primary font-bold"
        class="flex items-center flex-col px-2 py-1"
      >
        <div>
          <img
            src="/images/icons/footer_support.svg"
            width="20px"
            class="mb-1 h-[20px]"
            alt="logo"
          />
          <img
            src="/images/icons/footer_support_act.svg"
            width="20px"
            class="mb-1 h-[20px] act hidden"
            alt="logo"
          />
        </div>
        <p class="text-[10px] font-medium">{{ $t('249') }}</p>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/menu"
        exact-active-class="active !text-primary font-bold"
        class="flex items-center flex-col px-2 py-1"
      >
        <div>
          <img
            src="/images/icons/footer_profile.svg"
            width="20px"
            class="mb-1 h-[20px]"
            alt="logo"
          />
          <img
            src="/images/icons/footer_profile_act.svg"
            width="20px"
            class="mb-1 h-[20px] act hidden"
            alt="logo"
          />
        </div>
        <p class="text-[10px] font-medium">{{ $t('619') }}</p>
      </NuxtLinkLocale>

      <!--      <NuxtLinkLocale-->
      <!--        v-if="store.user"-->
      <!--        to="/profile"-->
      <!--        exact-active-class="active !text-primary font-bold"-->
      <!--        class="flex items-center flex-col px-2 py-1"-->
      <!--      >-->
      <!--        <div>-->
      <!--          <i class="fa-light fa-user"></i>-->
      <!--        </div>-->
      <!--        <p class="text-[10px] font-medium">{{ $t('479') }}</p>-->
      <!--      </NuxtLinkLocale>-->
      <!--      <div-->
      <!--        class="flex items-center flex-col px-2 py-1"-->
      <!--        @click="layoutStore.isSidebarOpen = true"-->
      <!--      >-->
      <!--        <div><i class="fa-light fa-user"></i></div>-->
      <!--        <p class="text-[10px] font-medium">{{ $t('619') }}</p>-->
      <!--      </div>-->
    </div>
  </div>
</template>
<script setup lang="ts">
const layoutStore = useLayoutStore()
const store = useAuthStore()
const route = useRoute()
</script>
<style scoped lang="scss">
.menu-icons {
  color: #9ca3af;
}
.menu-icons i {
  font-size: 20px;
}
.menu-icons p {
  font-size: 0.6rem;
  //line-height: 1rem;
}
.active {
  //outline: 1px solid #0073FF !important;
  //border-radius: 10px;
  color: #0073ff;
}

.not-active i {
  // color: #0073FF;
}

.active img.act {
  display: block;
}
.active img:not(.act) {
  display: none;
}
</style>

<!--
<div class="flex items-center justify-between relative">
      <NuxtLinkLocale
        to="/"
        exact-active-class="active"
        class="flex items-center flex-col px-2 py-1 "
      >
        <div>
          <i class="fa-regular fa-home"></i>
        </div>
        <p class=" text-xs">{{ $t('79') }}</p>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/hotels"
        exact-active-class="active"
        class="flex items-center flex-col gap-[2px] px-[16px] py-[8px]"
      >
        <div>
          <i class="fa-duotone fa-hotel dark:text-white-100 fa-lg text-lg"></i>
        </div>
        <p class="text-black text-xs dark:text-white-100">{{ $t('224') }}</p>
      </NuxtLinkLocale>
      <NuxtLinkLocale to="/tours" exact-active-class="active">
        <div
          :class="route.name === 'MainTour' ? 'active' : 'not-active'"
          class="flex items-center flex-col gap-[2px] px-[14px] py-[8px] "
        >
          <div>
            <i
              class="fa-duotone fa-earth-asia dark:!text-white-100 text-[25px] fa-lg"
            ></i>
          </div>
          <p class="">{{ $t('346') }}</p>
        </div>
      </NuxtLinkLocale>
      <NuxtLinkLocale
        to="/charter/AYT"
        exact-active-class="active"
        class="flex items-center flex-col gap-[2px] px-[8px] py-[8px] "
      >
        <div>
          <i
            class="fa-duotone fa-plane-circle-check dark:text-white-100 text-[22px] fa-lg"
          ></i>
        </div>
        <p class="">{{ $t('charters') }}</p>
      </NuxtLinkLocale>
      <div
        class="flex items-center flex-col gap-[2px] px-[8px] py-[8px]"
        @click="layoutStore.isSidebarOpen = true"
      >
        <div>
          <i
            class="fa-regular fa-user-gear "
          ></i>
        </div>
        <p class="">{{ $t('619') }}</p>
      </div>
    </div>-->
