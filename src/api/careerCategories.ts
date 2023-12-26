import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { careerCategory, Response } from '@/types'

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/careerCategories`,
  withCredentials: true,
})

// 직업카테고리 목록 조회하기
export const fetchGetCareerCategories = async () => {
  try {
    const response = await instance.get<Response<careerCategory[]>>(`/`)
    return response.data.data
  } catch (error) {
    console.error(error)
    return []
  }
}
