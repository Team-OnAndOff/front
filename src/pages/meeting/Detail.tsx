import { Button } from '@/components/common'
import {
  MeetDetailInfo,
  MeetHostInfo,
  MeetMemberList,
  MeetPlace,
} from '@/components/meeting'
import { Link, useParams } from 'react-router-dom'
import { FaRegLightbulb } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { fetchGetEventDetail } from '@/api/eventDetail'
import { EventDetailData } from '@/types'

export default function Detail() {
  const [postDetail, setPostDetail] = useState<EventDetailData | null>(null)
  const { postId } = useParams()
  const eventId = Number(postId)

  // 버튼 클릭 이벤트 핸들러
  const handleBtnClick = () => {
    console.log('버튼이 클릭되었습니다!')
  }
  useEffect(() => {
    const fetchDetailData = async (eventId: number) => {
      try {
        const data = await fetchGetEventDetail(eventId)
        setPostDetail(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDetailData(eventId)
  }, [eventId])
  return (
    <>
      {postDetail && (
        <div className='flex flex-col'>
          <div className='flex items-center mt-6'>
            <i>
              <FaRegLightbulb fill='#ff5e2e' size={24} />
            </i>
            <h3 className='mt-1 text-size-title'>{postDetail.category.name}</h3>
          </div>
          <div className='mt-6'>
            <MeetDetailInfo
              online={postDetail.online}
              startDate={postDetail.challengeStartDate}
              endDate={postDetail.challengeEndDate}
              title={postDetail.title}
              content={postDetail.content}
              place={postDetail.address?.detail1}
              memNum={postDetail.recruitment}
              postImageUrl={postDetail.image.uploadPath}
              hashTags={postDetail.hashTags}
              parentId={postDetail.category?.parentId?.id}
              careerCategories={postDetail.careerCategories}
            />
          </div>
          <div className='mt-6'>
            <h3 className='text-size-title'>방장님을 소개합니다!</h3>
            <MeetHostInfo
              leaderName={postDetail.user.username}
              leaderImageUrl={postDetail.user.image.uploadPath}
              leaderIntroduce={postDetail.user.introduction}
            />
          </div>

          <div className='mt-6'>
            <h3 className='text-size-title'>우리 멤버를 소개합니다!</h3>
            {postDetail.eventApplies.length === 0 ? (
              <div className='flex mt-3 justify-center items-center rounded-big-radius border-2 border-dark-gray-color min-h-[120px]'>
                <span className='text-size-body text-dark-gray-color'>
                  현재 참여 중인 멤버가 없습니다..
                </span>
              </div>
            ) : (
              <MeetMemberList participatedMem={postDetail.eventApplies} />
            )}
          </div>

          {!postDetail.online && (
            <div className='mt-6'>
              <h3 className='text-size-title'>모임 장소</h3>
              <MeetPlace address={postDetail.address.detail1} />
            </div>
          )}
          {/* 버튼 위치  일단 모든 버튼 넣어놓고 조건에 따라 다르게 수정*/}
          {/* TODO: 현재 user의 id 값에 따라 버튼 보여주는 것 다르게 하기 */}
          <div className='flex justify-between mt-6 p-2.5'>
            <Button fill='inactiveFill' onClick={handleBtnClick}>
              삭제하기
            </Button>
            <Button fill='activeFill' onClick={handleBtnClick}>
              수정하기
            </Button>
            <Button
              fill='activeFill'
              width='w-big-button'
              onClick={handleBtnClick}
            >
              채팅방 입장하기
            </Button>

            <Link to={`/recruits-register/${postDetail.id}`}>
              <Button fill='border' onClick={handleBtnClick}>
                신청하기
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
