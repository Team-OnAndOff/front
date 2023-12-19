import axios from 'axios';
import { VITE_BACKEND_HOST } from '@/assets/config';
import { CardData, Response } from '@/types';

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api/events`,
});

// 모임 목록 조회하기
export const fetchGetEvents = async (categoryId: number, subCategoryId?: number) => {
  try {
    let url = `/?categoryId=${categoryId}`;

    if (subCategoryId !== undefined) {
      url += `&subCategoryId=${subCategoryId}`;
    }

    const response = await instance.get<Response<CardData[]>>(url);
    return response.data.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};