export const useMounted = () => {
  const mounted = ref(false)
  onMounted(async () => {
    await nextTick(() => {
      mounted.value = true
    })
  })

  return { mounted }
}
