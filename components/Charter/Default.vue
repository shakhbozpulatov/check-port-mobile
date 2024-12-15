<template>
  <div class="charter-block mb-16">
    <h1 class="text-left mb-3 mt-3">
      <b>{{ t('237', { city: charters?.cities?.[activeCity] }) }} </b>
    </h1>

    <div class="charter-route-block">
      <div class="charter-route-title flex items-center justify-start">
        <img src="/images/charter/location-ico.svg" alt="location" />
        <span>
          {{ t('176') }}
        </span>
      </div>
      <div class="charter-route-tab-btns">
        <ul class="nav nav-tabs flex items-center flex-wrap">
          <li
            v-for="(item, index) in charters?.cities"
            :key="index"
            class="nav-item"
          >
            <button
              :class="index === activeCity ? 'active' : ''"
              class="nav-link directions"
              @click="onChangeCity(index)"
            >
              {{ item }}
            </button>
          </li>
        </ul>
      </div>
      <div class="charter-dates-block">
        <img src="/images/charter/calen-ico.svg" alt="calen" />
        <span class=""> {{ t('99') }} </span>
      </div>
    </div>
    <div class="charter-tabs-body-block">
      <div id="countriesTabContent" class="tab-content">
        <div
          :class="activeCity === 'AYT' ? 'show active' : ''"
          class="tab-pane fade"
        >
          <ul class="nav nav-tabs flex flex-wrap">
            <li
              v-for="(item, index) in currentDates"
              :key="index + 'ready-ticket'"
              class="nav-item"
              role="presentation"
            >
              <button
                class="nav-link directions"
                :class="activeMonth === index ? 'show active' : ''"
                type="button"
                @click="activeMonth = index"
              >
                {{ index }}
              </button>
            </li>
          </ul>
          <div v-if="activeMonth" class="tab-content">
            <div
              v-for="(dates, elem, r) in currentDates?.[activeMonth]"
              :key="r + 'dates'"
              :class="r === 0 ? 'show active' : ''"
              class="tab-pane fade mb-5 flex gap-3 items-center md:flex-nowrap flex-wrap"
            >
              <div class="tab-item-date">
                <span class="date-blue">{{ elem }}</span>
                <span class="date-month"
                  >{{ activeMonth.substring(0, 3) }}.</span
                >
              </div>
              <div class="flex items-center gap-3 flex-wrap">
                <div
                  v-for="(date, ind) in dates"
                  :key="ind + 'date'"
                  class="tab-item-tickets-block gap-3 w-full md:w-auto flex-wrap md:flex-nowrap"
                  :class="dates.length > 2 ? 'lg:last:ml-0 md:last:ml-14' : ''"
                  @click="searchTicket(date)"
                >
                  <div
                    class="tab-item-ticket md:min-w-[350px] !w-full md:!w-auto gap-3 grid grid-cols-12 bg-white cursor-pointer"
                  >
                    <div class="tab-item-info-block md:col-span-3">
                      <div class="tab-item-info info-block-code">
                        <span class="">{{ date.departure_code }}</span>
                        <img
                          src="/images/charter/angleRight-ico.svg"
                          alt="angle"
                        />
                      </div>
                      <div class="tab-item-info info-block-country">
                        <span class="">{{ date.departure_city }}</span>
                      </div>
                      <div class="tab-item-info info-block-time">
                        <span class="">{{ date.departure_time }}</span>
                      </div>
                    </div>
                    <div class="tab-item-info-block md:col-span-3">
                      <div class="tab-item-info info-block-code">
                        <span class="">{{ date.arrival_code }}</span>
                      </div>
                      <div class="tab-item-info info-block-country">
                        <span class="">{{ date.arrival_city }}</span>
                      </div>
                      <div class="tab-item-info info-block-time">
                        <span class="">{{ date.arrival_time }}</span>
                      </div>
                    </div>
                    <div class="tab-item-info-block md:col-span-6">
                      <div class="tab-item-info info-block-count">
                        <img
                          v-if="date.seats > 0"
                          src="/images/charter/checkGreen-cio.svg"
                          alt="check"
                        />

                        <span v-if="date.seats > 0" class="">{{
                          t('117')
                        }}</span>
                        <span v-if="date.seats <= 0" class="text-danger">{{
                          t('189')
                        }}</span>
                      </div>
                      <div class="tab-item-info info-block-price-muted">
                        <span>{{ date.price_usd }}$</span>
                      </div>
                      <div class="tab-item-info info-block-price-blue">
                        <span class=""
                          >{{ date.price_uzs }} <sub>UZS</sub></span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const store = useAviaStore()
