import { useState, useEffect } from 'react'
import { Button } from '@/components/common'

interface StartPopupProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  handleClickTodayClose: () => void
}

const TypewriterEffect = () => {
  const words: string[] = ['온앤오프', 'ON&OFF']
  const [i, setI] = useState(0)
  const [j, setJ] = useState(0)
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isDeleting, setIsDeleting] = useState(false)

  // 텍스트 애니메이션
  useEffect(() => {
    const type = () => {
      setCurrentWord(words[i])
      if (isDeleting) {
        setJ((prevJ) => prevJ - 1)
        if (j === 0) {
          setIsDeleting(false)
          setI((prevI) => (prevI + 1) % words.length)
        }
      } else {
        setJ((prevJ) => prevJ + 1)
        if (j === currentWord.length) {
          setIsDeleting(true)
        }
      }
    }

    const timeoutId = setTimeout(type, 400)

    return () => clearTimeout(timeoutId)
  }, [i, j, isDeleting, currentWord])

  return (
    <div className='h-8 font-bold animate-typing whitespace-nowrap text-black-color dark:text-main-hover-color'>
      {currentWord.substring(0, j)}
    </div>
  )
}

export default function StartPopup({
  setModal,
  handleClickTodayClose,
}: StartPopupProps) {
  // 닫기
  const handleClickClose = () => {
    setModal(false)
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black-color bg-opacity-40 backdrop-blur-sm z-[9999] flex-col'>
      <div className='max-w-[500px] w-4/5 h-auto rounded-small-radius flex flex-col gap-y-20 justify-between dark:bg-dark-main-color bg-white relative px-8 pt-10 pb-4'>
        <div className='text-size-title dark:text-dark-light-color'>
          <TypewriterEffect />에 오신 것을 환영합니다!
        </div>
        <ul className='font-semibold text-black-color text-size-body'>
          <li className='mb-12 break-keep dark:text-dark-light-color'>
            👉 온앤오프가 처음이신가요⁉️
            <br />
            <span className='font-light dark:text-dark-light-color'>
              New 크루원과 챌린저를 위한 온앤오프{' '}
              <a
                href='https://www.notion.so/49fad4b8b1414749a51499b3b9f3f6ff'
                className='underline hover:text-main-color '
                target='_blank'
              >
                이용 가이드
              </a>
              를 참고해주세요!
            </span>
          </li>
          <li className='dark:text-dark-light-color break-keep'>
            👉 온앤오프에 원하는 모임이 없나요⁉️
            <br />
            <span className='font-light dark:text-dark-light-color'>
              방장이 되어 직접 원하는 Crew나 Challenge를 만들어보세요!
            </span>
          </li>
        </ul>
        <div className='flex justify-between'>
          <Button
            onClick={handleClickTodayClose}
            fill='inactiveFill'
            width='w-big-button'
            fontSize='text-size-subbody'
          >
            오늘 하루동안 보지 않기
          </Button>
          <Button
            onClick={handleClickClose}
            fill='border'
            fontSize='text-size-subbody'
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  )
}
