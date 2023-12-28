import { statusPut, wantJoin } from '@/api/wantJoinList'
import { Button } from '@/components/common'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface UserData {
  id: number
  answer: string
  user: {
    id: number
    username: string[]
    image: {
      uploadPath: string[] | null
    }
  }
}

const UserCard = () => {
  const [userData, setUserData] = useState<UserData[]>([])
  const [newLoad, setNewLoad] = useState(true)
  const { meetingId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wantUserData = await wantJoin(meetingId)
        setUserData(wantUserData.data || [])
      } catch (error) {
        console.error('모임장이 아닙니다', error)
        navigate('/')
      }
    }

    fetchData()
  }, [meetingId, navigate, newLoad])
  console.log(userData)

  //수락버튼
  const userSec = async (
    meetingUserId: number,
    userId: number,
    status: number,
    meetingId: string,
  ) => {
    console.log(meetingUserId, userId, status, meetingId, '미팅/유저아이디')
    const formData = {
      status: status,
      userId: userId,
    }

    try {
      await statusPut(formData, meetingUserId, meetingId)
      setNewLoad((prev) => !prev)
    } catch {
      console.log('데이터 전달오류')
    }
  }

  return (
    <>
      {userData.length === 0 && (
        <h4 className='mt-5 text-size-title'>신청자가 없습니다....</h4>
      )}
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
              onClick={() => {
                if (meetingId) {
                  userSec(item.id, item.user.id, 1, meetingId)
                } else {
                  console.error('meetingId is undefined')
                }
              }}
            />
            <Button
              children='수락'
              width='w-[70%]'
              fill='activeFill'
              onClick={() => {
                if (meetingId) {
                  userSec(item.id, item.user.id, 3, meetingId)
                } else {
                  console.error('meetingId is undefined')
                }
              }}
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
        <h4 className='font-bold mt-14 text-size-title'>
          Crew / Challenge 신청자 관리
        </h4>
        <UserCard />
      </div>
    </>
  )
}

export default WantJoinList
