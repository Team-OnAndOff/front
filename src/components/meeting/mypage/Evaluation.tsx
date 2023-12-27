import { CiFaceFrown, CiFaceSmile, CiFaceMeh } from 'react-icons/ci'
import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { FaTimes } from 'react-icons/fa'
import { Button } from '@/components/common'

interface EvaluationForm {
  score: number | null
}

interface Props {
  closeModal: () => void
  username?: string
}

const Evaluation = ({ closeModal, username }: Props) => {
  const { setValue, control, handleSubmit } = useForm<EvaluationForm>()

  // 평가 아이콘에 대한 데이터를 제출하는 함수
  const onSubmit: SubmitHandler<EvaluationForm> = (data) => {
    // 선택된 점수 데이터를 사용하여 추가적인 처리 수행
    console.log('선택된 점수:', data)
    // 여기에 선택된 점수 데이터를 활용하는 로직을 추가할 수 있습니다.
    // 예를 들어, API로데이터를 전송하거나 부모 컴포넌트의 상태를 업데이트할 수 있습니다.
  }

  // 각 아이콘에 대한 값(watch) 추적
  const watchedScore = useWatch({
    control,
    name: 'score',
  })

  return (
    <>
      <div className='w-[40rem] relative'>
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
                watchedScore === -0.3 ? 'opacity-100' : 'opacity-30'
              } hover:opacity-100 flex flex-col items-center`}
              onClick={() => setValue('score', -0.3)}
            >
              <CiFaceFrown size={100} />
              <p className='font-bold'>불만</p>
            </li>
            <li
              className={`transition-opacity cursor-pointer ${
                watchedScore === 0.1 ? 'opacity-100' : 'opacity-30'
              } hover:opacity-100 flex flex-col items-center`}
              onClick={() => setValue('score', 0.1)}
            >
              <CiFaceMeh size={100} />
              <p className='font-bold'>보통</p>
            </li>
            <li
              className={`transition-opacity cursor-pointer ${
                watchedScore === 0.3 ? 'opacity-100' : 'opacity-30'
              } hover:opacity-100 flex flex-col items-center`}
              onClick={() => setValue('score', 0.3)}
            >
              <CiFaceSmile size={100} />
              <p className='font-bold'>좋아요</p>
            </li>
          </ul>
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
