import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { CardData, Response, RecruitData, EventQuery } from '@/types'
import { HandleSearchParams } from '@/utils'
import { DataProps } from '@/pages/meeting/RecruitsRegister'

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/events`,
  withCredentials: true,
})

// 모임 목록 조회하기
export const fetchGetEvents = async (query: EventQuery) => {
  try {
    const searchParams = new URLSearchParams(location.search)

    // 카테고리 조회
    if (query.categoryId) {
      HandleSearchParams(
        searchParams,
        'categoryId',
        query.categoryId.toString(),
      )
    }

    // 서브카테고리 조회
    if (query.subCategoryId) {
      HandleSearchParams(
        searchParams,
        'subCategoryId',
        query.subCategoryId.toString(),
      )
    }

    // 제목이나 해시태그로 검색
    if (query.search) {
      HandleSearchParams(searchParams, 'search', query.search)
    }

    // 메인 Like Top3
    if (query.sort) {
      HandleSearchParams(searchParams, 'sort', query.sort)
    }

    // 보여줄 card의 개수
    if (query.limit) {
      HandleSearchParams(searchParams, 'limit', query.limit.toString())
    }

    // 오름차순, 내림차순
    if (query.order) {
      HandleSearchParams(searchParams, 'order', query.order)
    }

    // 무한스크롤
    if (query.page) {
      HandleSearchParams(searchParams, 'page', query.page.toString())
    }
    if (query.perPage) {
      HandleSearchParams(searchParams, 'perPage', query.perPage.toString())
    }

    const url = `?${searchParams.toString()}`

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

    const response = await instance.get<Response<RecruitData>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const fetchPostRecruitEditEvents = async (eventId: number) => {
  try {
    const url = `/${eventId}`
    const response = await instance.put<Response<FormData>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// 좋아요 누를 시, 해당 포스트 id보내기
export const fetchPutLikePosts = async (eventId: number) => {
  try {
    const url = `/${eventId}/likes`
    const response = await instance.put<Response<number>>(url)
    return response.data.data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// user가 모임 신청하기
export const fetchPostRecruitRegister = async (
  eventId: number,
  data: DataProps,
) => {
  try {
    const url = `/${eventId}/applies`
    const response = await instance.post(url, data)
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}
