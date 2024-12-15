<template>
  <div class="container mt-4">
    <UBreadcrumb :links="links" class="mb-4" />
    <div class="p-3 bg-white rounded shadow">
      <NuxtImg
        format="webp"
        src="https://www.uzairways.com/sites/default/files/inline-images/Canada.png"
        alt="img"
        class="mb-3 object-cover w-full h-[400px] rounded"
      />
      <div v-if="locale === 'uz'">
        <h3 class="h3">Yo‘lovchi tashish qoidalari</h3>
        <p>
          Eslatib o‘tamiz, 2017-yil 16-avgustdagi PF-5156-son farmonning
          3-bandiga muvofiq, O‘zbekiston Respublikasi fuqarosining amaldagi
          biometrik pasporti ("yashil pasport") O‘zbekistondan chiqib ketish
          uchun faqat 2021-yil 1-yanvargacha amal qiladi. Yuqoridagi sanadan
          boshlab mamlakatdan chiqish faqat yangi turdagi xorijga chiqish
          biometrik pasport ("qizil pasport") bilan amalga oshiriladi.
        </p>
        <br />
        <p>
          Biroq, siz "yashil pasport" bilan uning amal qilish muddati tugagunga
          qadar O‘zbekiston bo‘ylab sayohat qilishingiz hamda O‘zbekiston
          hududiga kirishingiz mumkin.
        </p>
        <br />
        <hr class="my-3" />
        <p>
          Yoʻlovchilarni roʻyxatdan oʻtkazish va bagajni rasmiylashtirish
          aeroportlardagi roʻyxatdan oʻtkazish ustunchalarida yoki tashuvchi
          tomonidan koʻrsatilgan boshqa joyda amalga oshiriladi va
        </p>
        <p>
          Boeing-757/767/787, A320 samolyotlarida roʻyxatdan oʻtkazish qatnov
          joʻnashidan 3 soat avval boshlanadi
        </p>
        <h3 class="h3">Hurmatli yoʻlovchilar!</h3>
        <p>
          Shuni ma’lum qilamizki, 2018-yilning 1-aprelidan boshlab “Uzbekistan
          airways” AJning Sankt-Peterburgdan qatnovlariga roʻyxatdan oʻtish
          vaqti qatnov joʻnashidan 3 soatu 30 daqiqa oldin boshlanadi va qatnov
          joʻnashiga 1 soat qolganda roʻyxatdan oʻtish tugatiladi.
        </p>
        <p>
          Blagoveshensk shahri aeroportidan aviachiptada ko‘rsatilgan jo‘nash
          vaqtidan 5 soat oldin.
        </p>
        <p>
          Samolyot sahniga oʻtqazish qatnov joʻnashidan 1 soat oldin boshlanadi
          va uchib ketishdan 20 daqiqa oldin tugatiladi.
        </p>
        <p>
          Xalqaro qatnovlarda chiptani roʻyxatdan oʻtkazish va bagajni
          rasmiylashtirish aviachiptada koʻrsatilgan joʻnash vaqtidan 40 daqiqa
          oldin tugatiladi.
        </p>
        <p>
          Xorijiy aeroportlarda roʻyxatdan oʻtkazish qatnov joʻnashidan 40
          daqiqa oldin tugatiladi. Quyidagi shaharlar aeroportlari bundan
          mustasno: Toshkent, Ankara, Moskva (Vnukovo), Myunxen, Dehli,
          Kuala-Lumpur, London (Heatrow va Gatwick), Milan, Nyu-York, Rim, Seul,
          Istanbul, Tel-Aviv, Frankfurt, Sharja, Dubay, Bangkok, Pekin, Nyachang
          aeroportlaridan uchib ketadigan MAK qatnovlarida yoʻlovchilarni
          roʻyxatdan oʻtkazish va bagajni rasmiylashtirish qatnov joʻnashidan 1
          soat oldin.
        </p>
        <p>
          Blagoveshensk shahri aeroportidan aviachiptada ko‘rsatilgan jo‘nash
          vaqtidan 2 soat oldin.
        </p>
        <p>
          Milliy aviakompaniyaning ichki qatnovlarida aviabiletlarni ro‘yxatga
          olish va bagajni rasmiylashtirish:
        </p>
        <p>
          O‘zbekiston Respublikasining barcha aeroportlarida – aviabiletda
          ko‘rsatilgan jo‘nab ketish vaqtidan 30 daqiqa oldin tugaydi.
        </p>
        <p>
          Roʻyxatdan oʻtish tugatilgandan soʻng yetib kelgan yoʻlovchi qatnovga
          qoʻyilmaydi.
        </p>
        <p>
          Chiptada ko‘rsatilgan uchish vaqtidan 1 soat oldin tugatiladigan
          ro‘yxatdan o‘tish vaqtiga kechikib kelgan yo‘lovchi mazkur qatnovda
          tashuvga qo‘yilmaydi.
        </p>
      </div>
      <div v-else-if="locale === 'en'">
        <h3 class="h3">Passengers carrier rules</h3>
        <p>
          Check-in and baggage check-in is done at check-in counters at airports
          or other points specified by the carrier.
        </p>
        <br />
        <p>
          3 hours before the depart for the aircrafts - Boeing-767, Boeing-757,
          А-320;
        </p>
        <br />
        <p>
          Passengers reported late for check-in which is completed 1 hour before
          departure time shown in the ticket will be denied boarding the flight.
        </p>
        <br />
        <p>
          At the international airports the time for finishing the check-in is
          usually equal to 1 hour, with the exception of the airports in the
          cities of Tashkent, Moscow (Vnukuvo), Delhi, Kuala Lumpur, London
          (Heatrow and Gatwick), Milan, Rome, Seoul, Frankfurt, Istanbul,
          Tel-Aviv, New York, Sharjah, Dubai, Bangkok, Munich, Ankara, Nha Trang
          and Beijing where, according to the conditions of the airport of
          departure, the check-in for the flights of Uzbekistan Airways ends 1
          hour before the departure time, mentioned in the ticket.
        </p>
        <p>
          Ticket registration and baggage claim on domestic flights of the NAC
          ends:
        </p>
        <p>
          at all airports of the Republic of Uzbekistan - 30 minutes before the
          departure time indicated on the ticket.
        </p>
      </div>
      <div v-else>
        <h3 class="h3">Общие положения</h3>
        <p>
          Напоминаем, что согласно п.3 УП-5156 от 16.08.2017 г. действующий
          биометрический паспорт гражданина Республики Узбекистан («зелёный
          паспорт») является действительным для выезда из Узбекистана только до
          1 января 2021г. Начиная с вышеуказанной даты выезд из страны возможен
          только по биометрическому загранпаспорту нового образца («красный
          паспорт»).
        </p>
        <br />
        <p>
          В то же время, Вы можете совершать поездки внутри Узбекистана, а также
          въехать в Узбекистан по «зелёному паспорту» до истечения его срока
          действия.
        </p>
        <hr class="my-3" />
        <p>
          Регистрация пассажиров и оформление багажа производится на стойках
          регистрации в аэропортах или иных пунктах, указанных перевозчиком.
        </p>
        <h3 class="h3">
          Время начала регистрации на рейсы Uzbekistan Airways:
        </h3>
        <ul class="list-disc pl-4">
          <li>За 3 часа до времени отправления, указанного в авиабилете;</li>
          <li>
            За 3 часа 30 минут до времени отправления, указанного в авиабилете,
            из Международного аэропорта «Пулково» (Санкт-Петербург);
          </li>
          <li>
            Начало регистрации в аэропорту Хабаровск за 3,5 часа до вылета
            рейса, окончание регистрации за 1 час до вылета рейса;
          </li>
          <li>
            За 5 часов до времени отправления, указанного в авиабилете, из
            аэропорта города Благовещенск.
          </li>
        </ul>
        <br />
        <h3 class="h3">
          Время окончания регистрации на рейсы Uzbekistan Airways:
        </h3>
        <ul class="list-disc pl-4">
          <li>
            За 30 минут до времени отправления, указанного в авиабилете на все
            внутриреспубликанские рейсы;
          </li>
          <li>
            За 1 час до времени отправления, указанного в авиабилете, из
            аэропортов городов Ташкент, Анкара, Москва (Внуково),
            Санкт-Петербург, Дели, Куала-Лумпур, Лондон (Хитроу и Гатвик),
            Милан, Мюнхен, Рим, Франкфурт, Стамбул, Тель-Авив, Нью-Йорк, Шарджа,
            Дубай, Бангкок, Пекин, Нянчанг и Сеул;
          </li>
          <li>
            За 2 часа до времени отправления, указанного в авиабилете, из
            аэропорта города Благовещенск.
          </li>
        </ul>
        <br />
        <p>
          Посадка на борт рейсов Uzbekistan Airways начинается за 1 час и
          заканчивается за 20 минут до вылета рейса. В случаях прибытия на
          посадку с опозданием, авиакомпания имеет право отстранить пассажира от
          полета.
        </p>
      </div>
      <img
        src="https://www.uzairways.com/sites/default/files/inline-images/op.jpg"
        alt="img"
        class="my-3 object-cover w-full aspect-video !h-[400px] rounded object-center md:object-[20%_50%]"
      />
      <UAccordion variant="solid" size="lg" :items="items">
        <template #uz-1>
          <ul class="list-disc pl-4 text-[16px]">
            <li>
              agar bu parvozlar xavfsizligi va yo‘lovchilar salomatligi uchun
              zarur bo‘lsa;
            </li>
            <li>
              tashuvlar uning hududida, hududidan yoki hududi orqali amalga
              oshirilayotgan har
            </li>
            <li>
              qanday mamlakat davlat organlarining tegishli qonunlari,
              qarorlari, qoidalari va
            </li>
            <li>farmoyishlari buzilishining oldini olish maqsadida;</li>
            <li>
              yo‘lovchi Tashuvchi qoidalari, yo‘riqnomalari va ko‘rsatmalarining
            </li>
            <li>talablarini bajarishni rad etishi munosabati bilan;</li>
            <li>
              yo‘lovchining bemorligi tufayli, agar uning salomatligi o‘zi va
              atrofidagilar uchun
            </li>
            <li>xavf tug‘dirgan taqdirda;</li>
            <li>
              agar yo‘lovchi noto‘g‘ri rasmiylashtirgan hujjatlarga ega bo‘lsa.
            </li>
          </ul>
          <h5 class="h5">Shuningdek:</h5>
          <ul class="list-disc pl-4 text-[16px]">
            <li>
              xavf tug‘diruvchi yoki boshqa shaxslar va ularning mulkiga zarar
              keltiririshi
            </li>
            <li>mumkin bo‘lgan shaxslarga;</li>
            <li>
              mast holdagi yoki narkotik modda iste’mol qilgan yo‘lovchiga;
            </li>
            <li>
              hatti-harakati bilan aviatransportdan foydalanishning belgilangan
              qoidalarini
            </li>
            <li>buzayotgan yo‘lovchiga.</li>
            <li>
              Shu bilan bir qatorda, ayrim hollarda, yo‘lovchiga Tashuvchining
              aybi bilan band qilingan qatnovda tashish rad etilgan chog‘da,
              oxirgi bo‘lib qo‘shimcha xizmatlar ko‘rsatilishi yoki belgilangan
              me’yorlar bo‘yicha tovon to‘lanishi mumkin.
            </li>
          </ul>
          <p class="text-[16px]">
            Chipta unda ko‘rsatilgan parvoz va sana uchun hamda chipta kimning
            nomiga rasmiylashtirilgan bo‘lsa, o‘sha shaxsga yaroqlidir.
            Tashuvning foydalanilmagan qismi uchun to‘la yoxud qisman pul, agar
            tashuv hech qaysi qismda bajarilmagan, yoki parvoz qilingan kundan
            tashuvning birinchi qismida bajarilmagan bo‘lsa (agar Tariflarni
            qo‘llash qoidalarida boshqa narsa ko‘zda tutilmagan bo‘lsa), chipta
            berilgan sanadan boshlab bir yil mobaynida chipta xarid qilingan
            joydan to‘lanadi.
          </p>
        </template>
        <template #uz-2>
          <p class="text-[16px]">
            Aviachiptani sotib olishda yoki unda ko‘rsatilgan tashuv shartlari
            (qatnovi, xizmat korsatish darajasi, parvoz qilish sanasi va sh.k.)
            o‘zgargan chog‘da, qo‘llanilgan tarif shartlari haqida tashuvchi
            yoki uning agenti bilan maslahatlashib oling. Bu tavsiyani
            bajarmaslik tarifning oshib ketishiga yoki qo‘shimcha xarajatlarga
            olib keladi. Ayrim hollarda parvozni rad etganligi yoki maxsus
            tariflar bilan rasmiylashtirilgan chiptalarda band qilinishini
            o‘zgartirilganligi uchun yig‘imlar qo‘llanadi.
          </p>
          <br />
          <p class="text-[16px]">
            Yo‘lovchi samolyot sahniga o‘z mas’uliyati ostida bepul tashiladigan
            bagaj me’yori hisobidan tashuvga qabul qilinadigan bagaj ( sumka va
            boshqalar)ni olishi mumkin. Bunday bagajning umumiy vazni 8 kg dan,
            hajmi tomonlarining uch o‘lchovi yig‘indisi 115 sm dan oshmasligi
            lozim.
          </p>
          <br />
          <p class="text-[16px]">
            Tashuvchi yo‘lovchiga bepul tashish me’yoridan ortiq bagajni
            chegaralash yoki uni qabul qilishni rad etishga haqqi bor. Agar
            yo‘lovchi oldindan band qilingan va haqqi to‘langan bagajdan ortiq
            miqdorda tashuvchiga taqdim etsa, bunday bagaj bo‘sh joy bo‘lgan va
            tegishli haqqi to‘langan taqdirda qabul qilinadi. Tashuvchi mo‘rt,
            qimmatbaho va tez buziladigan buyumlar uchun javobgar bo‘lmaydi.
            Pul, qimmatbaho narsalar va hujjatlarni yo‘lovchi bagajga
            topshirmasdan, o‘zi bilan birga olib ketishi shart.
          </p>
          <b class="text-[16px]">
            Sizni qiziqtiradigan barcha savollar yuzasidan Siz aviakompaniya
            vakolatxonalari va uning agentliklarida xabardor bo‘lishingiz
            mumkin.
          </b>
        </template>
        <template #en-1>
          <p class="text-[16px]">
            Boarding on all flights of the Uzbekistan Airways National airline
            ends 20 minutes prior to the departure time of the aircraft
            specified in the schedule. In cases of the late arrival at the
            boarding, the airline has the right to debar you from the flight.
          </p>
          <p class="text-[16px]">
            The passenger that is late for the end of check-in is not acceptable
            for the transportation.
          </p>
          <b class="text-[16px]"> The Carrier may deny boarding: </b>
          <ul class="list-disc pl-4 text-[16px]">
            <li>
              for the reasons of aviation safety and in the event of the threat
              to the health of other passengers;
            </li>
            <li>
              in order to prevent violence of appropriate laws, rules and
              regulations of governmental
            </li>
            <li>
              qanday mamlakat davlat organlarining tegishli qonunlari,
              qarorlari, qoidalari va
            </li>
            <li>
              bodies of any country in to, from or through the territory of
              which the carriage is being performed;
            </li>
            <li>
              if the passenger denies to comply with the rules, regulations and
              instructions of the Carrier;
            </li>
            <li>
              if the passenger is sick and his or her physical condition creates
              a threat to him/herself or to the health of other passengers;
            </li>
            <li>when a passenger has not properly issued documents.</li>
          </ul>
          <h5 class="h5">As well as:</h5>
          <ul class="list-disc pl-4 text-[16px]">
            <li>
              to persons creating a threat or being capable to cause damage to
              other passengers and their property;
            </li>
            <li>
              to drunk passengers or passengers in drug intoxication condition;
            </li>
            <li>
              to passengers whose actions violate general rules of
              transportation by air.
            </li>
          </ul>
          <p class="text-[16px]">
            However, in some cases when a passenger has been denied boarding to
            the pre-booked flight due to the Carrier’s fault, the latter may
            provide the passenger with extra services or redeem a fixed
            indemnity.
            <br />
            This ticket is good for carriage only for the indicated date and the
            person to whom the ticket was issued. Passengers are entitled to a
            full or partial refund of an amount for an unused part of the
            carriage, either at the place of purchase of the ticket within one
            year from the date on which the ticket has been issued if the
            carriage has not been performed in full or within one year from the
            date of departure in the first destination unless otherwise
            prescribed by the Fare Rules.
          </p>
        </template>
        <template #en-2>
          <p class="text-[16px]">
            While making reservations or changing conditions of carriage after
            the ticket purchase (name of passenger, flight number, class of
            service, date of departure from outbound or inbound sector, etc.),
            please require the airline or your travel agent in respect of the
            fare so that they may assist you in complying with the restrictions
            which may exist. Failure to comply with the recommendations may
            result an increase of fare and/or additional expenses. In some
            cases, special fees may be charged for changing the booking
            conditions or cancelling the special fare tickets.
          </p>
          <br />
          <p class="text-[16px]">
            Passengers may take some articles under their own liability as a
            carry-on item (handbags, etc.) which can be carried in the cabin
            within the limits of free baggage allowance. Maximum weight of such
            item should not be more than 8 kg with maximum dimensions (the sum
            of the 3 dimensions of all such carry on items) should not exceed
            115 cm (45 inches).
          </p>
          <br />
          <p class="text-[16px]">
            The Carrier has the right to limit weight or refuse to accept the
            excess baggage over the free baggage allowances. If a passenger
            intends to bring baggage in excess of the prearranged and paid
            weight, such baggage will be accepted only in case that the maximum
            payload capacity of the aircraft is not exceeded and the excess
            baggage charges have been paid.
            <br />
            The Carrier assumes no liability for fragile, valuable or perishable
            articles. Passenger should carry cash, valuable articles and
            documents with him/herself.
          </p>
          <b class="text-[16px]">
            Further information may be obtained from the Carrier or agent.
          </b>
        </template>
        <template #ru-1>
          <h4 class="h4">Перевозчик имеет право отказать в перевозке:</h4>
          <ul class="list-disc pl-4 text-[16px]">
            <li>
              При необходимости обеспечения авиационной безопасности и здоровья
              пассажиров
            </li>
            <li>
              В целях предотвращения нарушений соответствующих законов,
              постановлений, правил и предписаний государственных органов любой
              страны, на территорию, с территории или через территорию которой
              осуществляется перевозка
            </li>
            <li>
              В связи с отказом пассажира выполнять требования правил,
              инструкций и указаний перевозчика
            </li>
            <li>
              В связи с болезнью пассажира, если состояние его здоровья создает
              опасность для самого больного или окружающих
            </li>
            <li>
              При наличии у пассажира неправильно оформленных документов,
              необходимы для перелета/пересечения границы
            </li>
            <li>
              Пассажирам, создающим опасность или возможность причинения вреда
              другим лицам или их собственности
            </li>
            <li>
              Пассажирам, находящимся в состоянии алкогольного или
              наркотического опьянения
            </li>
            <li>
              Пассажирам, действия которых нарушают установленные правила
              пользования авиатранспортом
            </li>
          </ul>
          <p class="text-[16px]">
            В некоторых случаях, когда пассажиру отказано в перевозке
            забронированным рейсом по вине Перевозчика, последним могут быть
            предоставлены дополнительные услуги или выплачена компенсация по
            установленным нормам.
          </p>
        </template>
        <template #ru-2>
          <p class="text-[16px]">
            Авиабилет годен для полета по указанным в нем рейсе и дате, и только
            тому лицу, на чье имя оформлен билет.
          </p>
          <br />
          <p class="text-[16px]">
            Возврат сумм полностью либо частично производится по месту
            приобретения авиабилета в течение одного года с даты приобретения,
            если перевозка не была выполнена ни на одном из участков. При
            использовании авиабилета на одном из участков перевозки, возврат
            возможен с даты его использования (если иное не предусмотрено
            Правилами применения тарифа).
          </p>
          <br />
          <p class="text-[16px]">
            При покупке авиабилета или изменении указанных в нем условий
            перевозки (рейса, класса обслуживания, даты вылета и т.п.)
            рекомендуется проконсультироваться с перевозчиком или его агентом об
            условиях примененного тарифа. Невыполнение этой рекомендации может
            привести к повышению тарифа и/или дополнительным расходам. В
            некоторых случаях применяются сборы за отказ от полета или изменение
            бронирования в билетах, оформленных по специальным тарифам.
          </p>
        </template>
        <template #ru-3>
          <p class="text-[16px]">
            Пассажир бесплатно может взять в салон самолета под свою
            ответственность багаж (ручную кладь). Общий вес данного багажа не
            должен превышать 8 кг, максимальные размеры – не более 115 см по
            сумме трех измерений (ширина, длина и высота).
          </p>
          <br />
          <p class="text-[16px]">
            Перевозчик вправе ограничить или отказать пассажиру в приеме багажа
            сверх установленной нормы бесплатного провоза.
          </p>
          <br />
          <p class="text-[16px]">
            Если пассажиром предъявлено к перевозке багажа в большем количестве,
            чем им было предварительно забронировано и оплачено, то такой багаж
            принимается к перевозке только при наличии свободных емкостей и при
            условии соответствующей доплаты.
          </p>
          <br />
          <p class="text-[16px]">
            Перевозчик не несет ответственности за хрупкие, ценные или
            скоропортящиеся предметы, перевозимые в багаже. Деньги, ценности и
            документы пассажир обязан перевозить при себе, не сдавая в багаж.
          </p>
        </template>
      </UAccordion>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t, locale } = useI18n()
const items = ref([])
const links = [
  {
    label: t('79'),
    icon: 'i-heroicons-home',
    to: `/${locale.value}`,
  },
  {
    label: t('719'),
    icon: '',
  },
]
const itemsUz = ref([
  {
    label: 'Tashuvchi quyidagi hollarda tashuvni rad etishga haqqi bor:',
    slot: 'uz-1',
  },
  {
    label: 'Shuningdek',
    slot: 'uz-2',
  },
])

const itemsRu = ref([
  {
    label: 'Отказ в перевозке   пассажира',
    slot: 'ru-1',
  },
  {
    label: 'Авиабилет',
    slot: 'ru-2',
  },
  {
    label: 'Багаж',
    slot: 'ru-3',
  },
])

const itemsEn = ref([
  {
    label: 'Dear passengers!',
    slot: 'en-1',
  },
  {
    label: 'As well as',
    slot: 'en-2',
  },
])

if (locale.value === 'uz') {
  items.value = itemsUz.value
} else if (locale.value === 'en') {
  items.value = itemsEn.value
} else {
  items.value = itemsRu.value
}

useSeoMeta({
  title: t('719'),
  ogTitle: t('719'),
  description: t('719'),
  ogDescription: t('719'),
})
</script>
