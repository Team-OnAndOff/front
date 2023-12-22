import { Button } from '@/components/common'
import { useForm, SubmitHandler } from 'react-hook-form'
interface FormData {
  textareaValue: string
}
interface Props {
  closeModal: () => void
}
// 폼 서밋 핸들러
const onSubmit: SubmitHandler<FormData> = async (data, event) => {
  if (event) {
    event.preventDefault()
  }
  //여기에 데이터 전송 로직 넣으면된다.
  console.log('테스트 폼 데이터:', data)
}
const Declaration = ({ closeModal }: Props) => {
  const { register, handleSubmit } = useForm<FormData>()
  const action = () => {}

  return (
    <>
      <div>
        <div className='flex items-start justify-between'>
          <p className='font-bold text-size-body'>신고 사유</p>
        </div>
        <form onSubmit={action}>
          <textarea
            className='resize-none overflow-hidden p-[10px] text-size-body font-medium rounded-button-radius mt-[11px] border-2 border-solid border-main-color '
            {...register('textareaValue')}
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
