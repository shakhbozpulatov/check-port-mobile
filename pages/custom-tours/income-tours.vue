<template>
  <div>
    <UIHeader without-image>{{ $t('507') }} {{ $t('525') }}</UIHeader>
    <div class="container mt-[120px]">
      <h1 class="h4">{{ $t('507') }} {{ $t('525') }}</h1>
      <div class="grid grid-cols-12 gap-3">
        <template v-for="(item, index) in list" :key="index">
          <div
            v-if="item?.umra_status === true"
            class="col-span-12 md:col-span-4"
          >
            <router-link :to="`/${locale}/custom-tours/${item?.id}`">
              <NuxtImg
                v-lazy-load
                placeholder="/images/default.webp"
                loading="lazy"
                :data-url="item?.img"
                :alt="item?.img"
                class="rounded-2xl shadow"
              />
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { locale } = useI18n()
const getUmraList = async function () {
  return new Promise((resolve, reject) => {
    useApi()
      .$get('https://b2c.asialuxe.app/api/tours_ex/list.php')
      .then((res) => {
        resolve(res)
        list.value = res
      })
      .catch((err) => {
        reject(err)
      })
  })
}
const list = ref()

onMounted(async () => {
  await getUmraList()
})
</script>
