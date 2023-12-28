import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { User, Response } from '@/types'


const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/api/auth`,
    withCredentials: true,
})

export const userEsc = async () => {
    try {
        const response = await instance.get<Response<User>>('/withdraw')
        return response
    } catch (error) {
        return null
    }
}