import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'

interface ReportData {
    description: string;
    attendeeId?: number;
}

const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/api/reports-user`,
    withCredentials: true,
})

export const userReports = async (formData: FormData | ReportData) => {
    try {
        const response = await instance.post<Response<null>>('', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
}
