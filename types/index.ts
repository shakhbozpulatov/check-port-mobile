export interface IResponse<T> {
  code: number
  data: T
  message: string
}
export interface ICalendar {
  date: string
  id: number
  type: 'on' | 'rt'
}
export interface IResponseCalendar {
  rules: IRules
  icon: string
  on: string[]
  rt: string[]
  type: string
  code: string
  message: string
  data: ICalendar[]
  on_price: { date: string; price: string }[]
  rt_price: { date: string; price: string }[]
}
export interface IRules {
  round_trip: { name: string; code: number }[]
  transfer: { name: string; code: string }[]
}
export interface PersonalInfo {
  type: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  email: string | null
  birth: string | null
  gender: string | null
  citizenship: string | null
  document_number: string | null
  document_expire: string | null
  save: number | boolean | null
  index: number | null
}
export interface ICitizenship {
  name_ru: string
  name_en: string
  name_uz: string
  code: string
}
export interface IAirportSearch {
  id: string
  type: string
  code: string
  name: string
  city_code: string
  country_code: string
  country_name: string
  state_code: null | string
  coordinates: {
    lon: number
    lat: number
  }
  index_strings: []
  weight: number
  main_airport_name: null | string
}
export interface IDirection {
  eps_id: string
  type: string
  name: string
  name_full: string
  displayName: string
  adress: null | string
  id: string
}
export interface IDirectionsList {
  data: IDirection[]
}
export interface IContent {
  id: string
  name: string
  url: string
  img: string
  city: string
  route: null
  star: null
}

export interface IStory {
  id: string
  date_create: string // e.g., "2024.09.06"
  name: string
  url?: string
  anons: string // URL to the announcement image
  img?: string // URL to the main image
  video?: string // URL to the video
  type: string
}
