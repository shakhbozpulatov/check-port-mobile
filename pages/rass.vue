<template>
  <div class="container mt-4">
    <UBreadcrumb :links="links" class="mb-4" />
    <div class="p-3 bg-white rounded shadow">
      <img
        class="rounded shadow mb-3"
        :src="
          locale === 'uz'
            ? '/images/slider_banner/flight_desc_ru.webp'
            : '/images/slider_banner/flight_desc_ru.webp'
        "
        alt="img"
      />
      <div v-if="locale === 'uz'">
        <h2 class="h2">To'lov haqida ma'lumot</h2>
        <p>
          Asialuxe Travel bilan hamkorlikda Ipoteka bank OTP Group sizga butun
          dunyo bo‘ylab sayohat qilish uchun bo‘lib to‘lash uchun ajoyib
          dasturni taklif qiladi.
        </p>
        <br />
        <p>Taqdim etish shartlari:</p>
        <p>- Foizlar yoki yashirin to‘lovlarsiz.</p>
        <p>- Moslashuvchan bo‘lib to‘lash muddati 3 oydan 6 oygacha.</p>
        <p>- Garov yoki qo‘shimcha sug‘urta talab qilinmaydi.</p>
        <p>- So‘nggi 6 oy ichida barqaror daromadga ega bo‘lish kifoya.</p>
        <p>
          - Bo‘lib to‘lashning maksimal miqdori 51 million so‘mni tashkil etadi.
        </p>
        <br />
        <p>
          To‘lovni amalga oshirish uchun pasportingizni yoki ID kartangizni
          “Asialuxe Travel”ning istalgan filialida ko‘rsating, sizni qiziqtirgan
          yo‘nalishni tanlang (shu jumladan Umra ziyoratgohi) va bitta tashrif
          bilan to‘lovni amalga oshiring.
        </p>
        <br />
        <p>
          Sayohat orzularingiz osonlik va qulaylik bilan haqiqatga aylansin!
        </p>
        <br />
        <p>
          Batafsil:
          <a
            href="https://www.ipotekabank.uz/"
            target="_blank"
            class="text-[#0073FF] me-2"
            >https://www.ipotekabank.uz/</a
          >
          <span
            >Tel:
            <a href="tel:+998781501122" target="_blank" class="text-[#0073FF]"
              >+998781501122</a
            ></span
          >
        </p>
      </div>
      <div v-else>
        <h2 class="h2">Информация о рассрочке</h2>
        <p>
          Asialuxe Travel в партнерстве с Ипотека банк OTP Group рад предложить
          вам уникальную программу рассрочки на путешествия по всему миру.
        </p>
        <br />
        <b> Условия предоставления: </b>
        <p>- Никаких процентов или скрытых платежей.</p>
        <p>- Гибкий срок рассрочки от 3 до 6 месяцев.</p>
        <p>
          - Не требуется предоставление залогов или дополнительных страховок.
        </p>
        <p>- Достаточно иметь стабильный доход за последние 6 месяцев.</p>
        <p>- Максимальная сумма рассрочки - 51 миллион сум.</p>
        <br />
        <p>
          Для оформления рассрочки просто предъявите ваш паспорт или ID-карту в
          любом филиале Asialuxe Travel, выберите интересующее вас направление
          (включая паломничество в Умру) и оформите рассрочку за один визит.
        </p>
        <br />
        <p>
          Пусть ваши мечты о путешествиях станут реальностью с легкостью и
          комфортом!
        </p>
        <p>
          Подробно:
          <a
            href="https://www.ipotekabank.uz/"
            target="_blank"
            class="text-[#0073FF] me-2"
            >https://www.ipotekabank.uz/</a
          >
          <span
            >Тел:
            <a href="tel:+998781501122" target="_blank" class="text-[#0073FF]"
              >+998781501122</a
            ></span
          >
        </p>
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
    label:
      locale.value === 'uz'
        ? "To'lov haqida ma'lumot"
        : 'Информация о рассрочке',
    icon: '',
  },
]

useSeoMeta({
  title: t('754'),
  ogTitle: t('754'),
  description: t('755'),
  ogDescription: t('755'),
})
</script>
<style scoped lang="scss"></style>
