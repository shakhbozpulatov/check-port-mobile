<template>
  <div class="filter">
    <h5 class="filter-title">{{ $t('312') }}</h5>
    <div>
      <div class="mt-1">
        <!--        <el-slider-->
        <!--          v-model="filter.price"-->
        <!--          class="px-[10px]"-->
        <!--          range-->
        <!--          size="small"-->
        <!--          :min="prices.min"-->
        <!--          :max="prices.max"-->
        <!--          @change="onFilterChange"-->
        <!--        />-->
        <!--        <div class="flex items-center justify-between">-->
        <!--          <p class="text">{{ prices.min }} $</p>-->
        <!--          <p class="text">{{ prices.max }} $</p>-->
        <!--        </div>-->
      </div>
      <hr class="mt-4" />
    </div>
    <!--    {{ store.tourAviaTickets }}-->
    <UICustomCollapse selected :title="$t('243')">
      <div class="moreinfo flex flex-col">
        <FormCheckboxGroup
          v-model="filter.stops"
          class="flex flex-col"
          :options="stops"
          label-key="label"
          value-key="value"
          @update:model-value="onFilterChange"
        />
      </div>
    </UICustomCollapse>

    <UICustomCollapse selected :title="$t('24')">
      <div
        class="moreinfo flex flex-col max-h-[200px] d-scroll overflow-y-auto"
      >
        <FormCheckboxGroup
          v-model="filter.airlines"
          class="flex flex-col"
          :options="tickets?.airlines"
          label-key="name"
          value-key="code"
          @update:model-value="onFilterChange"
        />
      </div>
    </UICustomCollapse>

    <UICustomCollapse selected :title="$t('218')">
      <div
        class="moreinfo flex flex-col max-h-[200px] d-scroll overflow-y-auto"
      >
        <FormCheckbox
          v-model="filter.isBaggage"
          :text="$t('5')"
          class="checkbox"
          @update:model-value="onFilterChange"
        />
      </div>
    </UICustomCollapse>

    <UICustomCollapse
      v-if="tickets?.departureTimes?.length"
      selected
      :title="$t('62')"
    >
      <div
        class="moreinfo flex flex-col max-h-[200px] d-scroll overflow-y-auto"
      >
        <FormCheckboxGroup
          v-model="filter.depTimes"
          class="flex flex-col"
          :options="tickets?.departureTimes"
          label-key="time"
          value-key="time"
          @update:model-value="onFilterChange"
        />
      </div>
    </UICustomCollapse>

    <UICustomCollapse
      v-if="tickets?.arrivalTimes?.length"
      selected
      :title="$t('62')"
    >
      <div
        class="moreinfo flex flex-col max-h-[200px] d-scroll overflow-y-auto"
      >
        <FormCheckboxGroup
          v-model="filter.arrTimes"
          class="flex flex-col"
          :options="tickets?.arrivalTimes"
          label-key="time"
          value-key="time"
          @update:model-value="onFilterChange"
        />
      </div>
    </UICustomCollapse>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const store = useTourStore()
const { t } = useI18n()

const filter = reactive({
  price: [] as number[],
  stops: [],
  airlines: [],
  isBaggage: false,
  depTimes: [],
  arrTimes: [],
})
const prices = reactive({
  min: 0,
  max: 0,
})

const tickets = computed(() => store.tourAviaTickets)
const stops = computed(() => {
  const stops = tickets.value?.stops
  return stops?.sort().map((el) => {
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

const onFilterChange = async () => {
  try {
    store.ticketsFilterLoader = true
    await store.getTourAllTickets({
      ...filter,
      min_price: filter.price?.[0],
      max_price: filter.price?.[1],
    })
  } catch (err) {
    console.log(err)
  } finally {
    store.ticketsFilterLoader = false
  }
}
onMounted(() => {
  if (tickets.value) {
    prices.min = Math.floor(tickets.value?.min_price)
    prices.max = Math.ceil(tickets.value?.max_price + 1)
    filter.price = [prices.min, prices.max]
  }
})
</script>

<style lang="scss" scoped>
.filter-card {
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  .collapse-h {
    max-height: 140px;
    height: auto;
    overflow-y: auto;
  }
  .filter-title {
    font-size: 15px;
    font-weight: 700;
  }
  .price {
    border-radius: 4px;
    background: #fff;
    border: 1px solid #0073ff;
    padding: 10px;
  }
  //.filterTime {
  //  height: 200px;
  //
  //}

  .checkbox {
    font-size: 12px;
    font-weight: 600;
  }
  //.el-collapse {
  //  border: 0;
  //}
  .text {
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
