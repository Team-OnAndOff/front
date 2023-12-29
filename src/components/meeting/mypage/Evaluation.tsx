import { CiFaceFrown, CiFaceSmile, CiFaceMeh } from 'react-icons/ci'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { Button, TextArea } from '@/components/common'
import { UserAssessData, fetchUserAssess } from '@/api/user'
import Swal from 'sweetalert2'

interface EvaluationForm {
  score: number
  description: string
}

interface Props {
  closeModal: () => void
  eventId: number
  attendeeId: number
  username: string
}

const Evaluation = ({ closeModal, eventId, attendeeId, username }: Props) => {
  const { setValue, control, handleSubmit, register } =
    useForm<EvaluationForm>()

  const onSubmit: SubmitHandler<EvaluationForm> = async (evaldata) => {
    const evaluationData: UserAssessData = {
      ...evaldata,
      eventId,
      attendeeId,
    }
    const data = await fetchUserAssess(evaluationData)
    if (data && data.code === 200) {
      Swal.fire({
        icon: 'success',
        title: '유저 평가 완료!',
        text: '소중한 평가 감사합니다!',
        timer: 2000,
        confirmButtonColor: '#ff5e2e',
      })
    }
  }

  const watchedScore = useWatch({
    control,
    name: 'score',
  })

  return (
    <>
      <div className='relative w-full'>
        <h4 className='flex items-start justify-center'>
          <p className='font-bold text-size-body'>
            {username}님을 평가해주세요!
          </p>
        </h4>
        <button className='absolute top-0 right-0' onClick={closeModal}>
          <FaTimes fill='#666' />
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
          <ul className='flex justify-around p-2'>
            <li
              className={`transition-opacity cursor-pointer ${
                watchedScore === -0.1 ? 'opacity-100' : 'opacity-30'
              } hover:opacity-100 flex flex-col items-center`}
              onClick={() => setValue('score', -0.1)}
            >
              <CiFaceFrown size={100} />
              <p className='font-bold'>불만</p>
            </li>
            <li
              className={`transition-opacity cursor-pointer ${
                watchedScore === 0 ? 'opacity-100' : 'opacity-30'
              } hover:opacity-100 flex flex-col items-center`}
              onClick={() => setValue('score', 0)}
            >
              <CiFaceMeh size={100} />
              <p className='font-bold'>보통</p>
            </li>
            <li
              className={`transition-opacity cursor-pointer ${
                watchedScore === 0.1 ? 'opacity-100' : 'opacity-30'
              } hover:opacity-100 flex flex-col items-center`}
              onClick={() => setValue('score', 0.1)}
            >
              <CiFaceSmile size={100} />
              <p className='font-bold'>좋아요</p>
            </li>
          </ul>
          <TextArea
            register={register('description')}
            placeholder='이유를 적어주세요!'
          />
          <Button
            type='submit'
            children='평가 제출'
            width='w-[160px] mx-auto mt-[5px]'
            fill='activeFill'
            onClick={closeModal}
          />
        </form>
      </div>
    </>
  )
}

export default Evaluation
