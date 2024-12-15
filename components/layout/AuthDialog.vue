<template>
  <UModal v-model="store.authDialog" width="350px">
    <div class="flex flex-col items-center gap-3">
      <div class="w-[200px]">
        <img src="/images/auth-required.png" alt="" />
      </div>
      <p class="text-[14px] text-center">{{ $t('678') }}</p>
      <NuxtLink class="w-full" to="/avia">
        <UButton
          type="primary"
          class="rounded-[1rem] w-full justify-center"
          @click="returnMain"
          >{{ $t('172') }}</UButton
        >
      </NuxtLink>
    </div>
  </UModal>
</template>
<script setup lang="ts">
const store = useLayoutStore()

const returnMain = () => {
  store.authDialog = false
  store.isSidebarOpen = false
  store.activeSidebar = 'main'
}
</script>
