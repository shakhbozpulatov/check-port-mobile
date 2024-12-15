<template>
  <div class="px-3">
    <FormCInput
      id="promo"
      v-model="promo_code"
      text=""
      class="w-full"
      input-class="text-sm"
      :placeholder="$t('744')"
    >
      <template #suffix>
        <button
          :disabled="!promo_code"
          :class="promo_success ? 'bg-green-500' : 'bg-blue'"
          class="h-9 rounded-r-sm flex items-center justify-center disabled:bg-gray-400 px-2 text-xs text-white !cursor-pointer !w-[100px] shrink-0"
          @click.prevent="confirmPromoCode"
        >
          <UISpinner v-if="loading" />
          <span v-else>{{ promo_success ? $t('745') : $t('277') }}</span>
        </button>
      </template>
    </FormCInput>
    <Transition name="fade" mode="out-in">
      <p v-if="promoCodeError" class="mt-1 text-red-500 text-sm">
        {{ promoCodeError }}
      </p>
    </Transition>
  </div>
</template>
<script setup lang="ts">
interface Props {
  price: number
  product: number
}
const emits = defineEmits<{
  (
    e: 'on-success',
    val: {
      new_price: number
      type: string
      value: string | number
      promo_code: string
    },
  ): void
}>()
const props = defineProps<Props>()
const loading = ref(false)
const promo_code = ref('')
const promoCodeError = ref('')
const promo_success = ref(false)

const confirmPromoCode = async () => {
  try {
    loading.value = true
    const res = await useApi().$get<{
      new_price: number
      type: string
      value: string | number
    }>('/v1/user/promo', {
      params: {
        currency: localStorage.getItem('currency'),
        amount: props.price,
        code: promo_code.value,
        product_id: props.product,
      },
    })

    emits('on-success', {
      ...res,
      promo_code: promo_code.value,
    })
    promo_success.value = true
  } catch (err) {
    promoCodeError.value = err?.response?.data?.message
    promo_success.value = false
    console.log(err)
  } finally {
    loading.value = false
  }
}

watch(
  () => promo_code.value,
  () => {
    if (promo_success.value || promoCodeError.value) {
      promoCodeError.value = ''
      promo_success.value = false
      emits('on-success', null)
    }
  },
)
</script>
