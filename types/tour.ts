import type {
  IContent,
  IHotel,
  IHotelSearchParams,
  ISingleImage,
} from '@/types/hotel'

export interface ITourSearch {
  product_id: number
  adult: number
  child_age: string[]
  currency: 'USD' | 'TRL' | 'UZS'
  class: 'E'
  lang: 'tr' | 'ru' | 'uz' | 'en'
  transfer: 'gr' | 'in'
  round_trip: 1 | 2 | 3
  referal_loc_type: null | string
  sub_loc_id: null
  departure: {
    airport_code: string
    date: string
  }
  arrival: {
    location_id: string
    type: string
    date: string
  }
}
export interface ITourSearchResponse {
  expire: number
  request_id: string
  get_time: number
  limit: number
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

export interface IArrivalDeparture {
  date: number
  date_format: string
  terminal: null | string
  time: number
  time_format: string
  code: string
  name: string
  city: string
  country: string
  latitude: string
  longitude: string
}
export interface IAviaCompany {
  name: string
  code: string
  logo: string
  logo_mini: string
  marketing_name: string
}
export interface ISegment {
  baggage: string
  handbag: string
  duration: string
  plane: string
  class: string
  flight: string
  flight_number: string
  departure: IArrivalDeparture
  arrival: IArrivalDeparture
  avia_company: IAviaCompany
  stop_time?: string
}
export interface IOffer {
  dir_number: number
  source_id: number
  buy_id: string
  provider_id: number
  product_id: number
  baggage: string
  baggage_status: boolean
  handbag: string
  stop_time: null | string
  price: number
  price_format: string
  priceInfo: {
    passengerType: string
    price: number
    count: number
  }[]
  priceINF: {
    totalB2c: number
    totalB2b: number
  }
  currency: string
  duration: string
  duration_minutes: number
  plane: string
  flight: string
  flight_number: string
  class: string
  stops: number
  tariff_status: boolean
  seats: number
  tariff: any[]
  segments: ISegment[]
  departure: IArrivalDeparture
  arrival: IArrivalDeparture
  avia_company: IAviaCompany
  tag: string
  block_status: boolean
}
export interface IFlight {
  buy_id: string
  duration_minutes: number
  price: number
  currency: string
  dir_number_1_stops: number
  dir_number_1_baggage: string
  dir_number_1_baggage_status: boolean
  dir_number_2_stops: number
  dir_number_2_baggage: string
  provider_id: number
  product_id: number
  tariff_status: boolean
  airline_name: string
  airline_code: string
  departure_time: string
  arrival_time: string
  offers: IOffer[]
  price_fare_family?: boolean
  debug?: { [key: string]: string }[]
}
export interface IExOptions {
  id: number
  name: string
  status: boolean
  cnt: number
}

export type TExRegions = Omit<IExOptions, 'id'>
export interface IRating {
  name: string | number
  status: number
  cnt: number
}
interface IRegionItem {
  id: string
  name: string
  type: string
  status: boolean
}
interface IRegion {
  high_level_region: IRegionItem[]
  province_state: IRegionItem[]
  neighborhood: IRegionItem[]
  city: IRegionItem[]
  point_of_interest: IRegionItem[]
  sub_regions: IRegionItem[]
}
export interface IHotelResponse {
  hotels_filter: {
    hotel: {
      amenities_hotel: []
      amenities_rate: []
      amenities_room: []
      attributes_general: []
      attributes_pets: []
      boards_hotel: []
      ex_options: IExOptions[]
      ex_region: TExRegions[]
      hotel_themes: IExOptions[]
      rating: IRating[]
      instant_booking: boolean
      only_available: boolean
    }
    hotel_name_list: { code: string; name: string }[]
    region: IRegion
  }
  price_filter: {
    by_night_price: {
      max: number
      min: number
    }
    by_price: {
      max: number
      min: number
    }
    currency: string
  }
}
export interface ITourOffersResponse {
  filter_options: any[]
  flights: IFlight[]
  hotels_count: number
  status: 'Ready' | 'InProgress'
  request: ITourSearch
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
      boards_hotel: []
      ex_options: IExOptions[]
      ex_region: TExRegions[]
      hotel_themes: IExOptions[]
      rating: IRating[]
    }
    hotel_name_list: { code: string; name: string }[]
  }
  search_params: IHotelSearchParams
  hotel_response: IHotelResponse
  hotels: IHotel[]
  empty_status?: string
}

