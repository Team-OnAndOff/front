import { Button } from '@/components/common'
import {
  MeetDetailInfo,
  MeetHostInfo,
  MeetMemberList,
  MeetPlace,
} from '@/components/meeting'
import { data } from '@/data/postDetail'
import { Link } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'

export default function Detail() {
  const postDetailData = data
  // 버튼 클릭 이벤트 핸들러
  const handleBtnClick = () => {
    console.log('버튼이 클릭되었습니다!')
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center mt-6'>
        <i>
          <FaRegLightbulb fill='#ff5e2e' size={24} />
        </i>
        <h3 className='mt-1 text-size-title'>
          {postDetailData.detailCategory}
        </h3>
      </div>

      <div className='mt-6'>
        <MeetDetailInfo
          startDate={postDetailData.startDate}
          endDate={postDetailData.endDate}
          title={postDetailData.title}
          content={postDetailData.content}
          place={postDetailData.address}
          memNum={postDetailData.membersNum}
          postImageUrl={postDetailData.postImageUrl}
        />
      </div>
      <div className='mt-6'>
        <h3 className='text-size-title'>방장님을 소개합니다!</h3>
        <MeetHostInfo
          leaderName={postDetailData.leaderName}
          leaderImageUrl={postDetailData.leaderImageUrl}
          leaderIntroduce={postDetailData.leaderIntroduce}
        />
      </div>

      <div className='mt-6'>
        <h3 className='text-size-title'>우리 멤버를 소개합니다!</h3>
        <MeetMemberList participatedMem={postDetailData.particiPated} />
      </div>

      {/* 지도 */}
      <div className='mt-6'>
        <h3 className='text-size-title'>모임 장소</h3>
        <MeetPlace address={postDetailData.address} />
      </div>

      {/* 버튼 위치  일단 모든 버튼 넣어놓고 조건에 따라 다르게 수정*/}
      <div className='flex justify-between mt-6 p-2.5'>
        <Button fill='inactiveFill' onClick={handleBtnClick}>
          삭제하기
        </Button>
        <Button fill='activeFill' onClick={handleBtnClick}>
          수정하기
        </Button>
        <Button fill='activeFill' width='w-big-button' onClick={handleBtnClick}>
          채팅방 입장하기
        </Button>
        <Link to={`/recruits-register/${postDetailData.postId}`}>
          <Button fill='border' onClick={handleBtnClick}>
            신청하기
          </Button>
        </Link>
      </div>
    </div>
  )
}
