import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'

const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/reports-user`,
    withCredentials: true,
})

export const userReports = async (formData: FormData) => {
    const response = await instance.post<Response<null>>
}