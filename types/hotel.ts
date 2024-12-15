import { LocationQueryValue } from 'vue-router'

import type { IAviaOrderPassenger } from '~/types/avia'
import type {
  IExOptions,
  IRating,
  ITourRoomsRoom,
  TExRegions,
} from '~/types/tour'
export interface IHotelDefault {
  id: string
  name: string
  url: string
  img: string
  city: string
  route: string
  star: string
}
export interface IHotelSearchData {
  adult: number
  child_age: string | string[]
  begin_date: string | LocationQueryValue[]
  end_date: string | LocationQueryValue[]
  currency: string
  lang: string
  location_id: string | LocationQueryValue[]
  product_id: number
  referal_loc_type: string | LocationQueryValue[]
  transfer: string | LocationQueryValue[]
  type: string | LocationQueryValue[]
}
export interface IHotelSearchParams {
  category?: string | LocationQueryValue[]
  type?: string | LocationQueryValue[]
  hotel_themes?: string | LocationQueryValue[]
  exoptions?: string | LocationQueryValue[]
  dmc_list?: string | LocationQueryValue[]
  exregions?: string | LocationQueryValue[]
  board?: string | LocationQueryValue[]
  night_min?: string | LocationQueryValue[]
  night_max?: string | LocationQueryValue[]
  price_range_min?: string | LocationQueryValue[]
  price_range_max?: string | LocationQueryValue[]
  sort: string | LocationQueryValue[]
  sub_loc_id?: string | LocationQueryValue[]
  page: number
  hotelNames?: string | LocationQueryValue[]
}

