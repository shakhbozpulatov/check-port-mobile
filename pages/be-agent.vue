<template>
  <div>
    <UIHeader> Как стать агентом </UIHeader>
    <div class="container mt-20">
      <div class="p-3 bg-white rounded shadow">
        <div v-if="locale === 'uz'">
          <h2 class="h2">Qanday qilib agent bo'lish mumkin</h2>
          <b
            >Agentlik bitimini rasmiylashtirish uchun quyidagi hujjatlarni
            taqdim etish zarur:</b
          >
          <p>1. Kompaniya haqida maʼlumotnoma (sertifikat);</p>
          <p>2. Turistik xizmatlarni taqdim etish uchun litsenziya;</p>
          <p>3. Kompaniya muhri;</p>
          <p>4. Kompaniya direktori pasportining nusxasi.</p>
          <br />
          <p>
            Bitimni direktorning oʻzi yoki direktordan tasdiqlovchi xatga ega
            vakil imzolashi mumkin.
          </p>
          <p>
            Bitimni onlayn tarzda
            <a class="!text-[#0073FF]" href="https://didox.uz" target="_blank"
              >https://didox.uz</a
            >
            saytida rasmiylashtirish mumkin.
          </p>
          <br />
          <b
            >Agentlik bitimini tuzish shartlari quyidagi bandlarni o‘z ichiga
            oladi:
          </b>
          <p>
            - Sayyohlik agentligining elektron pochtasi doimiy ravishda, onlayn
            rejimda, ya’ni “Unblock” holatida bo‘lishi kerak.
          </p>
          <p>
            - Korporativ mobil raqamlar doimiy ish holatida bo‘lishi va siz
            aloqa uchun kamida 2 raqamni ko‘rsatishingiz kerak. Xodim ishdan
            bo‘shatilgan yoki ishda bo‘lmagan holatlarda, mehnat ta’tilida yoki
            ishga layoqatsizlik holati yuzasidan davolanish ta’tiliga chiqqan
            paytda ham, kompaniya ofisining aloqa raqami doimiy onlayn rejimida
            bo‘lishi kerak.
          </p>
        </div>
        <div v-else>
          <h2 class="h2">Как стать агентом</h2>
          <b
            >Какие документы необходимы агентам для заключения договора с
            компанией:</b
          >
          <p>1. Сертификат компании.</p>
          <p>2. Лицензии на предоставление туристических услуг.</p>
          <p>3. Штамп компании.</p>
          <p>4. Скан паспорта директора компании.</p>
          <br />
          <p>
            Подписать соглашение имеет право либо директор, либо уполномоченный
            представитель, подтвержденный письмом от директора.
          </p>
          <p>
            Соглашение можно оформить онлайн на сайте [Didox.uz](
            <el-link
              class="!text-[#0073FF]"
              href="https://didox.uz"
              target="_blank"
              >https://didox.uz</el-link
            >).
          </p>
          <br />
          <b
            >Условия заключения агентского соглашения включают следующие пункты:
          </b>
          <p>
            - Электронная почта туристического агентства должна быть в рабочем
            состоянии постоянно, в режиме онлайн, то есть в состоянии “Unblock”.
          </p>
          <p>
            - Корпоративные мобильные номера должны быть постоянно в рабочем
            состоянии. Для связи необходимо указать как минимум 2 номера. В
            случае увольнения, отсутствия на работе, отпуска или больничного
            сотрудника фирмы, контактный номер офиса должен быть всегда в онлайн
            режиме компании.
          </p>
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
    label: t('718'),
    icon: '',
  },
]
useSeoMeta({
  title: t('748'),
  ogTitle: t('748'),
  description:
    'Какие документы необходимы агентам для заключения договора с компанией:',
  ogDescription:
    'Какие документы необходимы агентам для заключения договора с компанией:',
})
</script>
