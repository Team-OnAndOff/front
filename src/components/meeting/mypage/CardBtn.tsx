import { statusPut } from '@/api/wantJoinList'
import { Button } from '@/components/common'
import { CardData } from '@/types'
import { Dispatch, SetStateAction } from 'react'
import { useNavigate, Link } from 'react-router-dom'
interface StateNumber {
  selectedTab: number
  userId: number | string | undefined
  data: CardData
  userMe: boolean | undefined
  setNewLoad: Dispatch<SetStateAction<boolean>>
}
// 스테이트와 이펙트로 클릭 버튼마다 이벤트를 만들어서 이펙트의 api를 바꿔서 api불러오기?

export const CardBtn = ({
  selectedTab,
  data,
  userId,
  userMe,
  setNewLoad,
}: StateNumber) => {
  const navigate = useNavigate()
  const onClick = () => {
    return
  }
  const chatClick = () => {
    navigate(`/chat/${data?.event.id}`)
  }

  const onClickEsc = async (
    userId: number | string | undefined,
    meetingId: string | number,
    meetingUserId: number,
    statusNumber: number,
    setNewLoad: Dispatch<SetStateAction<boolean>>,
  ) => {
    console.log(
      '신청취소',
      userId,
      meetingId,
      '미팅유저아이디:' + meetingUserId,
    )
    const status: number = statusNumber
    const userNumId = Number(userId)
    const formData = {
      status: status,
      userId: userNumId,
    }
    try {
      await statusPut(formData, meetingUserId, meetingId)
    } catch (error) {
      console.log('취소 실패', error)
    } finally {
      setTimeout(() => {
        setNewLoad((prev) => !prev)
      }, 300)
    }
  }

  return (
    <>
      {selectedTab === 0 && (
        <div className='flex justify-center mt-5'>
          <Button
            children='신청 취소'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={() => {
              onClickEsc(userId, data?.event.id, data?.id, 2, setNewLoad)
            }}
          />
        </div>
      )}
      {selectedTab === 1 && (
        <div className='flex justify-center mt-5'>
          <Button
            children='채팅방 입장'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={() => chatClick()}
          />
          <Button
            children='모임 나가기'
            width='w-[120px]  font-bold m-1'
            fill='border'
            onClick={() => {
              onClickEsc(userId, data?.event.id, data?.id, 4, setNewLoad)
            }}
          />
        </div>
      )}
      {userMe && selectedTab === 2 && (
        <div className='flex justify-center mt-5'>
          <Link to='/recruits-edit' state={{ eventId: data?.event.id }}>
            <Button
              children='모집글 수정'
              width='w-[120px]  font-bold m-1'
              fill='border'
              onClick={onClick}
            />
          </Link>
          <Link to={`/want-join/${data?.event.id}`}>
            <Button
              children='신청자 목록'
              width='w-[120px]  font-bold m-1'
              fill='border'
              onClick={onClick}
            />
          </Link>
        </div>
      )}
      {selectedTab === 3 && (
        <div className='flex justify-center mt-5'>
          <Link to={`/details/${data?.event.id}`}>
            <Button
              children='상세보기'
              width='w-[120px]  font-bold m-1'
              fill='border'
              onClick={onClick}
            />
          </Link>
        </div>
      )}
    </>
  )
}