export interface ITourOffersParams {
  page: number
}
export interface ITourSingleData {
  property_id: string
  name: string
  address: {
    line_1: string
    city: string
    state_province_name: string
    postal_code: string
    country_code: string
    obfuscation_required: boolean
  }
  ratings: {
    property: {
      rating: string
      type: string
    }
  }
  location: {
    coordinates: {
      latitude: number
      longitude: number
    }
    obfuscated_coordinates: {
      latitude: number
      longitude: number
    }
    obfuscation_required: boolean
  }
  phone: string
  category: {
    id: string
    name: string
  }
  business_model: {
    expedia_collect: boolean
    property_collect: boolean
  }
  rank: number
  checkin: {
    begin_time: string
    end_time: string
    instructions: HTMLAllCollection
    special_instructions: string
  }
  checkout: {
    time: string
  }
  fees: {
    mandatory: HTMLAllCollection
  }
  attributes: {
    pets: {
      [key: string]: {
        id: string
        name: string
      }
    }
    general: {
      [key: string]: {
        id: string
        name: string
      }
    }
  }
  amenities: {
    [key: string]: {
      id: string
      name: string
      categories?: string[]
    }
  }
  onsite_payments: {
    currency: string
    types: {
      [key: string]: {
        id: string
        name: string
      }
    }
  }
  rooms: {
    [key: string]: {
      id: string
      name: string
      descriptions: {
        overview: HTMLAllCollection
      }
      amenities: {
        [key: string]: {
          id: string
          name: string
          categories?: string[]
          value?: string
        }
      }
      images: ISingleImage[]
      bed_groups: {
        [key: string]: {
          id: string
          description: string
          configuration: {
            quantity: number
            size: string
            type: string
          }[]
        }
      }
      area: {
        square_meters: number
        square_feet: number
      }
      views: {
        [key: string]: {
          id: string
          name: string
        }
      }
      occupancy: {
        max_allowed: {
          total: number
          children: number
          adults: number
        }
        age_categories: {
          ChildAgeA: {
            name: string
            minimum_age: number
          }
          Adult: {
            name: string
            minimum_age: number
          }
          Infant: {
            name: string
            minimum_age: number
          }
        }
      }
    }
  }
  rates: {
    [key: string]: {
      id: string
      amenities: {
        [key: string]: {
          id: string
          name: string
          categories?: string[]
        }
      }
    }
  }
  dates: {
    added: string
    updated: string
  }
  descriptions: {
    amenities: string
    dining: string
    rooms: string
    attractions: HTMLAllCollection
    location: string
    headline: string
  }
  statistics: {
    [key: string]: {
      id: string
      name: string
      value: string
    }
  }
  themes: {
    [key: string]: {
      id: string
      name: string
    }
  }
  chain: {
    id: string
    name: string
  }
  brand: {
    id: string
    name: string
  }
  spoken_languages: {
    [key: string]: {
      id: string
      name: string
    }
  }
  multi_unit: boolean
  payment_registration_recommended: boolean
  supply_source: string
  images: ISingleImage[]
  provider: null
  eps_id: string
  policies?: {
    know_before_you_go: string
  }
}
export interface ITourSingle {
  code: number
  content: IContent
  data?: ITourSingleData
  images: []
  rooms: []
}
// TourRooms types
export interface ITourRoomsRoomRate {
  rate_id: string
  status: string
  amenities: {
    b: {
      id: string
      name: string
      is_board: boolean
      icon: string
    }
  }
  price: number
  price_info_: {
    b2b_total: number
    b2c_total: number
    agent_fee?: number
    agent_fee_text?: string
  }
  old_price: number
  currency: string
  data: []
  images: ISingleImage[]
  bed_groups: {
    id: string
    description: null
    configuration: {
      type: string
      size: string
      quantity: number
    }[]
    buy_id: string
  }[]
  rate_data: {
    id: '153303771'
    status: 'available'
    available_rooms: 1
    refundable: false
    member_deal_available: false
    bed_groups: {
      [key: string]: {
        id: string
        description: null
        configuration: {
          type: string
          size: string
          quantity: number
        }[]
      }
    }
    amenities: {
      b: {
        id: string
        name: string
        is_board: boolean
        icon: string
      }
    }
    promotions: []
    cancel_penalties: []
    cur: string
    insurance_price: number
    transfer_price: number
    visa_price: string
    transfers: string
    priceDmcData: {
      fly: null
      insurance: number
      visa: string
      transfer: number
      pcr: null
      room: number
      mngrFee: number
      totalPrice: number
      totalNetto: number
      totalPriceB2c: number
      totalPriceB2B: number
      percent: number
      transfers: string
    }
  }
}
export interface ITourRoomsRoom {
  room_code: string
  room_name: string
  lang_room_name: string
  dmc: string
  rates: ITourRoomsRoomRate[]
  tour_package: {
    insurance: boolean
    visa: boolean
    transfer: boolean
    avia: boolean
    transferName?: string
  }
  country_code: string
}
export interface ITourRooms {
  code: number
  flight: IFlight
  name: string
  room_request: {
    hid: string
    adult: number
    product_id: number
    currency: string
    begin_date: string
    end_date: string
    chd: []
    transfer: string
    type: string
    is_b2b: boolean
    is_tour: boolean
    client_ip: string
    user_info: {
      user_id: number
      role_id: number
    }
    referal_loc_type: string
    lang: string
  }
  rooms: ITourRoomsRoom[]
  additional_service: {
    name: string
    code: string
    value: {
      name: string
      code: string
    }[]
  }[]
}
export interface ITourOrderCheck {
  reservation_id: string
  expire: number
  adult_qnt: number
  child_qnt: number
  inf_qnt: number
  total_price: number
  discount_price: number
  hotel_data: {
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
      b: {
        id: string
        name: string
        is_board: boolean
        icon: string
      }
    }
    percent: number
    transfer_price: string
    transfer_type: string
    transfer_name: string
    insurance_price: string
  }
  flight_data: {
    dir_number: number
    source_id: number
    buy_id: number
    provider_id: number
    product_id: number
    baggage: string
    baggage_status: boolean
    handbag: string
    stop_time: null | string
    price: number
    price_format: string
    priceInfo: {
      passengerType: string
      price: number
      count: number
    }[]
    priceINF: {
      totalB2c: number
      totalB2b: number
    }
    currency: 'USD'
    duration: '5 часов 10 минут'
    duration_minutes: 300
    plane: 'Airbus A321neo'
    flight: 'HY'
    flight_number: '3224'
    class: 'Y'
    stops: 0
    tariff_status: false
    seats: 122
    tariff: []
    segments: ISegment[]
    departure: IArrivalDeparture
    arrival: IArrivalDeparture
    avia_company: {
      name: string
      code: string
      logo: string
      logo_mini: string
      marketing_name: string
    }
    tag: string
    block_status: boolean
  }[]
}
interface IAirlines {
  name: string
  code: string
  status: boolean
}
interface ITimes {
  time: string
  status: boolean
}
export interface ITourTickets {
  code: number
  status: string
  message: string
  airlines: IAirlines[]
  min_price: number
  max_price: number
  dir_number: number
  departureTimes: ITimes[]
  arrivalTimes: ITimes[]
  stops: number[]
  count: number
  data: IFlight[]
}
export interface ITicketFilter {
  filterStatus?: string
  stops?: number[]
  isBaggage?: boolean
  airlines?: string[]
  depTimes?: string[]
  arrTimes?: string[]
  pageSize?: number
  min_price?: number
  max_price?: number
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
  flight: ITourOrderFlight
  hotels: IHotel[]
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
export interface Airport {
  name: string
  code: string
  type: 'airport'
}

export interface IDefaultAirportList {
  title: string
  list: Airport[]
}
