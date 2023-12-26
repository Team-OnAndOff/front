import { Button } from '@/components/common'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/assets/images'

export default function NotFound() {
  const navigate = useNavigate()

  const handleButtonClick = () => {
    setTimeout(() => {
      navigate(-1)
    }, 200)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen gap-y-6'>
      <img
        className='pb-10 w-80 grayscale-[60%]'
        src={Logo}
        alt='온앤오프 기업 대표 로고'
      />
      <h1 className='text-6xl font-bold text-black-color'>Error!</h1>
      <h4 className='font-medium text-size-title text-black-color'>
        원하시는 페이지를 찾을 수 없습니다!
      </h4>
      <p className='text-dark-gray-color '>404 - Page Not Found</p>
      <Button
        onClick={handleButtonClick}
        fill='activeFill'
        width='w-big-button'
      >
        이전으로 돌아가기
      </Button>
    </div>
  )
}
