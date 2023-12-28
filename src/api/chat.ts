import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { ChatMessage, ChatRoom, ChatUser, Response } from '@/types'

const userInstance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/chat`,
  withCredentials: true,
})

// 참여중인 모임 목록
export const fetchGetChatRooms = async () => {
  try {
    const url = `/rooms`
    const response = await userInstance.get<Response<ChatRoom[]>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 모임
export const fetchGetChatRoom = async (id: string) => {
  try {
    const url = `/rooms/${id}`
    const response = await userInstance.get<Response<ChatRoom>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// 채팅 유저조회
export const fetchGetChatUser = async () => {
  try {
    const url = `/user`
    const response = await userInstance.get<Response<ChatUser>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

// 채팅 이전내역 조회
export const fetchGetChatPrevMessages = async (room: string, page: number) => {
  try {
    const url = `/prevMessages?room=${room}&page=${page}`
    const response = await userInstance.get<Response<ChatMessage[]>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}
