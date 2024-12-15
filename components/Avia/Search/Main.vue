<template>
  <div class="">
    <!--    <AviaSearchDirections />-->
    <Transition mode="out-in" name="fade">
      <LazyAviaSearchMultiCity v-if="multiCity" />
      <LazyAviaSearchOneWay v-else :form="searchData" :loading="false" />
    </Transition>
  </div>
</template>
<script setup lang="ts">
const multiCity = ref(false)
const searchData = reactive({
  onlyCharter: 0,
  product_id: 1,
  adult_qnt: 1,
  child_qnt: 0,
  infant_qnt: 0,
  class: 'E',
  currency: useCookie('currency').value || 'USD',
  in_one_days: 0,
  charter_three_days: 0,
  only_baggage: 0,
  sorting_price: 1,
  directions: [
    {
      dep_type: '',
      arr_type: '',
      departure_code: '',
      arrival_code: '',
      date: '',
    },
  ],
})
</script>
