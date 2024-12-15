<template>
  <NuxtLinkLocale
    :to="'/popular-tours/' + data?.id"
    class="route-banner cursor-pointer h-[250px]"
  >
    <div
      class="route-banner-item shadow-md drop-shadow-sm w-full h-full rounded-2xl before:rounded-2xl flex items-end bg-cover before:box-content before:z-10 relative before:absolute before:w-full before:h-full before:opacity-60 bg-no-repeat bg-center"
    >
      <div class="absolute top-0 left-0 w-full h-full rounded-2xl">
        <NuxtImg
          v-lazy-load
          placeholder="/images/default.webp"
          fit="cover"
          placeholder-class="aspect-square object-cover"
          loading="lazy"
          :data-url="data?.img"
          alt="default"
          class="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div class="flex justify-between w-full px-3 mb-3 z-[10]">
        <span class="w-full text-white flex p-2 z-20 text-[20px]">{{
          data?.name
        }}</span>
      </div>
    </div>
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
interface Props {
  data: object
}

defineProps<Props>()

const { locale } = useI18n()
</script>

<style scoped>
@media screen and (min-width: 768px) {
  .route-banner:first-child,
  .route-banner:nth-child(7) {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .route-banner:nth-child(3),
  .route-banner:nth-child(9) {
    grid-row-start: span 2;
    height: 100%;
  }

  .route-banner:nth-child(13) {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  .route-banner:nth-child(14) {
    grid-column-start: 3;
    grid-column-end: 5;
  }
}

.route-banner .route-banner-item:before {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    rgba(0, 0, 0, 0.54) 50%,
    #000000 100%
  );
}

@media screen and (max-width: 768px) {
  .route-banner:nth-child(3n + 0) {
    grid-column-start: span 1;
  }
}

.route-banner {
  transition: 0.3s all;
}

.route-banner:hover {
  box-shadow:
    0 16px 12px -4px rgb(0 0 0 / 0.1),
    0 8px 8px -8px rgb(0 0 0 / 0.1);
  transition: 0.3s all;
}

.more-btn {
  transition: 0.3s all;
}

.more-btn:hover {
  transition: 0.3s all;
  background: #0073ff;
  border-color: #0073ff;
}

.route-banner:last-child {
  max-height: 250px;
}
</style>
