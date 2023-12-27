import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'

const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/api/events/`,
    withCredentials: true,
})

export const wantJoin = async (meetingId: string | number | undefined) => {
    try {
        const url = `/${meetingId}/applies?status=0`
        const response = await instance.get<Response<null>>(url)
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}

//meetingId: string | number | undefined
export const statusPut = async (formData: FormData, meetingUserId: string | number | undefined, meetingId: string | number | undefined) => {
    try {
        const url = `/${meetingId}/applies/${meetingUserId}/status`
        const response = await instance.get<Response<null>>(url, formData)
        return response.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}