interface IAddress {
  line_1: string
  city: string
  country_code: string
}
interface IGuest {
  count: number
  overall: string
  cleanliness: string
  service: string
  comfort: string
  condition: string
  neighborhood: string
  amenities: string
  recommendation_percent: string
}
interface IGeolocation {
  latitude: number
  longitude: number
}
interface IAttributePets {
  id: string
  name: string
  value: string | undefined
  categories: string[] | undefined
  icon: string | undefined
}
interface ITourPackage {
  insurance: boolean
  visa: boolean
  transfer: boolean
  avia: boolean
  transferName?: string
}
export interface IContent {
  name: string
  eps_id: string
  address: IAddress
  address_str: string
  code: string
  stars: string | number
  guest: IGuest
  geolocation: IGeolocation
  category: string
  attributes_pets: IAttributePets[]
  attributes_general: IAttributePets[]
  amenities_hotel: IAttributePets[]
  amenities_room: []
  amenities_rate: []
  hotel_themes: IAttributePets[]
  ex_options: number[]
  ex_region: string
  tour_package: ITourPackage | []
  preview_content: string
  friday_discount: 0 | 1
}
export interface IAmenities {
  id: string
  name: string
  is_board: boolean
  icon: string
}
export interface IRooms {
  room_code: string
  room_name: string
  lang_room_name: string
  amenities: IAmenities[]
  available_rooms: number
  refundable: boolean
  cancel_penalties: []
  nonrefundable_date_ranges: []
  promotions: []
  price: number
  price_info_: {
    b2b_total: number
    b2c_total: number
  }
  old_price: number
  currency: string
  night_price: number
  view: string
  area: string
  data: []
}
export interface IHotel {
  code: string
  content: IContent
  dmc: string
  images: string[]
  rooms: IRooms[]
}
interface ISingleAddress {
  line_1: string
  city: string
  state_province_name: string
  postal_code: string
  country_code: string
  obfuscation_required: boolean
  localized: {
    links: {
      'tr-TR': {
        method: 'GET'
        href: 'https://api.ean.com/v3/properties/content?language=tr-TR&property_id=20258421&include=address&supply_source=expedia'
      }
    }
  }
}
interface ISingleAmenities {
  id: string
  name: string
  categories?: string[]
}
export interface ISingleImage {
  caption: string
  category: number
  hero_image: boolean
  links: {
    '350px': {
      method: 'GET'
      href: string
    }
    '70px': {
      method: 'GET'
      href: string
    }
    '1000px': {
      method: 'GET'
      href: string
    }
  }
}
export interface IHotelSingle {
  content: IContent
  dmc: string
  images: ISingleImage[]
  rooms: IRooms[]
  data: {
    address: ISingleAddress
    amenities: {
      [key: number]: ISingleAmenities
    }
    attributes: {
      pets: {
        [key: number]: ISingleAmenities
      }
      general: {
        [key: number]: ISingleAmenities
      }
    }
    brand: ISingleAmenities
    business_model: {
      expedia_collect: boolean
      property_collect: boolean
    }
    category: ISingleAmenities
    chain: ISingleAmenities
    checkin: {
      begin_time: string
      instructions: string
      special_instructions: string
      min_age: number
    }
    checkout: {
      time: string
    }
    dates: {
      added: string
      updated: string
    }
    descriptions: {
      amenities: string
      attractions: string
      business_amenities: string
      dining: string
      headline: string
      location: string
      rooms: string
    }
    eps_id: string
    fax: string
    fees: {
      optional: HTMLElement | string
    }
    images: ISingleImage[]
    location: {
      coordinates: {
        latitude: number
        longitude: number
      }
      obfuscation_required: boolean
    }
    multi_unit: boolean
    name: string
    onsite_payments: {
      currency: string
      types: {
        [key: string]: ISingleAmenities
      }
    }
    payment_registration_recommended: boolean
    phone: string
    policies: {
      know_before_you_go: HTMLElement | string
    }
    property_id: string
    provider: null | number
    rank: number
    rates: {
      [key: number]: {
        id: string
        amenities: ISingleAmenities
      }
    }
    ratings: {
      guest: {
        count: number
        overall: string
        cleanliness: string
        service: string
        comfort: string
        condition: string
        neighborhood: string
        amenities: string
        recommendation_percent: string
      }
      property: {
        rating: string
        type: string
      }
    }
    rooms: {
      [key: number]: {
        amenities: {
          [key: number]: ISingleAmenities
        }
        area: {
          square_feet: number
          square_meters: number
        }
        bed_groups: {
          [key: number]: {
            id: string
            description: string
            configuration: {
              quantity: number
              size: string
              type: string
            }[]
          }
        }
        descriptions: {
          overview: HTMLElement | string
        }
        id: string
        images: ISingleImage[]
        name: string
        occupancy: {
          age_categories: object
          max_allowed: {
            total: number
            children: number
            adults: number
          }
        }
        views: {
          [key: number]: ISingleAmenities
        }
      }
    }
    supply_source: string
    themes: {
      [key: number]: ISingleAmenities
    }
    statistics: {
      [key: number]: {
        id: string
        name: string
        value: string
      }
    }
  }
}
export interface IHotelResponse {
  hotels: IHotel[]
  hotels_count: number
  price_filter: {
    by_price: {
      min: number
      max: number
    }
    by_night_price: {
      min: number
      max: number
    }
    currency: string
  }
  options: {
    transfer: string[]
    insurance: string[]
  }
  hotels_filter: {
    hotel: {
      amenities_hotel: []
      amenities_rate: []
      amenities_room: []
      attributes_general: []
      attributes_pets: []
      boards_hotel: { name: string }[]
      ex_options: IExOptions[]
      ex_region: TExRegions[]
      hotel_themes: IExOptions[]
      rating: IRating[]
      instant_booking: boolean
      only_available: boolean
    }
    hotel_name_list: { code: string; name: string }[]
    dmc_list: null
    region: {
      city: {
        id: string
        name: string
        type: string
        status: boolean
      }[]
    }
  }
  search_params: {
    loc_id: string
    begin_date: string
    end_date: string
    adult: number
    chd: string[]
    is_b2b: boolean
    is_tour: boolean
    client_ip: string
    currency: string
    type: string
    options: null
    transfer: string
    lang: 'ru' | 'en' | 'uz'
    only_eps: boolean
    user_id: number
    role_id: number
    search_mode: boolean
    class: string
  }
  status: 'Ready' | 'InProgress'
}

