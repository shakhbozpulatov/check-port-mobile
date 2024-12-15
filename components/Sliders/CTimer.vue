<template>
  <div
    class="mb-4 border rounded-2xl shadow p-4"
    style="
      background-image: url(/images/banners/black_friday_bg.png);
      background-size: cover;
    "
  >
    <h3 class="content-title my-3 h5 transition-200 text-center text-white">
      {{ $t('865') }}
    </h3>
    <div
      v-if="timer"
      class="flex md:flex-nowrap flex-wrap space-x-4 text-white justify-center items-center mt-4"
    >
      <div class="flex flex-col items-center mb-3 md:mb-0 text-center">
        <div class="flex space-x-1">
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.days[0] }}
          </div>
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.days[1] }}
          </div>
        </div>
        <p class="mt-2 text-sm">{{ $t('860') }}</p>
      </div>

      <div class="flex flex-col items-center mb-3 md:mb-0 text-center">
        <div class="flex space-x-1">
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.hours[0] }}
          </div>
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.hours[1] }}
          </div>
        </div>
        <p class="mt-2 text-sm">{{ $t('861') }}</p>
      </div>

      <div class="flex flex-col items-center mb-3 md:mb-0 text-center">
        <div class="flex space-x-1">
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.minutes[0] }}
          </div>
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.minutes[1] }}
          </div>
        </div>
        <p class="mt-2 text-sm">{{ $t('862') }}</p>
      </div>

      <div class="flex flex-col items-center mb-3 md:mb-0 text-center">
        <div class="flex space-x-1">
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.seconds[0] }}
          </div>
          <div
            class="bg-gray-800 w-10 h-14 flex items-center justify-center rounded-md text-2xl font-bold"
          >
            {{ timer.seconds[1] }}
          </div>
        </div>
        <p class="mt-2 text-sm">{{ $t('863') }}</p>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <NuxtLinkLocale
        to="/black-friday"
        class="bg-white text-[#0073ff] p-3 mt-4 text-[14px] rounded-2xl"
        >{{ $t('864') }}</NuxtLinkLocale
      >
    </div>
  </div>
</template>
<script setup lang="ts">
function createCountdown(targetDate: Date) {
  const timer = reactive({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  function calculateTime() {
    const now = new Date()
    const target = new Date(targetDate)
    const difference = target.getTime() - now.getTime()

    if (difference <= 0) {
      // Time is up
      timer.days = '00'
      timer.hours = '00'
      timer.minutes = '00'
      timer.seconds = '00'
      clearInterval(interval) // Stop updating
      return
    }

    const days = Math.floor(difference / (24 * 60 * 60 * 1000))
    const hours = Math.floor(
      (difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
    )
    const minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000))
    const seconds = Math.floor((difference % (60 * 1000)) / 1000)

    timer.days = days.toString().padStart(2, '0')
    timer.hours = hours.toString().padStart(2, '0')
    timer.minutes = minutes.toString().padStart(2, '0')
    timer.seconds = seconds.toString().padStart(2, '0')
  }

  const interval = setInterval(calculateTime, 1000) // Update every second
  calculateTime() // Initial calculation

  return timer
}
const targetDate = '2024-12-05T00:00:00' // Example target date
const timer = ref()
onMounted(() => {
  timer.value = createCountdown(targetDate)
})
</script>
<style scoped lang="scss"></style>
