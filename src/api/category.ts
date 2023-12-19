import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Category, Response } from '@/types'

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/categories`,
})

// 카테고리 목록 조회하기
export const fetchGetCategories = async () => {
  try {
    const response = await instance.get<Response<Category[]>>(`/`)
    return response.data.data
  } catch (error) {
    console.error(error)
    return []
  }
}

// 카테고리 상세 조회하기
export const fetchGetCategory = async (categoryId: string) => {
  try {
    const response = await instance.get<Response<Category>>(
      `/${categoryId}`,
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