const mainStore = useMainStore()

const charters = computed(() => mainStore.readyTickets)
const activeCity = ref(
  route.params?.slug ? String(route.params?.slug)?.toUpperCase() : 'AYT',
)
const activeMonth = ref('')

const currentDates = computed(() => charters.value?.data?.[activeCity.value])
const onChangeCity = (city: string) => {
  router.replace({ params: { slug: city } })
  activeCity.value = city
  const obj = Object.keys(charters.value?.data?.[activeCity.value] || {})
  activeMonth.value = obj?.[0]
}
const searchTicket = (data) => {
  console.log(data, 'default ticket')
  if (data?.seats > 0) {
    router.push({
      // path: `/${locale.value}/charter/${data?.departure_code}${data?.arrival_code}`,
      query: {
        dep_code: data?.departure_code,
        arr_code: data?.arrival_code,
        dep_date: data?.flight_date,
        default_ticket: 1,
      },
    })
  }
}
watch(
  () => currentDates.value,
  () => {
    const obj = Object.keys(currentDates.value || {})
    activeMonth.value = obj?.[0]
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>
<style scoped>
.directions {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  color: #555;
  padding: 6px 10px;
  border-radius: 8px;
}
.directions:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.charter-title-block > div {
  width: 294px;
  height: 43px;
  border-radius: 1rem;
  border: 1px solid #3392ff;
  color: #3392ff;
  gap: 9px;
  font-size: 16px;
}

.charter-route-title {
  gap: 6px;
  width: min-content;
  margin-bottom: 17px;
  font-size: 16px;
}

.charter-block .nav-tabs {
  border-bottom: 0;
  gap: 8px;
  margin-bottom: 16px;
}

.charter-block .nav-link {
  background-color: white;
  border-radius: 1rem;
}

.charter-block .nav-link.active {
  background-color: #0073ff !important;
  color: white !important;
}

.charter-dates-block,
.charter-route-tab-btns {
  margin-bottom: 16px;
}

.charter-dates-block {
  font-size: 16px;
  display: flex;
  width: min-content;
  align-items: center;
  gap: 6px;
}

.tab-item-tickets-block {
  gap: 20px;
  display: flex;
  align-items: center;
}

.tab-item-date {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.tab-item-ticket {
  display: flex;
  width: 410px;
  height: 83px;
  border-radius: 10px;
  padding: 10px 14px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}
.tab-item-ticket:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
}

.tab-item-info-block {
  display: flex;
  flex-direction: column;
}

.tab-item-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-block-code span {
  font-size: 18px;
}

.info-block-count span {
  font-size: 14px;
}

.info-block-code,
.info-block-count {
  line-height: 14px;
}

.info-block-country span,
.info-block-price-muted span {
  color: #9e9e9e;
  font-size: 14px;
}

.info-block-time span,
.info-block-price-blue span {
  font-size: 18px;
}

.info-block-price-blue span {
  color: #3392ff;
}

.date-blue {
  font-size: 40px;
  color: #3392ff;
  line-height: 24px;
}

.date-month {
  font-size: 18px;
}

.date-week {
  font-size: 14px;
  color: #9e9e9e;
}

@media screen and (max-width: 768px) {
  .tab-item-ticket {
    flex-wrap: wrap;
    gap: 10px;
    height: auto;
  }
}
</style>
