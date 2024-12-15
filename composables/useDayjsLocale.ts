import dayjs from 'dayjs'
import az from 'dayjs/locale/az'
import bg from 'dayjs/locale/bg'
import che from 'dayjs/locale/cs'
import en from 'dayjs/locale/en'
import ru from 'dayjs/locale/ru'
import tr from 'dayjs/locale/tr'
import uzLatn from 'dayjs/locale/uz-latn'

export const useDayjsLocale = () => {
  const { locale } = useI18n()
  const locales = {
    ru,
    bg,
    tr,
    en,
    uz: uzLatn,
    az,
    che,
  }
  dayjs.locale(locales[locale.value])
  function changeDayjsLocale() {
    dayjs.locale(locales[locale.value])
  }
  return { changeDayjsLocale }
}
