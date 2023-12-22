import { Button } from '@/components/common'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface UserData {
  answer: string
  user: {
    username: string[]
    image: {
      uploadPath: string[] | null
    }
  }
}

const UserCard = () => {
  const [userData, setUserData] = useState<UserData[]>([])
  const { meetingId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 데이터 파일 경로
        const response = await fetch(
          `http://localhost:4000/api/events/${meetingId}/applies`,
        )
        const jsonData = await response.json()
        console.log(jsonData.data)
        // 불러온 데이터를 상태에 설정
        setUserData(jsonData.data)
      } catch (error) {
        console.error('모임장이 아닙니다', error)
        navigate('/')
      }
    }

    fetchData()
  }, [])

  const userSec = () => {
    console.log('유저아이디')
  }

  return (
    <>
      {userData.map((item, index) => (
        <section
          key={index}
          className='flex flex-row items-center h-[10rem] w-full rounded-big-radius
      my-7 shadow-md bg-light-gray-color'
        >
          <div className='p-3 flex relative items-center flex-col justify-center w-[17.5%] h-auto '>
            <div className='self-start'>
              <p className='ml-2'>참여대기</p>
            </div>
            <div className='bg-aquamarine w-[5rem] h-[5rem] flex items-center justify-center rounded-full overflow-hidden'>
              <img src={`${item.user.image?.uploadPath}`} alt='NO Image' />
            </div>
            <div>
              <p className='font-bold text-size-body'>{item.user.username}</p>
            </div>
          </div>

          <div className='flex gap-2 flex-col justify-center relative h-full w-[65%] '>
            <p className='font-light text-left break-keep text-size-body'>
              {item.answer}
            </p>
          </div>
          <div className='flex relative items-center justify-evenly w-[17.5%] h-full flex-col'>
            <Button
              children='거절'
              width='w-[70%] h-[40px]'
              fill='border'
              onClick={() => alert('거절')}
            />
            <Button
              children='수락'
              width='w-[70%]'
              fill='activeFill'
              onClick={userSec}
            />
          </div>
        </section>
      ))}
    </>
  )
}

const WantJoinList = () => {
  return (
    <>
      <div className='text-center min-h-[33rem]'>
        <h4 className='font-bold text-size-title'>
          Crew / Challenge 신청자 관리
        </h4>
        <UserCard />
      </div>
    </>
  )
}

export default WantJoinList
