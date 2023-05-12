import type { OrdersType } from '@/store'
import { client } from './axios'
import Swal from 'sweetalert2'

export const listOrders = async () => {
  try {
    const res = await client.get('/orders')
    if (res) {
      return res.data
    } else {
      return []
    }
  } catch (err) {
    console.log(err)
  }
}

export const createOrder = async (body: OrdersType) => {
  try {
    const res = await client.post('/orders', body)
    if (res) {
      return res.data
    } else {
      return []
    }
  } catch (err: any) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
    console.log(err)
  }
}
