import type { PickupLocales, RemoveIndexSignature } from '@intlify/core-base'
import type { ComposerTranslation, UseI18nOptions } from 'vue-i18n'

const timeouts: any = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}

export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: () => void, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {
        console.log(e)
      }

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export function formatNumber(number: string | number) {
  return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
export const disabledDates = (date: Date) => {
  return date < new Date()
}
export const disableAdultCalendar = (date: Date, checkIn: Date) => {
  const currentDate = new Date(checkIn)
  const twelveYearsAgo = new Date(currentDate)
  twelveYearsAgo.setFullYear(currentDate.getFullYear() - 12)
  return date.getTime() > twelveYearsAgo.getTime()
}
export const disableChildCalendar = (date: Date, checkIn: Date) => {
  const currentDate = new Date(checkIn)
  const twelveYearsAgo = new Date(checkIn)
  const twoYearsAgo = new Date()
  twelveYearsAgo.setFullYear(currentDate.getFullYear() - 12)
  twoYearsAgo.setFullYear(currentDate.getFullYear() - 2)
  return (
    date.getTime() < twelveYearsAgo.getTime() ||
    date.getTime() > twoYearsAgo.getTime()
  )
}
export const disableInfantCalendar = (date: Date, checkIn: Date) => {
  const currentDate = new Date(checkIn)
  const oneYearsAgo = new Date(checkIn)
  oneYearsAgo.setFullYear(currentDate.getFullYear() - 2)
  return date.getTime() < oneYearsAgo.getTime() || date > new Date()
}
export function detectPlatform() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/android/i.test(userAgent)) {
    return 'Android'
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS'
  }

  return 'Desktop'
}
export const publicToken =
  'oqO7ALyHbi41BKJ-7QJ7PXLa59P1LEGmQp0UlkWCunsqqsQvz_1a5jFKRvHM_anc'
export const ordersType = (t: (e: string) => string) =>
  ['23', '226', '6', '337', '439', '440', '317', '441', '442', '443'].map(
    (key) => t(key),
  )

export const statusPaymant = (t: (e: string) => string) =>
  ['180', '217', '60', '499', '519'].map((key) => t(key))

export const statusNeedPayOrder = (t: (e: string) => string) =>
  [
    '28',
    '226',
    'CIP',
    '337',
    '165',
    '440',
    '317',
    '441',
    '442',
    '443',
    '507',
    '586',
  ].map((key) => t(key))

export const statusOrderAvia = (
  t: ComposerTranslation<
    NonNullable<UseI18nOptions['messages']>,
    UseI18nOptions['locale'] extends unknown
      ? string
      : UseI18nOptions['locale'] extends Locale
        ? IsNever<
            | PickupLocales<
                NonNullable<NonNullable<UseI18nOptions['messages']>>
              >
            | PickupLocales<
                NonNullable<NonNullable<UseI18nOptions['datetimeFormats']>>
              >
            | PickupLocales<
                NonNullable<NonNullable<UseI18nOptions['numberFormats']>>
              >
          > extends true
          ? Locale
          :
              | PickupLocales<
                  NonNullable<NonNullable<UseI18nOptions['messages']>>
                >
              | PickupLocales<
                  NonNullable<NonNullable<UseI18nOptions['datetimeFormats']>>
                >
              | PickupLocales<
                  NonNullable<NonNullable<UseI18nOptions['numberFormats']>>
                >
        : UseI18nOptions['locale'] extends unknown
          ? string
          :
              | UseI18nOptions['locale']
              | PickupLocales<
                  NonNullable<NonNullable<UseI18nOptions['messages']>>
                >
              | PickupLocales<
                  NonNullable<NonNullable<UseI18nOptions['datetimeFormats']>>
                >
              | PickupLocales<
                  NonNullable<NonNullable<UseI18nOptions['numberFormats']>>
                >,
    RemoveIndexSignature<{
      [K in keyof DefineLocaleMessage]: DefineLocaleMessage[K]
    }>
  >,
) => ['469', '470', '471', '471', '473', '517'].map((key) => t(key))
export const statusOrder = (t: (e: string) => string) =>
  ['469', '470', '471', '471', '473', '517'].map((key) => t(key))
export const statusColor = ['green', 'green', 'green', 'green', 'red', 'red']
export const statusPaymentColor = ['danger', 'success', 'primary', 'warning']

const cyrillicRegex = /[\u0400-\u04FF]/

export function isCyrillic(str: string) {
  return cyrillicRegex.test(str)
}

function customTransliterate(cyrillicChar: string): string {
  const transliterationMap = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: 'ie',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Е: 'E',
    Ё: 'Yo',
    Ж: 'Zh',
    З: 'Z',
    И: 'I',
    Й: 'Y',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'Kh',
    Ц: 'Ts',
    Ч: 'Ch',
    Ш: 'Sh',
    Щ: 'Shch',
    Ъ: 'Ie',
    Ы: 'Y',
    Ь: '',
    Э: 'E',
    Ю: 'Yu',
    Я: 'Ya',
  }

  return transliterationMap[cyrillicChar] || cyrillicChar
}
export function convertCyrillicToLatin(inputValue: string) {
  return Array.from(inputValue).map(customTransliterate).join('')
}
export const generateUniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2)
