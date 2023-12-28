import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'

const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/api/users/`,
    withCredentials: true,
})

export const userCard = async (userId: number | undefined) => {
    try {
        const response = await instance.get<Response<null>>(`${userId}/related-events`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }

}