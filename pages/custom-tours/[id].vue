<template>
  <div>
    <UIHeader> {{ $t('679') }} </UIHeader>
    <div v-if="!loading" class="container mt-4">
      <router-link to="/" class="mb-3 block w-max bg-white rounded shadow p-3">
        <i class="fa-regular fa-arrow-left me-2 text-[#0073FF]"></i>
        {{ $t('172') }}
      </router-link>
      <div
        v-if="customTour?.type !== 3 || customTour?.hide_form !== true"
        class="bg-white grid grid-cols-12 gap-2 flex-grow-1 rounded shadow-sm p-3 mb-3"
      >
        <!-- Выбор даты -->
        <div
          :class="hasStars ? 'md:col-span-3' : 'md:col-span-5'"
          class="rounded col-span-12 flex flex-col p-3 border"
        >
          <span class="text-[12px] text-[#AAAAAA]">
            {{ $t('474') }} {{ customTour?.nights }} {{ $t('475') }}
          </span>
          <USelectMenu
            v-model="dateSelect"
            :placeholder="$t('91')"
            size="lg"
            :options="options || []"
            value-attribute="value"
            option-attribute="label"
            class="w-full alt_select"
            @change="onDateSelectChange"
          />
        </div>

        <!-- Выбор звездности (только если есть star) -->
        <div
          v-if="hasStars"
          class="md:col-span-3 rounded col-span-12 flex flex-col p-3 border"
        >
          <span class="text-[12px] text-[#AAAAAA]">{{ $t('795') }}</span>
          <USelectMenu
            v-model="selectedStar"
            size="lg"
            :options="starOptions || []"
            value-attribute="value"
            option-attribute="label"
            class="w-full alt_select"
            @change="onStarSelectChange"
          >
            <template #label>
              <div class="flex gap-1">
                <span v-for="n in selectedStar || 0" :key="n">
                  <i class="fa fa-star" style="color: gold"></i>
                  <!-- Использование FontAwesome иконок -->
                </span>
              </div>
            </template>
            <template #option="{ option }">
              <div class="flex gap-1">
                <span v-for="n in option.value" :key="n">
                  <i class="fa fa-star" style="color: gold"></i>
                  <!-- Использование FontAwesome иконок -->
                </span>
              </div>
            </template>
          </USelectMenu>
        </div>

        <!-- Секция выбора количества человек -->
        <div
          class="flex rounded flex-grow-1 flex-col justify-center col-span-12 p-3 border"
          :class="hasStars ? 'md:col-span-3' : 'md:col-span-4'"
        >
          <span class="text-[12px] block text-[#AAAAAA]">{{ $t('57') }}</span>
          <div class="flex items-center justify-center gap-2">
            <i class="fa-thin fa-person text-[#0073FF] text-[20px]"></i>
            <div class="flex justify-center items-center">
              <div
                v-for="(pax, index) in filteredPaxOptions"
                :key="index"
                class="py-1 cursor-pointer px-3 border last:rounded-r first:rounded-l bg-white text-[#0073FF] hover:border-[#0073FF] transition-all"
                :class="adults == pax ? 'border-[#0073FF] !text-[#0073FF]' : ''"
                @click="adults = pax"
              >
                <span>{{ pax.text }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Секция отображения цены -->
        <div
          class="md:col-span-3 rounded flex items-center justify-center col-span-12 border"
        >
          <p class="text-black font-bolder text-[20px]">
            {{ totalPriceb2c }} {{ adults?.currency }}
          </p>
        </div>
      </div>

      <h1 class="h3 my-3">
        {{ locale === 'uz' ? customTour?.tour_name_uz : customTour?.tour_name }}
      </h1>
      <div
        class="bg-white grid grid-cols-12 flex-col gap-4 shadow-sm p-3 rounded mb-3"
      >
        <div
          v-if="customTour?.bannerDesc && customTour?.bannerMob"
          class="col-span-12 flex-grow-1"
        >
          <NuxtImg
            placeholder="/images/default.webp"
            :src="width < 576 ? customTour?.bannerMob : customTour?.bannerDesc"
            :alt="width < 576 ? customTour?.bannerMob : customTour?.bannerDesc"
            img-class="rounded"
            placeholder-class="rounded !max-h-[350px] w-full object-cover aspect-video"
          />
        </div>
        <div
          class="col-span-12 *:md:gap-10 text-[14px] detail-text"
          v-html="customTour?.detail_text"
        ></div>
        <div
          v-if="Object.keys(customTour?.custom_detail_text?.html).length"
          class="mb-3 mt-3"
        >
          <p>{{ customTour?.custom_detail_text?.html }}</p>
          <img
            :src="customTour?.custom_detail_text?.img"
            :alt="customTour?.custom_detail_text?.img"
            class="ms-auto"
            style="width: 300px"
          />
        </div>
        <UButton
          v-if="customTour?.type !== 3"
          type="primary"
          size="lg"
          class="rounded-[1rem] col-span-12 w-full !h-auto justify-center !rounded-xl"
          @click="getData"
        >
          <span class="text-wrap font-bold">
            <span class="text-[16px]">{{ $t('476') }}</span
            >:
            {{ customTour?.tour_name + ' ' }}
            {{ $t('362') + ': ' + state.total_price + ' ' + adults?.currency }}
          </span>
        </UButton>
        <a
          v-if="customTour?.type === 3"
          :href="customTour?.telegram"
          target="_blank"
          class="col-span-12 w-full flex items-center justify-center rounded text-wrap bg-[#3392ff] p-1 text-white h-auto"
          >{{ $t('761') }}: {{ customTour?.tour_name }}</a
        >
        <b
          v-if="customTour?.danger_text_top"
          class="text-red-500 w-full col-span-12"
          style="letter-spacing: -0.5px"
          >{{ customTour?.danger_text_top }}</b
        >
      </div>
      <div
        v-if="!customTour?.info_tour"
        class="bg-white shadow-sm rounded p-3 mb-3"
      >
        <h2 class="text-center h5 !font-normal">
          {{ $t('477') }}
        </h2>
        <h2 class="text-center h5 mb-3 text-[#0073FF]">
          {{ customTour?.tour_name }}
        </h2>
        <div
          v-for="(item, index) in customTour?.tour_days"
          :key="index"
          class="grid grid-cols-12 gap-3 min-h-[300px] rounded border-l-0 mb-3"
          style="border: 1px solid #d2d2d2"
        >
          <div class="md:col-span-3 col-span-12 flex-grow-1 relative">
            <swiper
              id="days-img"
              :init="false"
              :slides-per-view="1"
              :modules="modules"
              :navigation="item?.img?.length > 1"
              :space-between="30"
            >
              <swiper-slide
                v-for="(img, ind) in item?.img"
                :key="ind"
                class="h-full min-h-[200px]"
              >
                <NuxtImg
                  placeholder="/images/default.webp"
                  :src="img"
                  :alt="img"
                  class="h-full w-full bg-center bg-no-repeat bg-cover aspect-video object-cover hover:scale-[1.2] transition-all"
                  img-class="h-full w-full bg-center bg-no-repeat bg-cover aspect-video object-cover hover:scale-[1.2] transition-all"
                />
              </swiper-slide>
            </swiper>
          </div>
          <div
            class="md:col-span-7 col-span-12 flex-grow-1 p-3 text-[14px]"
            v-html="locale === 'uz' ? item.text_uz : item.text"
          ></div>
        </div>
        <b class="text-red-500">{{ customTour?.danger_text_bottom }}</b>
        <span class="mb-3 block">{{ customTour?.tour_info_text }}</span>
        <UButton
          v-if="customTour?.type !== 3"
          size="lg"
          class="rounded-[1rem] w-full !text-wrap !h-auto text-[14px] flex flex-col justify-center"
          @click="getData"
          ><span class="text-[14px]">{{ $t('476') }}:</span>
          {{ customTour?.tour_name + ' ' }}
          {{ $t('362') + ': ' + state.total_price + ' ' + adults?.currency }}
        </UButton>
        <a
          v-if="customTour?.type === 3"
          :href="customTour?.b2c_telegram"
          target="_blank"
          class="w-full flex items-center justify-center rounded text-wrap bg-[#3392ff] p-1 text-white h-auto"
          >{{ $t('761') }}:
          {{ customTour?.tour_name + ' ' }}
          {{ $t('362') }}</a
        >
        <span v-if="customTour?.pdf_file">
          {{ $t('787') }}:
          <a
            :href="customTour?.pdf_file"
            class="text-[#0073FF]"
            target="_blank"
            >{{ $t('788') }}</a
          >
        </span>
      </div>
      <LazyLayoutAuthRequiredModal
        :show="authRequired"
        @on-close="getData(false)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/swiper-bundle.css'

import { useWindowSize } from '@vueuse/core'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const modules = [Navigation]
const { width } = useWindowSize()
const { checkRegister } = useAuthValidation()
const authRequired = ref(false)
const router = useRouter()
const route = useRoute()
const customTour = ref(null)
const selectedStar = ref(null)
const dateSelect = ref(0)
const loading = ref(true)
const { t, locale } = useI18n()
const { myToast } = useCustomToast()
const adults = ref(null)
const result = ref(null)
const options = computed(() =>
  customTour.value?.tour_data?.map((el, index) => ({
    ...el,
    value: index,
  })),
)

const state = reactive({
  type: '',
  adults: '',
  childs: '',
  tour_price: '',
  avia_price: '',
  total_price: '',
  date_from: '',
  date_to: '',
  class_uz: '',
  star: '',
  from: '',
  to: '',
  tour_name: '',
  class: '',
  info_tour: '',
  umra_status: '',
})

// Проверка наличия звездности
const hasStars = computed(() =>
  customTour.value?.tour_data[dateSelect.value]?.pax.some((pax) => pax.star),
)

// Фильтрация звезд и удаление дубликатов
const starOptions = computed(() => {
  const stars = customTour.value?.tour_data[dateSelect.value]?.pax
    ?.map((pax) => pax.star)
    ?.filter((star) => star)

  return stars
    ? [...new Set(stars)].map((star) => ({
        label: '', // Пустое значение, чтобы убрать текст
        value: star,
      }))
    : []
})

// Фильтрация по количеству звезд
const filteredPaxOptions = computed(() => {
  const paxOptions = customTour.value?.tour_data[dateSelect.value]?.pax || []
  if (selectedStar.value) {
    return paxOptions.filter((pax) => pax.star === selectedStar.value)
  }
  return paxOptions
})

const totalPriceb2c = computed(() => {
  const obj = filteredPaxOptions.value.find(
    (el) => el.text === adults.value?.text,
  )
  return obj?.b2c_price + obj?.avia
})

const onDateSelectChange = () => {
  const paxOptions = customTour.value?.tour_data[dateSelect.value]?.pax.filter(
    (pax) => !selectedStar.value || pax.star === selectedStar.value,
  )

  adults.value = paxOptions[0]
}

const onStarSelectChange = () => {
  const paxOptions = customTour.value?.tour_data[dateSelect.value]?.pax.filter(
    (pax) => pax.star === selectedStar.value,
  )

  adults.value = paxOptions[0]
}

const getTourDays = () => {
  loading.value = true
  useApi()
    .$get('https://b2c.asialuxe.app/api/tours_ex/?id=' + route.params.id)
    .then((res) => {
      customTour.value = res
      state.type = res?.type
      state.date_from = res?.tour_data[dateSelect.value]?.date_from
      state.date_to = res?.tour_data[dateSelect.value]?.date_to
      state.from = res?.from
      state.to = res?.to
      state.tour_name = res?.tour_name
      state.class = res?.class
      state.class_uz = res?.class_uz
      state.info_tour = res?.info_tour
      state.umra_status = res?.umra_status
      adults.value = customTour.value?.tour_data[0]?.pax[0]
      if (hasStars.value && starOptions.value.length > 0) {
        selectedStar.value = starOptions.value[0].value
      }
      useSeoMeta({
        title: t('779', {
          tour: res?.tour_name,
        }),
        ogTitle: t('779', {
          tour: res?.tour_name,
        }),
        description: t('780', {
          tour: res?.tour_name,
        }),
        ogDescription: t('780', {
          tour: res?.tour_name,
        }),
        ogImage: res?.bannerDesc,
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const getData = async function (isClose?: boolean) {
  if (!checkRegister()) {
    isClose ? (authRequired.value = true) : (authRequired.value = false)
    return
  }
  await useApi()
    .$post('/v1/umrah/prebook', {
      body: state,
      params: {
        platform: 'app',
      },
    })
    .then((res) => {
      if (res.data === false) {
        myToast('error', t('189'))
      }
      result.value = res?.data?.data?.reservation_id
      if (res?.data?.data?.reservation_id) {
        router.push({
          path: `/${locale.value}/custom-tours/booking`,
          query: {
            request_id: result.value,
            ...state,
          },
        })
      }
    })
}

watch(
  [() => dateSelect.value, () => selectedStar.value],
  ([newDate, newStar]) => {
    state.star = newStar
    if (options.value?.length) {
      const selectedItem = options.value[dateSelect.value]
      state.date_from = selectedItem?.date_from
      state.date_to = selectedItem?.date_to
    }

    // Получаем доступные опции для pax на основе выбранной даты и звездности
    const paxOptions =
      customTour.value?.tour_data[newDate]?.pax.filter(
        (pax) => !newStar || pax.star === newStar,
      ) || []
    if (paxOptions.length > 0) {
      // Если опции для pax существуют, обновляем выбор и состояние
      adults.value = paxOptions[0] // Выбираем первую доступную опцию
      state.adults = paxOptions[0]?.adults
      state.childs = paxOptions[0]?.child
      state.tour_price = paxOptions[0]?.b2c_price
      state.avia_price = paxOptions[0]?.avia
      state.total_price = paxOptions[0]?.avia + paxOptions[0]?.b2c_price
    } else {
      // Если нет доступных опций, сбрасываем значение
      adults.value = null
      state.adults = ''
      state.childs = ''
      state.tour_price = ''
      state.avia_price = ''
      state.total_price = ''
    }
  },
  { immediate: true }, // Запускаем watch сразу при монтировании компонента
)
watch(
  () => adults.value,
  (value) => {
    state.adults = value?.adults
    state.childs = value.child
  },
  {
    deep: true,
  },
)
await useAsyncData(() => getTourDays())
</script>

<style lang="scss">
.text-primary {
  color: #0073ff;
}

.el-carousel__container {
  height: 100% !important;
}

.swiper-button-prev,
.swiper-button-next {
  width: 40px;
  height: 40px;
  border: 1px solid #0073ff;
  border-radius: 10rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: #0073ff;
  --swiper-navigation-size: 15px;
  --swiper-theme-color: #0073ff;
  --swiper-preloader-color: #0073ff;
}

#days-img {
  height: 100%;
}
</style>
