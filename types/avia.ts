export interface ISearch {
  onlyCharter: number
  product_id: number
  adult_qnt: number
  child_qnt: number
  infant_qnt: number
  class: string
  currency: string
  in_one_days: boolean | number
  charter_three_days: boolean | number
  only_baggage: boolean | number
  sorting_price: number
  directions: IDirections[]
}

interface IDirections {
  dep_type: string | null
  arr_type: string | null
  departure_code: string | null
  arrival_code: string | null
  date: string | null
}
export interface IAviaTicketResponseL {}
export interface IAviaTicketResponse {
  airlines: {
    name: string
    code: string
    status: boolean
  }[]
  arrivalTimes: {
    status: boolean
    time: string
  }[]
  code: number
  count: number
  data: {
    code: number
    data: IFlight[]
    message: string
    meta: {
      totalCount: number
      pageCount: number
      currentPage: number
      perPage: number
    }
  }
  departureTimes: {
    status: boolean
    time: string
  }[]
  dir_number: number
  max_price: number
  message: string
  min_price: number
  status: string
  stops: number[]
  request: {
    directions: {
      dep_type: string
      arr_type: string
      departure_code: string
      arrival_code: string
      date: string
    }[]
    adult_qnt: number
    child_qnt: number
    infant_qnt: number
    currency: string
    class: string
    product_id: number
    onlyCharter: number
    in_one_days: number
    charter_three_days: number
    self_status: number
    ets_status: number
    nemo_status: number
    pegas_status: number
    fullOffer: number
    providers: null
    platform: 'app'
  }
}
export interface ITicketDetailData {
  dir_number: number
  buy_id: string
  provider_id: number
  product_id: number
  baggage: string
  baggage_status: boolean
  handbag: null
  stop_time: null
  price: number
  price_format: string
  currency: string
  duration: string
  duration_minutes: number
  plane: null
  flight: string
  flight_number: string
  class: string
  stops: number
  tariff_status: boolean
  tariff: []
  seats: null
  segments: ISegment[]
  departure: {
    date: number
    date_format: string
    terminal: string
    time: number
    time_format: string
    code: string
    name: null
    city: string
    country: null
    latitude: null
    longitude: null
  }
  arrival: {
    date: number
    date_format: string
    terminal: string
    time: number
    time_format: string
    code: string
    name: null
    city: string
    country: null
    latitude: null
    longitude: null
  }
  avia_company: {
    name: string
    code: string
    logo_mini: string
    logo: string
    marketing_name: string
    name_oper: string
    code_oper: string
    logo_oper: string
    logo_mini_oper: string
  }
}
export interface ITicketDetail {
  ticket: boolean
  message: string
  reservation_id: string
  product_id: number
  expire: number
  data: ITicketDetailData[]
  request: {
    directions: {
      dep_type: string
      arr_type: string
      departure_code: string
      arrival_code: string
      date: string
    }[]
    adult_qnt: number
    child_qnt: number
    infant_qnt: number
    currency: string
    class: string
    product_id: number
    onlyCharter: number
    in_one_days: number
    charter_three_days: number
    self_status: number
    ets_status: number
    nemo_status: number
    pegas_status: number
    fullOffer: number
    providers: null
    platform: 'app'
  }
}

