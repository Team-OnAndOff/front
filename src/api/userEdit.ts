import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'

const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/api/users`,
    withCredentials: true,
})

export const userEdit = async (formData: FormData, userId?: string) => {
    try {
        const response = await instance.put<Response<null>>(`/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response.data.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }

}