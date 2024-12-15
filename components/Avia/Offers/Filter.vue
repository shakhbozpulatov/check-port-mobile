<template>
  <div
    v-if="
      store.allTicketsResponse?.min_price || store.allTicketsResponse?.max_price
    "
    class="filter-card flex flex-col gap-3"
  >
    <h5 class="filter-title">{{ $t('312') }}</h5>
    <div class="mt-1">
      <div class="flex items-center justify-between mb-4">
        <UButton class="rounded-[1rem] text" color="white">
          {{ formatNumber(Math.round(store.filterParams.min_price)) }}
          {{ layoutStore.currency }}
        </UButton>
        <UButton class="rounded-[1rem] text" color="white">
          {{ formatNumber(Math.round(store.filterParams?.max_price)) }}
          {{ layoutStore.currency }}
        </UButton>
      </div>
      <FormRangeSlider
        v-model:min-value="store.filterParams.min_price"
        v-model:max-value="store.filterParams.max_price"
        :min="store.allTicketsResponse?.min_price - 1"
        :max="store.allTicketsResponse?.max_price + 1"
        @change="onPriceChange"
      />
      <div class="flex items-center justify-between">
        <p class="text">
          {{
            formatNumber(Math.round(store.allTicketsResponse?.min_price - 1))
          }}
          {{ layoutStore.currency }}
        </p>
        <p class="text">
          {{
            formatNumber(Math.round(store.allTicketsResponse?.max_price + 1))
          }}
          {{ layoutStore.currency }}
        </p>
      </div>
    </div>
    <hr class="mt-4" />
    <UICustomCollapse selected :title="$t('243')">
      <div
        class="moreinfo flex flex-col overflow-y-auto max-h-[200px] d-scroll"
      >
        <FormCheckboxGroup
          v-model="store.filterParams.stops"
          class="flex flex-col"
          :options="stops"
          :disabled="stops.length === 1"
          label-key="label"
          value-key="value"
          @update:model-value="onFilter"
        />
      </div>
    </UICustomCollapse>
    <UICustomCollapse
      v-if="store.allTicketsResponse?.airlines?.length"
      selected
      :title="
        store.allTicketsResponse?.airlines.length !== 1 ? $t('24') : $t('762')
      "
    >
      <div
        class="moreinfo flex flex-col overflow-y-auto max-h-[200px] d-scroll"
      >
        <FormCheckboxGroup
          v-model="store.filterParams.airlines"
          class="flex flex-col"
          :options="store.allTicketsResponse?.airlines"
          label-key="name"
          :disabled="store.allTicketsResponse?.airlines.length === 1"
          value-key="code"
          @update:model-value="onFilter"
        />
      </div>
    </UICustomCollapse>
    <UICustomCollapse
      v-if="store.allTicketsResponse?.airlines?.length"
      selected
      :title="$t('218')"
    >
      <div
        class="moreinfo flex flex-col overflow-y-auto max-h-[200px] d-scroll"
      >
        <FormCheckbox
          v-model="only_baggage"
          :text="$t('5')"
          class="checkbox"
          @update:model-value="onFilter"
        />
      </div>
    </UICustomCollapse>
    <UICustomCollapse
      v-if="store.allTicketsResponse?.departureTimes?.length"
      selected
      :title="$t('62')"
    >
      <div
        class="moreinfo flex flex-col overflow-y-auto max-h-[200px] d-scroll"
      >
        <FormCheckboxGroup
          v-model="store.filterParams.depTimes"
          class="flex flex-col"
          :options="store.allTicketsResponse?.departureTimes"
          label-key="time"
          :disabled="store.allTicketsResponse?.departureTimes.length === 1"
          value-key="time"
          @update:model-value="onFilter"
        />
      </div>
    </UICustomCollapse>
    <UICustomCollapse
      v-if="store.allTicketsResponse?.arrivalTimes?.length"
      selected
      :title="$t('64')"
    >
      <div
        class="moreinfo flex flex-col overflow-y-auto max-h-[200px] d-scroll"
      >
        <FormCheckboxGroup
          v-model="store.filterParams.arrTimes"
          class="flex flex-col"
          :options="store.allTicketsResponse?.arrivalTimes"
          label-key="time"
          value-key="time"
          :disabled="store.allTicketsResponse?.arrivalTimes.length === 1"
          @update:model-value="onFilter"
        />
      </div>
    </UICustomCollapse>
  </div>
</template>

<script setup lang="ts">
const $emit = defineEmits(['on-filter'])
const { t } = useI18n()
const store = useAviaStore()
const layoutStore = useLayoutStore()

const route = useRoute()
const router = useRouter()

const stops = computed(() => {
  const stops = store.allTicketsResponse?.stops
  return stops.sort().map((el) => {
    return {
      label: stopsLabels[el],
      value: String(el),
    }
  })
})
const stopsLabels = {
  0: t('687'),
  1: t('431'),
  2: t('432'),
  3: t('433'),
}
const only_baggage = ref(false)

const onFilter = async () => {
  const data = {}
  store.filterParams.only_baggage = only_baggage.value ? 1 : 0
  for (const key in store.filterParams) {
    if (Array.isArray(store.filterParams[key])) {
      data[key] = store.filterParams[key]?.join(',') || undefined
    } else {
      data[key] = store.filterParams[key]
    }
  }
  await router.replace({ query: { ...route.query, ...data } })
  $emit('on-filter')
}
const onPriceChange = () => {
  $emit('on-filter')
}
store.filterParams.sort = route.query.sort ?? 'price'
store.filterParams.stops = route.query?.stops
  ? route.query?.stops?.split(',')
  : []
store.filterParams.airlines = route.query?.airlines
  ? route.query?.airlines?.split(',')
  : []
store.filterParams.depTimes = route.query?.depTimes
  ? route.query?.depTimes?.split(',')
  : []
store.filterParams.arrTimes = route.query?.arrTimes
  ? route.query?.arrTimes?.split(',')
  : []

route.query?.only_baggage === '1'
  ? (only_baggage.value = true)
  : (only_baggage.value = false)

store.filterParams.only_baggage = only_baggage.value ? 1 : 0
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/style.scss';

.filter-card {
  .collapse-h {
    max-height: 140px;
    overflow-y: auto;
    height: auto;
  }
  .filter-title {
    @include common-text-style(15px, 700, normal);
  }
  .price {
    border-radius: 4px;
    background: #fff;
    border: 1px solid #0073ff;
    padding: 10px;
  }

  .checkbox {
    @include common-text-style(12px, 600, normal);
  }
  .el-collapse {
    border: 0;
  }
  .text {
    @include common-text-style(12px, 500, normal);
  }
}
</style>
