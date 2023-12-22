import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { CardData, RecruitData, Response } from '@/types'

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/events`,
})

// 모임 목록 조회하기
export const fetchGetEvents = async (
  categoryId: number,
  subCategoryId?: number,
) => {
  try {
    let url = `/?categoryId=${categoryId}`

    if (subCategoryId !== undefined) {
      url += `&subCategoryId=${subCategoryId}`
    }

    const response = await instance.get<Response<CardData[]>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// 모임 등록하기
export const fetchPostEvents = async (eventData: FormData) => {
  try {
    const response = await instance.post<Response<null>>('', eventData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// 등록된 모임 호출하기
export const fetchGetRecruitEvents = async (eventId: number) => {
  try {
    const url = `/${eventId}`

    const response = await instance.get<Response<RecruitData[]>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const fetchPostRecruitEditEvents = async (eventId: number) => {
  try {
    const url = `/${eventId}`
    const response = await instance.post<Response<FormData>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
