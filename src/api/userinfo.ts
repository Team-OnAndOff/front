import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'

interface UserData {
    data: {
        username: string | null
        image: {
            uploadPath: string | null
        }
        introduction: string
        me?: boolean // me 속성을 선택적으로 지정
    }
}

const instance = axios.create({
    baseURL: `${VITE_BACKEND_HOST}/api/users`,
    withCredentials: true,
})



export const userInfo = async (userId?: string) => {
    try {
        const url = `/${userId}/info`
        const response = await instance.get<UserData>(url)
        return response.data.data
    } catch (error) {
        console.error('Error:', error)
        throw error
    }

}