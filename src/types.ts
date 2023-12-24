export interface Product {
  id: string,
  data: {
    id: string,
    name: string,
    price: {
      current: number
    },
    credit: {
      amount: number,
      period: number
    },
    primaryButton: string,
    wishlist: string,
    hasHistory: boolean
  }
}