export interface IRegularTariff {
  buy_id: string
  price: string
  currency: string
  segments: {
    ff_data: {
      name: string
      services: {
        name: string
        status: string
        status_name: null
        is_bag: false
        scode: null
      }[]
    }
  }[]
  $flight: {
    dir_number: number
    buy_id: string
    provider_id: number
    product_id: number
    baggage: string
    baggage_status: boolean
    handbag: null
    stop_time: null
    price: number
    price_format: string
    currency: string
    duration: string
    duration_minutes: number
    plane: null
    flight: string
    flight_number: string
    class: string
    stops: number
    tariff_status: boolean
    tariff: []
    seats: number
    segments: {
      baggage: string
      handbag: null
      duration: string
      plane: string
      class: string
      flight: string
      flight_number: string
      departure: {
        date: number
        date_format: string
        terminal: string
        time: number
        time_format: string
        code: string
        name: null
        city: string
        country: null
        latitude: null
        longitude: null
      }
      arrival: {
        date: number
        date_format: string
        terminal: string
        time: number
        time_format: string
        code: string
        name: null
        city: string
        country: null
        latitude: null
        longitude: null
      }
      avia_company: {
        name: string
        code: string
        logo_mini: string
        logo: string
        marketing_name: string
        name_oper: string
        code_oper: string
        logo_oper: string
        logo_mini_oper: string
      }
    }[]
    departure: {
      date: number
      date_format: string
      terminal: string
      time: number
      time_format: string
      code: string
      name: null
      city: string
      country: null
      latitude: null
      longitude: null
    }
    arrival: {
      date: number
      date_format: string
      terminal: string
      time: number
      time_format: string
      code: string
      name: null
      city: string
      country: null
      latitude: null
      longitude: null
    }
    avia_company: {
      name: string
      code: string
      logo_mini: string
      logo: string
      marketing_name: string
      name_oper: string
      code_oper: string
      logo_oper: string
      logo_mini_oper: string
    }
  }
}

interface ITimes {
  time: string
  status: boolean
}
interface IAirlines {
  name: string
  code: string
  status: boolean
}
export interface IOffers {
  code: number
  status: 'Ready' | 'InProgress'
  message: string
  airlines?: IAirlines[]
  min_price?: number
  max_price?: number
  dir_number: number
  departureTimes?: ITimes[]
  arrivalTimes?: ITimes[]
  stops?: number[]
  count: number
  data: {
    code: number
    message: string
    data?: IFlight[]
    meta?: {
      totalCount: number
      pageCount: number
      currentPage: number
      perPage: number
    }
  }
}

export interface IAviaOrders {
  code: number
  data: IAviaOrder[]
  message: string
  meta: {
    totalCount: number
    pageCount: number
    currentPage: number
    perPage: number
  }
}
export interface IAviaOrder {
  code: number
  message: string
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
    created_at: string | number | undefined
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
    passengers: IAviaOrderPassenger[]
    flight: IAviaOrderFlight
  }
}
export interface IAviaOrderFlight {
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
  passengers: IAviaOrderPassenger[]
}

export interface IAviaOrderPassenger {
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
  books: IAviaOrderPassengerBooks
}

interface IAviaOrderPassengerBooks {
  id: number
  passenger_id: number
  flight_id: number
  order_id: number
  seat_order_id: number
  class: string
  baggage: string
  handbag: string
  tariff_id: null | number | string
  tariff_price: null | number | string
  ticket: null
  amadeus: null
  pnl: null
  price: number
  currency: string
  checking: number
  seat: null
  flight: {
    id: number
    departure_code: string
    departure_date: number
    departure_date_format: Date
    departure_terminal: null
    departure_time: number
    departure_time_format: string
    arrival_code: string
    arrival_date: number
    arrival_date_format: Date
    arrival_terminal: null
    arrival_time: number
    arrival_time_format: string
    flight: string
    flight_number: string
    flight_unique_code: null
    baggage_y: string
    baggage_c: string
    active_quota_y: number
    active_quota_c: number
    handbag: string
    status: number
    plane: string
    airline_logo: null
    airline_name: string
    block_count: null
    block_class: null
    block_price: null
    block_type: null
    comment: null
  }
}

export interface IOrderAviaSingle {
  id: number
  user_id: number
  agent_id: number | null
  sub_agent_id: number | null
  status: number
  status_pay: number
  price: number
  skit_for_agent: any // You may replace 'any' with the appropriate type if known
  tariff_price: number
  currency: string
  all_pax: number
  class: string
  debt: number | null
  email: string
  phone: string
  full_name: string
  created_at: number
  updated_at: number
  created_by: number
  updated_by: number
  product_id: number
  provider_id: number
  provider_order_id: number | null
  provider_order_status: string | null
  payment_provider: string | null
  price_usd: number
  comment: string
  parent_id: number | null
  seat_data: any
  ex_id?: string
  passengers: IAviaOrderPassenger[]
}
