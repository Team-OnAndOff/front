import axios from 'axios'
import { VITE_BACKEND_HOST } from '@/assets/config'
import { ReportProps, Response } from '@/types'
import Swal from 'sweetalert2'

export interface EventReportDataProps {
  description: string
  eventId?: number
  reporterId?: number
}

export interface UserReportDataProps {
  description: string
  attendeeId?: number
}

const instance = axios.create({
  baseURL: `${VITE_BACKEND_HOST}/api`,
  withCredentials: true,
})

// 모임 신고 api
export const fetchEventReport = async (
  eventReportData: EventReportDataProps,
) => {
  try {
    const response = await instance.post<Response<null>>(
      '/reports-event',
      eventReportData,
    )
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// 유저신고 api
export const fetchUserReports = async (userReportData: UserReportDataProps) => {
  try {
    const response = await instance.post<Response<ReportProps>>(
      '/reports-user',
      userReportData,
    )
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        Swal.fire({
          icon: 'error',
          title: '유저 신고 실패!',
          text: '최소 10자 이상 입력해주세요!',
          timer: 2000,
          confirmButtonColor: '#ff5e2e',
        })
      }
    }
  }
}
