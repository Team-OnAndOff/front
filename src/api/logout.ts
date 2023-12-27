import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'
const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/auth`,
  withCredentials: true,
})

export const fetchLogout = async () => {
  try {
    const response = await instance.get<Response<null>>('/logout')
    return response.data
  } catch (e) {
    console.log(e)
  }
}
