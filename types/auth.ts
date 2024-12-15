export interface IUser {
  id: number
  file_id: number | null
  office_id: number | null
  currency: string
  role_id: number
  email: string
  status: number
  created_at: number
  updated_at: number
  balance: number | null
  debt: number | null
  token: string | null
  lang: string
  auto_book: number
  parent_id: number | null
  last_login: number
  static_role: string | null
  sub_role: string | null
  manager_id: number | null
  id_1c: string | null
  patronymic: string | null
  inn: string | null
  pinfl: string | null
  date_of_birth: number | null
  gender: string | null
  surname: string | null
  name: string | null
  phone_mobile: string | null
  country: string | null
  city: string | null
  middle_name: string | null
  extra_contact: string | null
  address_home: string | null
  street: string | null
  notification_status: number | null
  type_notification_location: number | null
  type_notification_update_order: number | null
  type_notification_update_price: number | null
  type_notification_sms: number | null
  chat_id: number | null
  telegram_user_id: number | null
  citizenship: string | null
  employment_date: number | null
  date_of_dismissal: number | null
  authority: string | null
  type: string | null
  institution: string | null
  period_from: number | null
  period_to: number | null
  specialty: string | null
  edu_doc_num: string | null
  edu_doc_date: number | null
  b2b_status: number | null
  ex_id: string | null
  doc_num: string | null
  doc_date: number | null
  doc_date_from: number | null
  platform: string | null
  userDetail: UserDetail
}

interface UserDetail {
  id: number
  user_id: number
  phone: string | null
  mobile_phone: string | null
  first_name: string | null
  type: string | null
  last_name: string | null
  middle_name: string | null
  checkpoint: string | null
  address: string | null
  company: string | null
  director: string | null
  document: string | null
  city: string | null
  country: string | null
  birthday: number | null
  passport: string | null
  passport_date: number | null
  passport_expire: number | null
  promo_cod: string | null
  promo_cod_sub: string | null
  created_at: number
  updated_at: number
  bank_name: string | null
  mfo: string | null
  account_price: number | null
  beneficiary_account: string | null
  sales_email: string | null
  sales_phone: string | null
  sales_full_name: string | null
  accountant_email: string | null
  accountant_phone: string | null
  accountant_full_name: string | null
  technical_email: string | null
  technical_phone: string | null
  technical_full_name: string | null
  zip_code: string | null
  inn: string | null
  contract_number: string | null
  contract_date: number | null
  contract_expire: number | null
  file_passport: string | null
  file_contract: string | null
  file_license: string | null
  file_certificate: string | null
  file_state_certificate: string | null
  salary: number | null
  salary_currency: string | null
}

export interface ILogin {
  phone_or_email: string
  password: string
}

export interface IToken {
  token: string
}

export interface IRegister {
  email: string
  password: string
  dateContract: string
  expireDate: string
  passport: string
  first_name: string
  last_name: string
  city: string
  phone: string
  mobile_phone: string
  country: string
  brith: string
  lang: string
  currency_id: string | number
  passport_expire: string
  passport_date: string
  role: string
  parent_id: string | number
  inn: string | number
  company: string
  address: string
  director: string
  checkpoint: string
  bank_name: string
  mfo: string
  account_price: string | number
  beneficiary_account: string
  sales_email: string
  sales_phone: string
  sales_full_name: string
  accountant_email: string
  accountant_phone: string
  accountant_full_name: string
  technical_email: string
  technical_phone: string
  technical_full_name: string
  contract_number: string | number
  contract_date: string
  contract_expire: string
  file_passport_form: string
  file_contract_form: string
}

export interface IPassword {
  password: string
}
