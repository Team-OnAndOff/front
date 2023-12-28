import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { Response } from '@/types'

interface WantType {
    userId: number,
    status: number,
}

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


export const statusPut = async (
    data: WantType,
    meetingUserId: string | number | undefined,
    meetingId: string | number | undefined
) => {
    console.log(meetingId, meetingUserId);
    try {
        const url = `${meetingId}/applies/${meetingUserId}/status`;
        console.log(url);

        // 직접 객체를 전달하고 Content-Type은 'application/json'으로 설정
        const response = await instance.put<Response<null>>(url, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};