export interface IRoomsSearchData {
  hotel_id: string
  begin_date: string
  end_date: string
  currency: string
  adult: number
  child_age: string[]
  product_id: number
  type: string
  referal_loc_type: string
  lang: string
  transfer: string
  insurance: string
}

export interface ISingleRooms {
  rooms: ITourRoomsRoom[]
  additional_service: {
    name: string
    code: string
    value: {
      name: string
      code: string
    }[]
  }[]
  name: string
  code: number
}
export interface IOrderCheck {
  reservation_id: string
  adult_qnt: number
  child_qnt: number
  inf_qnt: number
  expire: number
  data: {
    begin_date: string
    end_date: string
    adult: number
    currency: string
    price: number
    hotel_name: string
    room_code: string
    room_name: string
    country_code: string
    is_b2b: boolean
    amenities: {
      [key: string]: {
        id: string
        name: string
        is_board: boolean
      }
    }
    percent: number
    transfer_price: string
    transfer_type: string
    transfer_name: string
    insurance_price: string
  }
}
interface ITourOrderPassenger {
  id: number
  first_name: string
  last_name: string
  middle_name: null | string
  birth: string
  gender: string
  citizenship: string
  document_type: null
  document_number: string
  document_expire: string
  email: null | string
  phone: null | string
  order_id: number
  type: string
}
interface ITourOrderFlight {
  id: number
  user_id: number
  agent_id: null
  sub_agent_id: null
  status: number
  status_pay: number
  price: number
  skit_for_agent: null
  tariff_price: number
  currency: string
  all_pax: number
  class: string
  debt: null
  email: string
  phone: string
  full_name: string
  created_at: number
  updated_at: number
  created_by: number
  updated_by: number
  product_id: number
  provider_id: number
  provider_order_id: null
  provider_order_status: null
  payment_provider: null
  price_usd: number
  comment: string
  seat_data: null
  passengers: ITourOrderPassenger[]
}

export interface ITourOrder {
  code: number
  massage: string
  data: {
    id: number
    agent_id: null | number
    user_id: number
    sub_agent_id: null | number
    manager_id: null | number
    office_id: null | number
    parent_id: null | number
    flight_order_id: null | number
    product_id: number
    provider_id: number
    status: number
    visa_status: null | number
    insurance_status: number
    transfer_status: number
    status_pay: number
    price: number
    tariff_price: null | number
    netto_price: null | number
    payment_advance: null | number
    skit_for_agent: null | number
    currency: string
    usd_price: null | number
    all_pax: number
    provider_order_status: number
    payment_provider: null | number
    payment_provider_order_status: number
    payment_expire: string
    provider: string
    class: null | string
    email: string | null
    phone: string | null
    full_name: string | null
    expire: null | string
    checkin: string | null
    checkout: string | null
    route: string | null
    main_region: string | null
    sub_region: null | string
    hotel_name: string
    comment: string | null
    vaucher_status: number
    deleted_at: null | string
    deleted_id: null | number
    created_at: string
    updated_at: string
    created_by: number
    updated_by: number
    month: null | string
    year: null | string
    base: null | string
    provider_order_pay_date: null | string
    ex_id: null | number
    adt: number
    chi: number
    inf: number
    platform: null | string
    price_usd: number
    ex_amount: null
    ex_currency: null
    price_data: null
    sales_mod: string
    ip: string
    child_ages: string
    org_id: number
    passenger: IAviaOrderPassenger[]
    flight: ITourOrderFlight
  }
}

export interface ITourOrders {
  code: number
  data: ITourOrder[]
  message: string
  meta: {
    totalCount: number
    pageCount: number
    currentPage: number
    perPage: number
  }
}
