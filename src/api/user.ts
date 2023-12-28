import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { User, Response } from '@/types'

export interface UserAssessData {
  eventId: number
  score: number
  description: string
  attendeeId: number
}

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

export const fetchUserAssess = async (evaluationData: UserAssessData) => {
  try {
    const response = await instance.post<Response<null>>(
      '/assess',
      evaluationData,
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        alert('이미 평가한 유저입니다!')
      }
    }
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

