<template>
  <div>
    <UIHeader>
      {{ $t('691') }}
    </UIHeader>
    <div class="mb-10 mt-20 container">
      <div class="bg-white shadow-md rounded p-3">
        <div>
          <h5 class="h5">{{ $t('692') }}</h5>
          <a href="tel:+998712017777" class="flex items-center mb-3">
            <i class="fa-regular fa-phone me-1"></i>
            <span>+998</span> 71 201 77 77</a
          >
          <h5 class="h5">{{ $t('714') }}</h5>
          <el-popover
            placement="top-start"
            :width="200"
            trigger="hover"
            :content="$t('717')"
          >
            <template #reference>
              <a href="tel:1111" class="flex items-center">
                <i class="fa-regular fa-phone me-1"></i>
                <span>1111</span></a
              >
            </template>
          </el-popover>
        </div>
        <div>
          <h5 class="h5">{{ $t('372') }}</h5>
          <a href="mailto:support@asialuxe.uz" class="flex items-center">
            <i class="fa-regular fa-envelope me-1"></i> support@asialuxe.uz</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  middleware: 'auth-required',
})
useSeoMeta({
  title: t('692'),
  ogTitle: t('692'),
  description: t('692'),
  ogDescription: t('692'),
})
</script>

<style scoped lang="scss"></style>
