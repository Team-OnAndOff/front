import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { ChatRoom, Response } from '@/types'

const userInstance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/users`,
  withCredentials: true,
})

// 참여중인 모임 목록
export const fetchGetChatRooms = async (userId: number) => {
  try {
    const url = `/${userId}/events`
    const response = await userInstance.get<Response<ChatRoom[]>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
