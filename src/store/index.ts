import { client } from '@/services/axios'
import { defineStore } from 'pinia'

export interface OrdersType {
    consigneeName: string
    consigneeAddress: string
    consigneeCity: string
    consigneeCountry: string
    consigneePostalCode: string
    consigneeProvince: string
    consigneeNumber: string
    height: number
    weight: number
    length: number
    width: number
    paymentType: string
}

export interface LoginType {
  username: string,
  password: string
}

export enum MenuType {
  Table='table',
  Add='add'
}

export const useCounterStore = defineStore('order', {
  state: () => {
    return {
      orders: [] as OrdersType[],
      menu: MenuType.Table as MenuType,
      accessToken: "" as string,
    }
  },
  getters: {
  },
  actions: {
    setOrders(val: OrdersType[]) {
      this.orders = val
    },
    setMenu (val: MenuType) {
      this.menu = val;
    },
    setToken(val: string) {
      this.accessToken = val
    }
  }
})
