import { Button } from '@/components/common'
import {
  MeetDetailInfo,
  MeetHostInfo,
  MeetMeberList,
  MeetPlace,
} from '@/components/meeting'

export default function Detail() {
  // 버튼 클릭 이벤트 핸들러
  const handleBtnClick = () => {
    console.log('버튼이 클릭되었습니다!')
  }

  return (
    <div className='flex flex-col'>
      <h3 className='mt-6 text-size-title'>프로젝트</h3>
      <div className='mt-6'>
        <MeetDetailInfo />
      </div>
      <div className='mt-6'>
        <h3 className='text-size-title'>방장님을 소개합니다!</h3>
        <MeetHostInfo />
      </div>

      <div className='mt-6'>
        <h3 className='text-size-title'>우리 멤버를 소개합니다!</h3>
        <MeetMeberList />
      </div>

      {/* 지도 */}
      <div className='mt-6'>
        <h3 className='text-size-title'>모임 장소</h3>
        <MeetPlace />
      </div>

      {/* 버튼 위치  일단 모든 버튼 넣어놓고 조건에 따라 다르게 수정*/}
      <div className='flex justify-between mt-6'>
        <Button fill='inactiveFill' onClick={handleBtnClick}>
          삭제하기
        </Button>
        <Button fill='activeFill' onClick={handleBtnClick}>
          수정하기
        </Button>
        <Button fill='activeFill' width='w-big-button' onClick={handleBtnClick}>
          채팅방 입장하기
        </Button>
        <Button fill='border' onClick={handleBtnClick}>
          신청하기
        </Button>
      </div>
    </div>
  )
}
