import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { EventDetailData, Response } from '@/types'

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/events`,
  withCredentials: true,
})

export const fetchGetEventDetail = async (eventId: number) => {
  try {
    const response = await instance.get<Response<EventDetailData>>(
      `/${eventId}`,
    )
    return response.data.data
  } catch (error) {
    return null
  }
}
