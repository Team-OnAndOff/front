import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { User, Response } from '@/types'

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/users`,
  withCredentials: true,
})

export const fetchLoginUser = async () => {
  try {
    const response = await instance.get<Response<User>>('/detail')
    return response.data.data
  } catch (error) {
    return null
  }
}

export const badgesData = async (userId?: string) => {
  try {
    const response = await instance.get<Response<null>>(`/${userId}/badges`)
    return response.data.data
  } catch (error) {
    return null
  }
}