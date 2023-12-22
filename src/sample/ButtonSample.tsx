import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/common/Button'

export default function ButtonSample() {
  const navigate = useNavigate()

  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked)
  }

  const handleButtonClick2 = () => {
    setTimeout(() => {
      navigate(-1)
    }, 200)
  }

  const handleButtonClick3 = () => {
    setTimeout(() => {
      navigate('/mypage')
    }, 200)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(e)
      }}
    >
      <Button onClick={handleButtonClick} fill='activeFill' type='submit'>
        등록
      </Button>
      <Button
        onClick={handleButtonClick2}
        fill='inactiveFill'
        width='w-big-button'
      >
        이전
      </Button>
      <Button onClick={handleButtonClick3} fill='border'>
        신청하기
      </Button>
    </form>
  )
}
