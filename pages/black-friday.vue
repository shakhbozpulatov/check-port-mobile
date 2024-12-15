<template>
  <div class="flex flex-col gap-3">
    <div class="bg-white shadow rounded-2xl p-4">
      <img
        :src="
          locale === 'uz'
            ? '/images/banners/black_friday_desc_uz.jpg'
            : '/images/banners/black_friday_desc_ru.jpg'
        "
        alt="banner"
        class="rounded-lg"
      />
      <div class="mt-4">
        <template v-if="locale === 'uz'">
          <h3 class="h3 font-black">
            Asialuxe Travel”dan BLACK FRIDAY aksiyasi
          </h3>
          <p>
            21-noyabrdan 4-dekabrgacha aksiyamizda ishtirok eting va dunyo
            boʻylab mehmonxonalarni 75% gacha bo'lgan chegirmalar bilan band
            qiling!
          </p>
          <br />
          <b>Siz nimalarga ega boʻlasiz?</b>
          <p>
            Mashhur yoʻnalishlardagi yashash joylariga 75% gacha chegirmalar:
          </p>
          <ul>
            <li>- Maldiv</li>
            <li>- Parij</li>
            <li>- Avstraliya</li>
            <li>- Dubay</li>
            <li>- Pxuket</li>
            <li>- AQSH va boshqa koʻplab mamlakatlar</li>
          </ul>
          <br />
          <b>Band qilish muddati:</b>
          <p>2024-yil, 21-noyabrdan 4-dekabrgacha</p>
          <br />
          <b>Yashash muddati:</b>
          <p>2024-yil, 21-noyabrdan 2025-yil, 31-dekabrgacha</p>
          <br />
          <b>Qanday ishtirok etish mumkin?</b>
          <ul>
            <li>
              - asialuxe.uz saytimizga yoki “Asialuxe Travel” ilovamizga kiring.
            </li>
            <li>- Aksiyadagi takliflar orasidan mehmonxonani tanlang.</li>
            <li>- Xonani band qiling va chegirmaga ega boʻling.</li>
            <br />
            <br />
            <p>
              Aloqa markazi: <a href="tel:1111" class="text-[#0073ff]">1111</a>
            </p>
            <p>
              Tez band qilish:
              <a
                href="https://t.me/Asialuxe_appbot/miniapp"
                class="text-[#0073ff]"
                >https://t.me/Asialuxe_appbot/miniapp</a
              >
            </p>
            <p>
              Ilovani yuklab olish:
              <a
                href="https://asialuxe.uz/ru/download-app"
                class="text-[#0073ff]"
                >https://asialuxe.uz/ru/download-app</a
              >
            </p>
            <b>Qachon, hozir boʻlmasa?!</b>
          </ul>
        </template>
        <template v-else>
          <h3 class="h3 font-black">BLACK FRIDAY от Asialuxe Travel</h3>
          <p>
            С 21 ноября по 4 декабря 2024 года участвуйте в нашей акции и
            бронируйте отели по всему миру со скидками до 75%!
          </p>
          <br />
          <b>Что вы получаете?</b>
          <p>Скидки до 75% на проживание в популярных направлениях:</p>
          <ul>
            <li>- Мальдивы</li>
            <li>- Париж</li>
            <li>- Австралия</li>
            <li>- Дубай</li>
            <li>- Пхукет</li>
            <li>- США и многие другие страны!</li>
          </ul>
          <br />
          <b>Период бронирования:</b>
          <p>С 21 ноября по 4 декабря 2024 года</p>
          <br />
          <b>Период проживания:</b>
          <p>С 21 ноября 2024 года по 31 декабря 2025 года</p>
          <br />
          <b>Как принять участие?</b>
          <ul>
            <li>
              - Зайдите на наш сайт asialuxe.uz или в приложение Asialuxe Travel
            </li>
            <li>- Выберите отель из списка акционных предложений.</li>
            <li>- Забронируйте номер и получите скидку!</li>
            <br />
            <br />
            <p>
              Круглосуточная поддержка:
              <a href="tel:1111" class="text-[#0073ff]">1111</a>
            </p>
            <p>
              Быстрое бронирование: через Telegram-бота
              <a
                href="https://t.me/Asialuxe_appbot/miniapp"
                class="text-[#0073ff]"
                >https://t.me/Asialuxe_appbot/miniapp</a
              >
            </p>
            <p>
              Скачать приложение:
              <a
                href="https://asialuxe.uz/ru/download-app"
                class="text-[#0073ff]"
                >https://asialuxe.uz/ru/download-app</a
              >
            </p>
            <b>Когда, если не сейчас?!</b>
          </ul>
        </template>
      </div>
    </div>
    <div class="bg-white shadow rounded-2xl p-4">
      <p class="text-[18px] font-bold !mb-3">{{ $t('856') }}</p>
      <LazySlidersCHotelDiscount />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
</script>

<style scoped lang="scss"></style>
