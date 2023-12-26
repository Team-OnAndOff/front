import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { CardData, Response, RecruitData, EventQuery } from '@/types'

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/events`,
  withCredentials: true,
})

const handleSearchParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string | undefined,
) => {
  if (value) {
    searchParams.set(key, value)
  } else {
    searchParams.delete(key)
  }
}

// 모임 목록 조회하기
export const fetchGetEvents = async (query: EventQuery) => {
  try {
    const searchParams = new URLSearchParams(location.search)

    // 카테고리 조회
    if (query.categoryId) {
      handleSearchParams(
        searchParams,
        'categoryId',
        query.categoryId.toString(),
      )
    }

    // 서브카테고리 조회
    if (query.subCategoryId) {
      handleSearchParams(
        searchParams,
        'subCategoryId',
        query.subCategoryId.toString(),
      )
    }

    // 제목이나 해시태그로 검색
    if (query.search) {
      handleSearchParams(searchParams, 'search', query.search)
    }

    // 메인 Like Top3
    if (query.sort) {
      handleSearchParams(searchParams, 'sort', query.sort)
    }

    // 보여줄 card의 개수
    if (query.limit) {
      handleSearchParams(searchParams, 'limit', query.limit.toString())
    }

    // 오름차순, 내림차순
    if (query.order) {
      handleSearchParams(searchParams, 'order', query.order)
    }

    // 무한스크롤
    if (query.page) {
      handleSearchParams(searchParams, 'page', query.page.toString())
    }
    if (query.perPage) {
      handleSearchParams(searchParams, 'perPage', query.perPage.toString())
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
