import tree_1 from '@/assets/images/tree_1.svg'
import tree_2 from '@/assets/images/tree_2.svg'
import tree_3 from '@/assets/images/tree_3.svg'
import hand_1 from '@/assets/images/hand_1.svg'
import hand_2 from '@/assets/images/hand_2.svg'
import hand_3 from '@/assets/images/hand_3.svg'
import challenge_1 from '@/assets/images/challenge_1.svg'
import challenge_2 from '@/assets/images/challenge_2.svg'
import challenge_3 from '@/assets/images/challenge_3.svg'
import best_1 from '@/assets/images/best_1.svg'
import best_2 from '@/assets/images/best_2.svg'
import best_3 from '@/assets/images/best_3.svg'
import { useState } from 'react'

interface condition {
  attend: number
  open: number
  success: number
  bestValse: number[]
}

const Betsy = ({ attend, open, success, bestValse }: condition) => {
  const [value] = useState([1, 10, 100])

  const images = [tree_1, tree_2, tree_3]
  const hand = [hand_1, hand_2, hand_3]
  const challenge = [challenge_1, challenge_3, challenge_2]
  const best = [
    {
      img: best_1,
      text: '오늘의',
      awards: bestValse[0] == 1 ? true : false,
    },
    {
      img: best_2,
      text: '금주의',
      awards: bestValse[1] == 1 ? true : false,
    },
    {
      img: best_3,
      text: '이번달',
      awards: bestValse[2] == 1 ? true : false,
    },
  ]

  return (
    <>
      <div className='flex gap-20 mt-[28px] mb-[55px]'>
        <div className='flex gap-8 '>
          {images.map((image, index) => (
            <div key={index} className='flex flex-col items-center'>
              <img
                className='w-[140px] h-[140px]'
                style={
                  value[index] <= attend ? {} : { filter: 'grayscale(100%)' }
                }
                src={image}
                alt={`모임 참여 ${index + 1} 이미지`}
              />
              <p className='mt-[1rem font-bold'>모임 참여</p>
              <p className='font-bold'>{value[index]}회</p>
            </div>
          ))}
        </div>

        <div className='flex gap-8'>
          {hand.map((image, index) => (
            <div key={index} className='flex flex-col items-center'>
              <img
                className='w-[140px] h-[140px]'
                style={
                  value[index] <= open ? {} : { filter: 'grayscale(100%)' }
                }
                src={image}
                alt={`모임 열기 ${index + 1} 이미지`}
              />
              <p className='mt-[1rem font-bold'>모임 열기</p>
              <p className='font-bold'>{value[index]}회</p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex gap-20 mt-[28px]'>
        <div className='flex gap-8 '>
          {challenge.map((image, index) => (
            <div key={index} className='flex flex-col items-center'>
              <img
                className='w-[140px] h-[140px]'
                style={
                  value[index] <= success ? {} : { filter: 'grayscale(100%)' }
                }
                src={image}
                alt={`챌린지 성공 ${index + 1} 이미지`}
              />
              <p className='mt-[1rem font-bold'>챌린지 성공</p>
              <p className='font-bold'>{value[index]}회</p>
            </div>
          ))}
        </div>

        <div className='flex gap-8'>
          {best.map((image, index) => (
            <div key={index} className='flex flex-col items-center'>
              <img
                className='w-[140px] h-[140px]'
                style={image.awards ? {} : { filter: 'grayscale(100%)' }}
                src={image.img}
                alt={`베스트 모임 선정 ${index + 1} 이미지`}
              />
              <p className='mt-[1rem font-bold'>{image.text}</p>
              <p className='font-bold'>모임 선정</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Betsy
