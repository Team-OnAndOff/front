import { userReports } from '@/api/userReports'
import { Button } from '@/components/common'
import { useForm, SubmitHandler } from 'react-hook-form'
interface FormData {
  introduction: string
}
interface Props {
  closeModal: () => void
  userId?: string
}

const Declaration = ({ closeModal, userId }: Props) => {
  const { register, handleSubmit } = useForm<FormData>()
  const action = () => {}

  // 폼 서밋 핸들러
  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    if (event) {
      event.preventDefault()
    }
    console.log(data, '데이터 테스트')
    //여기에 데이터 전송 로직 넣으면된다.
    const formData = new FormData()
    formData.append('introduction', data.introduction.toString())
    if (userId !== undefined) {
      formData.append('attendeeId', userId.toString())
    }
    try {
      await userReports(formData)
    } catch {
      console.log('데이터 전달오류')
    }
  }

  return (
    <>
      <div>
        <div className='flex items-start justify-between'>
          <p className='font-bold text-size-body'>신고 사유</p>
        </div>
        <form onSubmit={action}>
          <textarea
            className='resize-none overflow-hidden p-[10px] text-size-body font-medium rounded-button-radius mt-[11px] border-2 border-solid border-main-color '
            {...register('introduction')}
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
