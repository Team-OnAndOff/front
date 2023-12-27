import { userReports } from '@/api/userReports'
import { Button } from '@/components/common'
import { useForm, SubmitHandler } from 'react-hook-form'
interface FormData {
  description: string
  attendeeId?: number
}
interface Props {
  closeModal: () => void
  attendeeId?: string
}

const Declaration = ({ closeModal, attendeeId }: Props) => {
  const { register, handleSubmit } = useForm<FormData>()

  // 폼 서밋 핸들러
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    console.log(attendeeId, '유저아이디')
    if (event) {
      event?.preventDefault()
    }

    const repotData = {
      description: data.description,
      attendeeId:
        attendeeId !== undefined ? parseInt(attendeeId, 10) : undefined,
    }

    try {
      await userReports(repotData)
    } catch (error) {
      console.log('데이터 전달오류', error)
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
