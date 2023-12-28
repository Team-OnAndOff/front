import {
  EventReportDataProps,
  UserReportDataProps,
  fetchEventReport,
  fetchUserReports,
} from '@/api/reports'
import { Button } from '@/components/common'
import { useForm, SubmitHandler } from 'react-hook-form'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface FormData {
  description: string
  attendeeId?: number
  eventId?: number
}
interface Props {
  closeModal: () => void
  attendeeId?: number
  reporterId?: number
  eventId?: number
  type: 'userReport' | 'eventReport'
}

const MySwal = withReactContent(Swal)

const Declaration = ({
  closeModal,
  attendeeId,
  eventId,
  type,
  reporterId,
}: Props) => {
  const { register, handleSubmit } = useForm<FormData>()
  // 폼 서밋 핸들러
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    if (event) {
      event.preventDefault()
    }

    const userReportData: UserReportDataProps = {
      description: data.description,
      attendeeId: attendeeId,
    }

    const eventReportData: EventReportDataProps = {
      description: data.description,
      eventId: eventId,
      reporterId: reporterId,
    }
    if (type === 'userReport') {
      const data = await fetchUserReports(userReportData)
      if (data && data.code === 200) {
        MySwal.fire(
          '유저 신고 성공',
          '신고 내용을 검토한 후,<br/>관리자에 의해 조치가 취해질 예정입니다.',
          'success',
        )
        setTimeout(() => {
          MySwal.close()
        }, 1500)
      }
    } else if (type === 'eventReport') {
      const data = await fetchEventReport(eventReportData)
      if (data && data.code === 201) {
        MySwal.fire(
          '모임 신고 성공',
          '신고 내용을 검토한 후,<br/>관리자에 의해 조치가 취해질 예정입니다.',
          'success',
        )
        setTimeout(() => {
          MySwal.close()
        }, 1500)
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-between gap-y-4'
      >
        <p className='self-start font-bold text-size-body text-black-color'>
          신고 사유
        </p>
        <textarea
          className='w-full p-4 mb-4 overflow-hidden font-medium border-2 border-solid resize-none text-size-body rounded-button-radius focus:border-main-color border-dark-gray-color h-60 focus:outline-none'
          {...register('description')}
          maxLength={200}
          placeholder={
            type === 'userReport'
              ? '신고 사유를 최소 10자 이상 작성해주세요'
              : '신고 사유를 작성해주세요!'
          }
        />
        <div className='flex justify-center gpa-3'>
          <Button
            children='취소'
            width='w-[160px] h-[40px] mr-4'
            fill='border'
            onClick={closeModal}
          />
          <Button
            children='신고하기'
            width='w-[160px]'
            fill='activeFill'
            onClick={handleSubmit((data, event) => {
              onSubmit(data, event) //신고
              closeModal() //닫기
            })}
          />
        </div>
      </form>
    </>
  )
}

export default Declaration
