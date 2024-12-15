export interface IOffers {
  product: string
  adt_qnt: number
  chi_qnt: number
  inf_qnt: number
  date: string
  currency: string
  price: number
  airport: {
    code: string
    city: string
    terminal: number[]
  }
}
