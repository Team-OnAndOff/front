import {
  EventReportDataProps,
  UserReportDataProps,
  fetchEventReport,
  fetchUserReports,
} from '@/api/reports'
import { Button } from '@/components/common'
import { useForm, SubmitHandler } from 'react-hook-form'
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
        alert('유저 신고 완료')
      }
    } else if (type === 'eventReport') {
      const data = await fetchEventReport(eventReportData)
      if (data && data.code === 201) {
        alert('모임 신고 완료')
      }
    }
  }

  return (
    <>
      <div>
        <div className='flex items-start justify-between'>
          <p className='font-bold text-size-body'>신고 사유</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea
            className='resize-none overflow-hidden p-[10px] text-size-body font-medium rounded-button-radius mt-[11px] border-2 border-solid border-main-color '
            {...register('description')}
            rows={7}
            cols={80}
            maxLength={200}
            placeholder='신고 내용을 적어주세요'
          />
          <div className='flex justify-center gpa-3 mt-[11px]'>
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
      </div>
    </>
  )
}

export default Declaration
