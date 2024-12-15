<template>
  <div>
    <h2 class="content-title my-3 text-[20px] font-bolder">
      {{ $t('266') }}
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
      <template v-if="store">
        <TourDefaultCard
          v-for="(item, index) in store"
          :key="index + 'tour'"
          :data="item"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = ref('')

onMounted(async () => {
  try {
    store.value = await useApi().$get(
      'https://b2c.asialuxe.app/api/banner/content/?type=tours',
    )
  } catch (err) {
    console.log(err)
  }
})
</script>
