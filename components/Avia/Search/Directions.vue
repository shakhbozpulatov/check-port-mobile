<template>
  <div class="!w-full">
    <UTabs :items="options" :default-index="0" @change="onDirectionChange" />
  </div>
</template>
<script setup lang="ts">
const router = useRouter()
const { locale, t } = useI18n()

const options = [
  {
    label: t('46'),
    value: 'one-way',
  },
  {
    label: t('341'),
    value: 'round-trip',
  },
  {
    label: t('299'),
    value: 'multi-city',
  },
]
const onDirectionChange = (e: number) => {
  router.replace(`/${locale.value}/?route=${options[e].value}`)
}
</script>
<style lang="scss">
.direction {
  fieldset {
    display: flex;
    gap: 18px;
  }
}
</style>
