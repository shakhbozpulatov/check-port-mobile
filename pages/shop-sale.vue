<template>
  <div class="container mt-4">
    <UBreadcrumb :links="links" class="mb-4" />
    <!--    <NuxtLink-->
    <!--      to="/"-->
    <!--      class="dark:text-white-100 dark:bg-dark-700 mb-3 block w-max bg-white rounded shadow p-3"-->
    <!--    >-->
    <!--      <i-->
    <!--        class="fa-regular fa-arrow-left me-2 dark:text-white-100 text-[#0073FF]"-->
    <!--      ></i>-->
    <!--      {{ $t('172') }}-->
    <!--    </NuxtLink>-->
    <div class="p-3 bg-white rounded shadow">
      <img
        class="rounded shadow mb-3 w-full"
        :src="
          width > 576
            ? lang === 'uz'
              ? '/images/banners/shop_sale_uz.webp'
              : '/images/banners/shop_sale_ru.webp'
            : lang === 'uz'
              ? '/images/banners/shop_sale_uz_mob.jpg'
              : '/images/banners/shop_sale_ru_mob.jpg'
        "
        alt="img"
      />
      <div v-if="lang === 'uz'">
        <h4 class="h4 !font-normal">Hurmatli sayohatchilar!</h4>
        <p>
          13-iyundan 13-avgustga qadar “Asialuxe Travel” kompaniyasining
          aksiyasida qatnashing va keyingi sayohatingizga chegirma oling.
        </p>
        <br />
        <b class="block mb-2">
          Aksiyada ishtirok etish uchun quyidagi shartlarni bajarish lozim:
        </b>
        <ul>
          <li>
            1. Bor-yoʻgʻi bir necha daqiqa vaqtingizni oladigan soʻrovnomamizdan
            oʻting:
            <a
              href="https://forms.gle/PB3hTWqdzgUUCFnDA"
              target="_blank"
              class="!text-[#0073FF]"
              >https://forms.gle/PB3hTWqdzgUUCFnDA</a
            >
          </li>
          <li>
            2. Soʻrovnoma yakunida Telegram messenjeridagi telefon raqamingiz
            yoki elektron manzilingizni yozib qoldiring.
          </li>
          <br />
          <li>
            Bizning rivojlanishimizdagi ishtirokingiz va yordamingiz uchun
            tashakkur! Sizga Asialuxe Travel bilan qiziqarli va qulay sayohatlar
            tilaymiz!
          </li>
        </ul>
        <br />
        <el-collapse v-model="accordion" accordion>
          <el-collapse-item name="1" class="border-b">
            <template #title>
              <b class="text-[16px]">Siz nima olasiz?</b>
            </template>
            <div class="pb-3">
              So‘rovnoma tugagandan so‘ng, biz sizga Telegram yoki elektron
              pochta orqali keyingi sayohatingiz uchun 5% chegirma Sertifikatini
              yuboramiz.
            </div>
          </el-collapse-item>
          <el-collapse-item name="2" class="border-b">
            <template #title>
              <b class="text-[16px]">Chegirmadan qanday foydalanish kerak?</b>
            </template>
            <div class="pb-3">
              Sayohat chegirmasi uchun asialuxe.uz saytidan yoki ilova orqali
              ro‘yxatdan o‘ting, istalgan mamlakatga kerakli turpaketni tanlang
              va sharhlarda sertifikat raqamini ko‘rsating.
              <p>Misol: 3161- 5%-aksiya</p>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template #title>
              <b class="text-[16px]">Aksiya qoidalari</b>
            </template>
            <div class="pb-3">
              <a
                target="_blank"
                href="/docs/sale-rule.docx"
                class="!text-[#0073FF]"
                >Faylni ko'chirish</a
              >
            </div>
          </el-collapse-item>
        </el-collapse>
        <br />
        <p>
          Ilovani yuklab oling va o‘rnating:
          <NuxtLinkLocale
            to="/download-app"
            target="_blank"
            class="!text-[#0073FF]"
            >http://asialuxe.uz/download-app</NuxtLinkLocale
          >
        </p>
        <br />
        <p>Aksiya 13.06.2024 dan 13.08.2024 gacha amal qiladi.</p>
      </div>
      <div v-else>
        <h4 class="h4 !font-normal">Уважаемые путешественники!</h4>
        <p>
          С 13 июня по 13 августа 2024 года участвуйте в Акции от Asialuxe
          Travel и получите Скидку на следующее Путешествие!
        </p>
        <br />
        <b class="block mb-2">
          Для участия в акции достаточно выполнить одно из следующих действий:
        </b>
        <ul>
          <li>
            1. Пройдите наш короткий опрос
            <a
              href="https://forms.gle/PB3hTWqdzgUUCFnDA"
              target="_blank"
              class="!text-[#0073FF]"
              >https://forms.gle/PB3hTWqdzgUUCFnDA</a
            >
            который займет всего пару минут вашего времени.
          </li>
          <li>
            2. В конце опроса оставьте свой номер в Telegram или электронную
            почту.
          </li>
          <br />
          <li>
            Благодарим за ваше участие и помощь в нашем развитии! Желаем вам
            увлекательных и комфортных поездок с Asialuxe Travel!
          </li>
        </ul>
        <br />
        <el-collapse v-model="accordion2" accordion class="!border-t-0">
          <el-collapse-item name="1" class="border-b">
            <template #title>
              <b class="text-[16px]">Что вы получите?</b>
            </template>
            <div class="pb-3">
              После завершения опроса мы отправим вам сертификат с 5% скидкой на
              ваше следующее бронирование на ваш номер в Telegram или e-mail
            </div>
          </el-collapse-item>
          <el-collapse-item name="2" class="border-b">
            <template #title>
              <b class="text-[16px]">Как использовать скидку?</b>
            </template>
            <div class="pb-3">
              Для получения скидки на путешествие зарегистрируйтесь на сайте или
              в приложении asialuxe.uz, выберите желаемый турпакет в любую
              страну и укажите номер сертификата в комментариях.
              <p>Пример: 3161 - по акции 5%</p>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template #title>
              <b class="text-[16px]">Правила Акции</b>
            </template>
            <div class="pb-3">
              <a
                target="_blank"
                href="/docs/sale-rule.docx"
                class="!text-[#0073FF]"
                >Скачать файл</a
              >
            </div>
          </el-collapse-item>
        </el-collapse>
        <br />
        <p>
          Скачайте и установите приложение по
          <NuxtLinkLocale
            to="/download-app"
            target="_blank"
            class="!text-[#0073FF]"
            >ссылке</NuxtLinkLocale
          >
        </p>
        <br />
        <p>Акция действует с 13.06.2024 по 13.08.2024.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const { width } = useWindowSize()
const accordion = ref('')
const accordion2 = ref('')

const lang = useCookie('i18n_redirect')
const { t, locale } = useI18n()

const links = [
  {
    label: t('79'),
    icon: 'i-heroicons-home',
    to: `/${locale.value}`,
  },
  {
    label: t('683'),
    icon: '',
  },
]
useSeoMeta({
  title: t('683'),
  ogTitle: t('683'),
  description: t('683'),
  ogDescription: t('683'),
})
</script>
<style scoped lang="scss"></style>
