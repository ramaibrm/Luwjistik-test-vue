import type { LoginType, OrdersType } from '@/store'
import { client } from './axios'
import Swal from 'sweetalert2'
export const login = async (body: LoginType) => {
  try {
    const res = await client.post('/login', body)
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
