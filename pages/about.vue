<template>
  <div>
    <UIHeader> {{ $t('592') }} </UIHeader>
    <img src="/images/logo.jpg" alt="banner" class="mb-3 min-h-[100px]" />
    <div class="container mt-5">
      <ul class="px-[32px] bg-white rounded-lg">
        <li class="py-4 border-b-[1px]">
          <NuxtLinkLocale
            to="/police"
            exact-active-class="rounded"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <!--              <i :class="item.ico"></i>-->
              <p>{{ $t('716') }}</p>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#111827"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NuxtLinkLocale>
        </li>
        <li class="py-4 border-b-[1px]">
          <NuxtLinkLocale
            to="/publicoffer"
            exact-active-class="rounded"
            class="flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <!--              <i :class="item.ico"></i>-->
              <p>{{ $t('282') }}</p>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="#111827"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NuxtLinkLocale>
        </li>
      </ul>

      <div class="bg-white w-full my-8 p-4 rounded-md">
        <div class="flex flex-col gap-3 items-center justify-center">
          <h3 class="text-base text-center">Asialuxe Travel</h3>
          <p class="text-sm leading-[1.55] !font-light">
            Asialuxe Travel — крупнейший туроператор Узбекистана, предлагающий
            высококачественные услуги как для выездного, так и въездного
            туризма. Мы стремимся сделать каждое путешествие незабываемым и
            уникальным, предоставляя клиентам разнообразные возможности и
            высокий уровень сервиса.
          </p>
          <b> Услуги выездного туризма </b>
          <p class="text-sm leading-[1.55] !font-light">
            Asialuxe Travel предлагает широкий спектр услуг для путешествий по
            всему миру. Клиенты могут выбрать туры в популярные туристические
            направления, включая Европу, Азию, Америку, Африку и Австралию.
            Компания предоставляет полный пакет услуг, включая бронирование
            авиабилетов, отелей, трансферов, экскурсий и туристических
            страховок. Благодаря партнерским отношениям с ведущими
            авиакомпаниями, гостиничными сетями и туристическими агентствами,
            Asialuxe Travel гарантирует своим клиентам комфорт и безопасность на
            каждом этапе путешествия.
          </p>
          <b>Чартерные рейсы</b>
          <p class="text-sm leading-[1.55] !font-light">
            Asialuxe Travel организует чартерные рейсы по востребованным
            направлениям, включая Турцию, Болгарию, Чехию, Мальдивы, Вьетнам и
            Саудовскую Аравию. Эти рейсы позволяют клиентам путешествовать с
            удобством и по более выгодным ценам, избегая излишней суеты,
            связанной с регулярными рейсами.
          </p>
          <b>Услуги въездного туризма</b>
          <p class="text-sm leading-[1.55] !font-light">
            Asialuxe Travel также специализируется на въездном туризме,
            предоставляя услуги путешественникам, желающим открыть для себя
            Узбекистан и страны Центральной Азии. Компания предлагает
            разнообразные туры, включающие культурные, исторические,
            гастрономические и приключенческие маршруты. Ведущие гиды и
            экскурсоводы Asialuxe Travel обеспечивают высокий уровень
            обслуживания и индивидуальный подход к каждому гостю, знакомя их с
            богатым культурным наследием и природными красотами региона.
          </p>
          <p class="text-sm leading-[1.55] !font-light">
            Наше официальное приложение в Apple Store:
            <a
              href="https://apps.apple.com/us/app/asialuxe-travel/id1557116939"
              target="_blank"
              class="text-blue"
              >https://apps.apple.com/us/app/asialuxe-travel/id1557116939</a
            >
          </p>
        </div>
      </div>
      <div
        class="w-full mb-8 rounded drop-shadow-md"
        style="overflow: hidden; height: 280px"
      >
        <iframe
          src="https://yandex.uz/map-widget/v1/?ll=69.283399%2C41.298707&mode=whatshere&whatshere%5Bpoint%5D=69.283438%2C41.298260&whatshere%5Bzoom%5D=17&z=18.12"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen="true"
        ></iframe>
      </div>
      <div class="grid grid-cols-12 gap-3">
        <div
          class="md:col-span-8 col-span-12 mb-3 rounded bg-white p-3 grid drop-shadow-md"
        >
          <h3 class="text-base">{{ $t('36') }} ООО «ASIALUXE TRAVEL»</h3>
          <div class="grid grid-cols-12 gap-3">
            <div class="md:col-span-4 col-span-6 text-sm">
              <span class="block mb-3"
                ><span class="text-[#0073FF]">{{ $t('30') }}:</span>
                {{ $t('660') }}</span
              >
              <span class="block mb-3"
                ><span class="text-[#0073FF]">{{ $t('132') }}:</span> 305 855
                245</span
              >
              <span class="block mb-3"
                ><span class="text-[#0073FF]">{{ $t('606') }}:</span>
                {{ $t('661') }}</span
              >
            </div>
            <div class="md:col-span-4 col-span-6 text-sm">
              <span class="block mb-3"
                ><span class="text-[#0073FF]">{{ $t('658') }}:</span> 2020 8000
                6009 4291 8001</span
              >
              <span class="block mb-3"
                ><span class="text-[#0073FF]">{{ $t('659') }}:</span> 2020 8840
                8009 4291 8001</span
              >
            </div>
            <div class="md:col-span-4 col-span-6 text-sm">
              <a href="tel:998712017777"
                ><span class="text-[#0073FF]">{{ $t('329') }}..:</span> +998 71
                201-77-77</a
              >
              <br />
              <a href="mailto:nbound@asialuxe.uz"
                ><span class="text-[#0073FF]">Е-mail:</span> info@asialuxe.uz</a
              >
            </div>
          </div>
        </div>
        <div
          class="md:col-span-4 col-span-12 mb-3 rounded bg-white p-3 grid drop-shadow-md"
        >
          <div style="max-height: 200px; overflow: hidden">
            <h3 class="">{{ $t('662') }}</h3>
            <a target="_blank" href="/images/about/certificate.jpg">
              <img
                src="/images/about/certificate.jpg"
                alt="img"
                style="max-width: 100%"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t, locale } = useI18n()
const links = [
  {
    label: t('79'),
    icon: 'i-heroicons-home',
    to: `/${locale.value}`,
  },
  {
    label: t('592'),
    icon: '',
  },
]
useSeoMeta({
  title: t('592'),
  ogTitle: t('592'),
  description:
    ' Asialuxe Travel — крупнейший туроператор Узбекистана, предлагающий\n' +
    '          высококачественные услуги как для выездного, так и въездного туризма.\n' +
    '          Мы стремимся сделать каждое путешествие незабываемым и уникальным,\n' +
    '          предоставляя клиентам разнообразные возможности и высокий уровень\n' +
    '          сервиса.',
  ogDescription:
    ' Asialuxe Travel — крупнейший туроператор Узбекистана, предлагающий\n' +
    '          высококачественные услуги как для выездного, так и въездного туризма.\n' +
    '          Мы стремимся сделать каждое путешествие незабываемым и уникальным,\n' +
    '          предоставляя клиентам разнообразные возможности и высокий уровень\n' +
    '          сервиса.',
})
</script>
