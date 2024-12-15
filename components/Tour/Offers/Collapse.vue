<template>
  <div class="avia-tickets tour-tickets">
    <UICustomCollapse
      v-if="allTourOffers?.flights?.length"
      :selected="false"
      class="!rounded-lg shadow bg-white"
    >
      <template #header>
        <div
          class="gap-4 rounded p-3 md:gap-0 flex md:items-center items-start md:flex-row flex-col h-auto justify-between w-full"
        >
          <div class="flex items-center gap-2 shrink-0">
            <div>
              <i class="fa-regular fa-plane-departure text-[#0073FF]"></i>
            </div>
            <p class="">{{ $t('28') }}</p>
          </div>
          <div
            class="flex items-center justify-center gap-3 md:m-auto md:w-full flex-wrap md:flex-nowrap"
          >
            <div
              class="flex items-center gap-[1rem] md:gap-5 border rounded py-3 md:p-0"
            >
              <div class="flex items-center gap-1 ml-2">
                <p class="leading-5 text-[12px]">
                  {{ chosenTicket?.offers[0].departure.code }}
                  ->
                  {{ chosenTicket?.offers[0].arrival.code }}
                </p>
              </div>

              <div class="flex items-center gap-3 md:gap-1">
                <div
                  class="icon-wrap flex-wrap md:flex-nowrap flex w-full gap-0 md:gap-3 items-center justify-center"
                >
                  <UBadge
                    v-if="chosenTicket?.provider_id === 1"
                    class="mb-1 md:mb-0 w-full"
                    size="sm"
                  >
                    <div class="flex items-center justify-center w-full gap-1">
                      <i class="fa-light fa-plane"></i>
                      <p class="luggage">{{ $t('367') }}</p>
                    </div>
                  </UBadge>
                  <img
                    style="max-width: 60px"
                    :src="chosenTicket?.offers[0].segments[0].avia_company.logo"
                    alt=""
                    width="100px"
                  />
                </div>
                <p
                  v-if="chosenTicket?.offers[0].stops === 0"
                  class="text-nowrap text-[12px] mr-2"
                >
                  {{ $t('281') }}
                </p>
              </div>
              <!--                  <div>-->
              <!--                    <p>-->
              <!--                      {{ chosenTicket?.offers[0].class }}-->
              <!--                      ({{-->
              <!--                        chosenTicket?.offers[0]-->
              <!--                          .segments[0].class-->
              <!--                      }})-->
              <!--                    </p>-->
              <!--                  </div>-->
            </div>
            <div
              v-if="allTourOffers?.request.round_trip === 1"
              class="flex items-center gap-[1rem] md:gap-5 border rounded py-3 md:p-0"
            >
              <div class="flex items-center gap-1 ml-2">
                <p class="leading-5 text-[12px]">
                  {{ chosenTicket?.offers[1].departure.code }}
                  ->
                  {{ chosenTicket?.offers[1].arrival.code }}
                </p>
              </div>
              <div class="flex items-center gap-3 md:gap-1">
                <div
                  class="icon-wrap flex-wrap md:flex-nowrap flex w-full gap-0 md:gap-3 items-center justify-center"
                >
                  <UBadge
                    v-if="chosenTicket?.provider_id === 1"
                    class="mb-1 md:mb-0 w-full"
                    size="sm"
                  >
                    <div class="flex items-center gap-1 w-full justify-center">
                      <i class="fa-light fa-plane"></i>
                      <p class="luggage">{{ $t('367') }}</p>
                    </div>
                  </UBadge>
                  <img
                    style="max-width: 60px"
                    :src="chosenTicket?.offers[1].segments[0].avia_company.logo"
                    alt=""
                    width="100px"
                  />
                </div>
                <p
                  v-if="chosenTicket?.offers[1].stops === 0"
                  class="text-nowrap mr-2 text-[12px]"
                >
                  {{ $t('281') }}
                </p>
              </div>
            </div>
          </div>
          <div class="text-right font-bolder ms-auto w-fit shrink-0">
            <p class="text-[14px]">{{ $t('250') }}</p>
          </div>
        </div>
      </template>
      <template #default>
        <div class="content-card -100">
          <div class="flex items-center justify-between">
            <h4>{{ $t('51') }}</h4>
          </div>
          <div
            v-if="user?.id === 1 || user?.id === 147"
            class="flex gap-2 mb-3 mt-3"
          >
            Туда -
            <span> provider: {{ chosenTicket?.provider_id }} </span>
            <span>
              duration:
              {{ chosenTicket?.duration_minutes }}
            </span>
            <span>
              stops:
              {{ chosenTicket?.dir_number_1_stops }}
            </span>
            <span>
              baggage:
              {{ chosenTicket?.dir_number_1_baggage }}
            </span>
            <span>
              baggage_status:
              {{ chosenTicket?.dir_number_1_baggage_status }}
            </span>
          </div>
          <div
            v-if="user?.id === 1 || user?.id === 147"
            class="flex gap-2 mb-3 mt-3"
          >
            Обратно -
            <span>
              provider:
              {{ chosenTicket?.offers[1].provider_id }}
            </span>
            <span>
              duration:
              {{ chosenTicket?.offers[1].duration_minutes }}
            </span>
            <span>
              stops:
              {{ chosenTicket?.offers[1].stops }}
            </span>
            <span>
              baggage:
              {{ chosenTicket?.offers[1].baggage }}
            </span>
            <span>
              baggage_status:
              {{ chosenTicket?.offers[1].baggage_status }}
            </span>
          </div>
          <div>
            <div
              class="inner-wrap flex md:grid md:grid-cols-12 items-center flex-wrap md:flex-nowrap justify-between border-[1px] relative"
              :class="
                allTourOffers?.request.round_trip !== 1
                  ? 'w-[100%] md:w-[80%] m-auto mb-3 mt-3'
                  : ''
              "
            >
              <div class="absolute top-2 right-2 flex items-center gap-3">
                <UButton
                  class="rounded-[1rem] justify-center"
                  :loading="ticketsLoader"
                  @click="showAllTickets"
                >
                  <i class="fa-light fa-circle-check"></i>
                  {{ $t('133') }}
                </UButton>
              </div>
              <div
                class="mt-4 mb-3 md:mb-0 md:mt-0 flex-grow-1 col-span-12"
                :class="
                  allTourOffers?.request.round_trip !== 1
                    ? ' md:col-span-12'
                    : ' md:col-span-5'
                "
              >
                <div class="flex items-center text-[#0073FF] text-[18px] mb-2">
                  <p class="">
                    {{ chosenTicket?.offers[0].departure.code }}
                    -
                    {{ chosenTicket?.offers[0].arrival.code }}
                  </p>
                </div>
                <div
                  class="flex items-center gap-4 flex-wrap md:flex-nowrap w-full"
                >
                  <div
                    class="w-full md:w-auto md:block grid grid-cols-3 items-center mb-3 md:mb-0"
                  >
                    <div class="flex items-center gap-1 mt-3 mb-2">
                      <img
                        class="text-[14px]"
                        src="/images/icons/luggage.svg"
                        alt=""
                      />
                      <p class="">
                        {{ chosenTicket?.dir_number_1_baggage }}
                      </p>
                      <p class="">
                        {{ chosenTicket?.offers[0].class }}
                      </p>
                      <p class="">
                        ({{ chosenTicket?.offers[0].segments[0].class }})
                      </p>
                    </div>
                    <div v-if="chosenTicket?.provider_id === 1">
                      <UBadge size="sm">
                        <div
                          class="flex items-center gap-1 w-full justify-center"
                        >
                          <i class="fa-light fa-plane"></i>
                          <p class="luggage">{{ $t('367') }}</p>
                        </div>
                      </UBadge>
                    </div>
                    <div class="mt-3 icon-wrap">
                      <img
                        :src="
                          chosenTicket?.offers[0].segments[0].avia_company.logo
                        "
                        alt=""
                        width="100px"
                      />
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-12 items-center gap-2 flex-wrap flex-grow-1 md:flex-nowrap w-full"
                  >
                    <div class="md:col-span-2 order-[0] col-span-6 flex-grow-1">
                      <p class="text-[12px]">
                        {{
                          dayjs(
                            chosenTicket?.offers[0].departure.date_format,
                          ).format('DD.MM.YYYY')
                        }}
                      </p>
                      <p class="text-[20px]">
                        {{ chosenTicket?.offers[0].departure.code }}
                      </p>
                      <p class="text-[18px]">
                        {{ chosenTicket?.offers[0].departure.time_format }}
                      </p>
                    </div>
                    <div
                      class="col-span-12 mb-3 md:mb-0 md:col-span-8 order-[-1] md:order-[0] flex-grow-1 flex flex-col justify-center items-center text-[12px] gap-1 text-[#333]"
                    >
                      <div class="px-3 w-[100%]">
                        <div class="line flex justify-between w-full">
                          <div
                            class="absolute left-[-2px] bottom-[-12px] flex items-center justify-between w-full"
                          >
                            <div class="circle">
                              <UTooltip
                                class="box-item"
                                effect="dark"
                                :text="
                                  chosenTicket?.offers[0].departure.name ||
                                  chosenTicket?.offers[0].departure.code
                                "
                                :popper="{ placement: 'top' }"
                              >
                                <p
                                  class="abbr absolute top-[-37px] right-[-20px]"
                                >
                                  {{ chosenTicket?.offers[0].departure.code }}
                                </p>
                              </UTooltip>
                            </div>
                            <div
                              v-for="(stop, index) in chosenTicket?.offers[0]
                                .segments"
                              :key="index + 'offer'"
                            >
                              <UTooltip
                                v-if="
                                  stop.arrival.code !==
                                  chosenTicket?.offers[0].arrival.code
                                "
                                class="box-item"
                                :text="`${stop.arrival.city || ''}, ${
                                  stop.arrival.name || ''
                                }`"
                                :popper="{ placement: 'top' }"
                              >
                                <div class="circle">
                                  <p
                                    class="abbr absolute top-[-37px]"
                                    :class="`${
                                      chosenTicket?.offers[0].segments[index]
                                        .arrival?.code !==
                                      chosenTicket?.offers[0].segments[
                                        index + 1
                                      ].departure?.code
                                        ? 'right-[12px]'
                                        : 'right-[-8px]'
                                    }`"
                                  >
                                    {{ stop.arrival?.code }}
                                  </p>
                                  <p
                                    v-if="
                                      chosenTicket?.offers[0].segments[index]
                                        .arrival?.code !==
                                      chosenTicket?.offers[0].segments[
                                        index + 1
                                      ].departure?.code
                                    "
                                    class="abbr absolute top-[-37px] right-[-25px]"
                                  >
                                    <span
                                      >-
                                      {{
                                        chosenTicket?.offers[0].segments[
                                          index + 1
                                        ].departure?.code
                                      }}</span
                                    >
                                  </p>
                                </div>
                              </UTooltip>
                            </div>
                            <div class="circle right-0 right relative">
                              <UTooltip
                                class="box-item"
                                :text="
                                  chosenTicket?.offers[0].arrival.name ||
                                  chosenTicket?.offers[0].arrival.code
                                "
                                :popper="{ placement: 'top' }"
                              >
                                <p
                                  class="abbr absolute top-[-37px] right-[-20px]"
                                >
                                  {{ chosenTicket?.offers[0].arrival.code }}
                                </p>
                              </UTooltip>
                            </div>
                          </div>
                        </div>
                        <p class="road-time mt-2">
                          {{ $t('47') }}:
                          {{ chosenTicket?.offers[0].duration }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="md:col-span-2 col-span-6 flex-grow-1 ms-auto flex flex-col justify-end text-right items-end"
                    >
                      <p class="text-[12px]">
                        {{
                          dayjs(
                            chosenTicket?.offers[0].arrival.date_format,
                          ).format('DD.MM.YYYY')
                        }}
                      </p>
                      <p class="text-[20px]">
                        {{ chosenTicket?.offers[0].arrival.code }}
                      </p>
                      <p class="text-[18px]">
                        {{ chosenTicket?.offers[0].arrival.time_format }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="allTourOffers?.request.round_trip === 1"
                class="w-[80px] col-span-6 m-auto items-center flex md:flex-grow-1 md:col-span-2"
              >
                <i
                  class="fa-thin fa-signs-post text-[#0073FF] text-[80px] m-auto block"
                ></i>
              </div>
              <div
                v-if="allTourOffers?.request.round_trip === 1"
                class="col-span-12 md:col-span-5 flex-grow-1"
              >
                <div class="flex items-center text-[#0073FF] text-[18px] mb-2">
                  <p class="">
                    {{ chosenTicket?.offers[1].departure.code }}
                    -
                    {{ chosenTicket?.offers[1].arrival.code }}
                  </p>
                </div>
                <div
                  class="flex items-center gap-4 flex-wrap md:flex-nowrap w-full"
                >
                  <div
                    class="w-full md:w-auto md:block grid grid-cols-3 items-center mb-3 md:mb-0"
                  >
                    <div class="flex items-center gap-1 mt-3 mb-2">
                      <img
                        class="text-[14px]"
                        src="/images/icons/luggage.svg"
                        alt=""
                      />
                      <p class="">
                        {{ chosenTicket?.dir_number_2_baggage }}
                      </p>
                      <p class="">
                        {{ chosenTicket?.offers[1].class }}
                      </p>
                      <p class="">
                        ({{ chosenTicket?.offers[1].segments[0].class }})
                      </p>
                    </div>
                    <div v-if="chosenTicket?.provider_id === 1">
                      <UBadge size="sm">
                        <div
                          class="flex items-center gap-1 w-full justify-center"
                        >
                          <i class="fa-light fa-plane"></i>
                          <p class="luggage">{{ $t('367') }}</p>
                        </div>
                      </UBadge>
                    </div>
                    <div class="icon-wrap mt-3">
                      <img
                        :src="
                          chosenTicket?.offers[1].segments[0].avia_company.logo
                        "
                        alt=""
                        width="100px"
                      />
                    </div>
                  </div>
                  <div
                    class="flex-grow-1 grid md:grid-cols-12 md:pe-4 flex-wrap md:flex-nowrap items-center gap-2 w-full"
                  >
                    <div class="md:col-span-2 col-span-6 order-[0] flex-grow-1">
                      <p class="text-[12px]">
                        {{
                          dayjs(
                            chosenTicket?.offers[1].departure.date_format,
                          ).format('DD.MM.YYYY')
                        }}
                      </p>
                      <p class="text-[20px]">
                        {{ chosenTicket?.offers[1].departure.code }}
                      </p>
                      <p class="text-[18px]">
                        {{ chosenTicket?.offers[1].departure.time_format }}
                      </p>
                    </div>
                    <div
                      class="md:col-span-8 col-span-12 md:order-[0] mb-3 mt-3 md:mt-0 md:mb-0 order-[-1] flex flex-col flex-grow-1 justify-center items-center text-[12px] gap-1 text-[#333]"
                    >
                      <div class="px-3 w-[100%]">
                        <div class="line flex justify-between w-full">
                          <div
                            class="absolute left-[-2px] bottom-[-12px] flex items-center justify-between w-full"
                          >
                            <div class="circle">
                              <UTooltip
                                class="box-item"
                                :text="
                                  chosenTicket?.offers[1].departure.name ||
                                  chosenTicket?.offers[1].departure.code
                                "
                                :popper="{ placement: 'top' }"
                              >
                                <p
                                  class="abbr absolute top-[-37px] right-[-20px]"
                                >
                                  {{ chosenTicket?.offers[1].departure.code }}
                                </p>
                              </UTooltip>
                            </div>
                            <div
                              v-for="(stop, index) in chosenTicket?.offers[1]
                                .segments"
                              :key="index + 'segment'"
                            >
                              <UTooltip
                                v-if="
                                  stop.arrival.code !==
                                  chosenTicket?.offers[1].arrival.code
                                "
                                class="box-item"
                                :text="`${stop.arrival.city || ''}, ${
                                  stop.arrival.name || ''
                                }`"
                                :popper="{ placement: 'top' }"
                              >
                                <div class="circle">
                                  <p
                                    class="abbr absolute top-[-37px]"
                                    :class="`${
                                      chosenTicket?.offers[1].segments[index]
                                        .arrival?.code !==
                                      chosenTicket?.offers[1].segments[
                                        index + 1
                                      ].departure?.code
                                        ? 'right-[4px]'
                                        : 'right-[-8px]'
                                    }`"
                                  >
                                    {{ stop.arrival?.code }}
                                  </p>
                                  <p
                                    v-if="
                                      chosenTicket?.offers[1].segments[index]
                                        .arrival?.code !==
                                      chosenTicket?.offers[1].segments[
                                        index + 1
                                      ].departure?.code
                                    "
                                    class="abbr absolute top-[-37px] right-[-25px]"
                                  >
                                    <span
                                      >-
                                      {{
                                        chosenTicket?.offers[1].segments[
                                          index + 1
                                        ].departure?.code
                                      }}</span
                                    >
                                  </p>
                                </div>
                              </UTooltip>
                            </div>
                            <div class="circle right-0 right relative">
                              <UTooltip
                                class="box-item"
                                effect="dark"
                                :text="
                                  chosenTicket?.offers[1].arrival.name ||
                                  chosenTicket?.offers[1].arrival.code
                                "
                                :popper="{ placement: 'top' }"
                              >
                                <p
                                  class="abbr absolute top-[-37px] right-[-20px]"
                                >
                                  {{ chosenTicket?.offers[1].arrival.code }}
                                </p>
                              </UTooltip>
                            </div>
                          </div>
                        </div>
                        <p class="road-time mt-3">
                          {{ $t('47') }}:
                          {{ chosenTicket?.offers[1].duration }}
                        </p>
                      </div>
                    </div>
                    <div
                      class="md:col-span-2 col-span-6 flex ms-auto flex-grow-1 flex-col text-right justify-end items-end"
                    >
                      <p class="text-[12px]">
                        {{
                          dayjs(
                            chosenTicket?.offers[1].arrival.date_format,
                          ).format('DD.MM.YYYY')
                        }}
                      </p>
                      <p class="text-[20px]">
                        {{ chosenTicket?.offers[1].arrival.code }}
                      </p>
                      <p class="text-[18px]">
                        {{ chosenTicket?.offers[1].arrival.time_format }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UICustomCollapse>
    <TourOffersTicketsDialog
      :show="ticketsDialog"
      @on-close="ticketsDialog = false"
      @on-change-ticket="$emit('on-change-ticket')"
    />
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

const store = useTourStore()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const allTourOffers = computed(() => store.allTourOffers)
const chosenTicket = computed(() => store.chosenTicket)

const ticketsLoader = ref(false)
const ticketsDialog = ref(false)
const showAllTickets = async () => {
  try {
    ticketsLoader.value = true
    await store.getTourAllTickets()
    ticketsDialog.value = true
  } catch (err) {
    console.log(err)
  } finally {
    ticketsLoader.value = false
  }
}
</script>

<style lang="scss">
@import '@/assets/style/scss/style';

.tickets {
  height: 100vh;
  overflow-y: scroll;
}
.icon-wrap {
  width: 160px;
}

.avia-tickets {
  color: #000;
  .collapse-item {
    margin-bottom: 14px;
    box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
    border-radius: 10px;
    overflow: hidden;
    .collapse-part {
      border-radius: 10px;
      padding: 30px 12px;
      @include common-text-style(14px, 500, normal);
    }
    .el-collapse-item__header {
      display: grid;
    }
  }

  .content-card {
    @include common-text-style(14px, 500, normal);
    padding: 10px;
    .price-wrap {
      @include common-text-style(18px, 600, normal);
    }
    .inner-wrap {
      padding: 14px;
      border-radius: 12px;
      margin-top: 10px;
      box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
      transition: all 0.3s;
      cursor: pointer;
      .line {
        border-bottom: 1px solid #d5d5d5;
      }
    }
    .inner-wrap:hover {
      box-shadow:
        rgba(50, 50, 93, 0.25) 0 6px 12px -2px,
        rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    }
  }
}

[type='radio'] + img,
[type='checkbox'] + img {
  cursor: pointer;
}

[type='radio']:checked + img,
[type='checkbox']:checked + img {
  outline: 2px solid #3392ff;
  border-radius: 1rem;
}

.insurance-img {
  height: 90px;
}

.alco-img {
  height: 30px;
}

label {
  border-radius: 1rem;
}

.date-add-btn {
  width: 30px;
  height: 30px;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.insurance-inputs-block {
  border-radius: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 2px solid transparent;
  padding: 5px;
  transition: border-color 0.3s;
}

.checkbox-label.checked {
  border-color: #3399ff; /* Цвет обводки при выборе */
}

.checkbox-input {
  display: none; /* Скрываем сам чекбокс */
}

.checkbox-content {
  display: flex;
  align-items: center;
}

.checkbox-image {
  width: 30px; /* Регулируйте размер изображения по необходимости */
  height: 30px; /* Регулируйте размер изображения по необходимости */
  margin-right: 5px;
}

.checkbox-title {
  font-size: 16px; /* Регулируйте размер шрифта по необходимости */
}

.ins-accept-btn-block button {
  background: #3399ff;
  color: white;
}
.search {
  border-radius: 20px;
  background: #0073ff90;
  padding: 20px;
  box-shadow: 20px 20px 40px rgba(0, 0, 0, 0.05);
  .search-categ {
    width: 440px;
    margin: 0 auto;
    .tab-wrap {
      width: 100%;
      justify-content: center;
      .tab-item1 {
        width: 25%;
      }
      .tab-item2 {
        width: 25%;
      }
    }
  }
  .avia-directions {
    width: 480px;
  }
}
.line {
  border: 3px solid #d5d9de;
  border-radius: 50px;
  width: 100%;
  position: relative;
  .circle {
    transform: translateY(-50%);
    box-shadow: rgba(51, 146, 255, 0.25) 0 0 3px 4px;
    border-radius: 50%;
    background: #3392ff;
    width: 12px;
    height: 12px;
  }
  .left {
    transform: translate(-50%, -50%);
  }
  .right {
    transform: translate(50%, -50%);
  }
  .abbr {
    @include common-text-style(14px, 500, normal);
    color: #3392ff;
  }
}
.price-view {
  @include common-text-style(15px, 600, normal);
  padding: 16px 0;
}
.price {
  @include common-text-style(20px, 600, normal);
}
.road-time {
  @include common-text-style(13px, 500, normal);
  color: #333333;
  text-align: center;
  margin-top: 2px;
}
.wrap-searching {
  border-radius: 8px;
  background: #fff;
  padding: 8px;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
}

.avia-tickets .el-collapse-item__header.is-active {
  border-radius: 12px 12px 0 0;
}

.avia-tickets .el-collapse-item__wrap {
  border-radius: 0 0 12px 12px;
}

.avia-tickets .el-collapse-item__header {
  border-radius: 12px;
}

@media screen and (max-width: 768px) {
  .avia-tickets .line {
    width: 100% !important;
  }

  .avia-tickets .icon-wrap {
    width: auto;
  }

  .avia-tickets .el-collapse-item__arrow {
    display: none !important;
  }
}
</style>
