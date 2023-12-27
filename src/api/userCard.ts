import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'

const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/api/users/related-events`,
    withCredentials: true,
})

export const userCard = async () => {
    try {
        const response = await instance.get<Response<null>>('', {
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