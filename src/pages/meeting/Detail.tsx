import { Button, BreadCrumb } from '@/components/common'
import {
  MeetDetailInfo,
  MeetHostInfo,
  MeetMemberList,
  MeetPlace,
} from '@/components/meeting'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchDeleteEvent, fetchGetEventDetail } from '@/api/event'
import { EventDetailData } from '@/types'
import useAuthStore from '@/store/userStore'
import Swal, { SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Detail() {
  const [postDetail, setPostDetail] = useState<EventDetailData | null>(null)
  const { postId } = useParams()
  const eventId = Number(postId)
  const { user } = useAuthStore((state) => state)
  const navigate = useNavigate()

  const handleBtnClick = () => {
    return
  }
  const handleEventDelete = async () => {
    MySwal.fire({
      title: '삭제 확인',
      text: '모임을 삭제하시겠습니까?',
      icon: 'question',
      iconColor: '#ff5e2e',
      footer:
        '모임을 삭제할 경우, <br/> 모임 참가자들에게 반드시 알려주시기 바랍니다.',
      confirmButtonText: '확인',
      showCancelButton: true,
      cancelButtonText: '취소',
    }).then(async (result: SweetAlertResult) => {
      const data = await fetchDeleteEvent(eventId)
      if (data && data.code === 200) {
        if (result.isConfirmed) {
          MySwal.fire('삭제 성공', '모임삭제가 완료되었습니다.', 'success')
          setTimeout(() => {
            MySwal.close()
            navigate('/')
          }, 2000)
        }
      }
    })
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
        <div className='flex flex-col py-14 gap-y-8'>
          <BreadCrumb category={postDetail.category} />
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
            eventId={eventId}
            likes={postDetail.likes}
            hostId={postDetail.user.id}
          />
          <div className='mt-12'>
            <h3 className='text-xl font-semibold text-black-color'>
              👉 방장님을 소개합니다!
            </h3>
            <MeetHostInfo
              leaderName={postDetail.user.username}
              leaderImageUrl={postDetail.user.image.uploadPath}
              leaderIntroduce={postDetail.user.introduction}
              hostId={postDetail.user.id}
            />
          </div>

          <div className='mt-12'>
            <h3 className='text-xl font-semibold text-black-color'>
              👉 우리 멤버를 소개합니다!
            </h3>
            {postDetail.eventApplies.length === 0 ? (
              <div className='flex mt-3 justify-center items-center rounded-big-radius border-2 border-dark-gray-color min-h-[120px]'>
                <span className='text-size-body text-dark-gray-color'>
                  현재 참여 중인 멤버가 없습니다.
                </span>
              </div>
            ) : (
              <MeetMemberList
                eventId={eventId}
                participatedMem={postDetail.eventApplies}
              />
            )}
          </div>

          {!postDetail.online && (
            <div className='mt-6'>
              <h3 className='text-xl font-semibold text-black-color'>
                👉 모임 장소
              </h3>
              <MeetPlace address={postDetail.address.detail1} />
            </div>
          )}

          {postDetail.user.id === user?.id && (
            <div className='flex justify-between p-3.5'>
              <Button fill='inactiveFill' onClick={handleEventDelete}>
                삭제하기
              </Button>
              <Link to={`/chat/${eventId}`}>
                <Button
                  fill='activeFill'
                  width='w-big-button'
                  onClick={handleBtnClick}
                >
                  채팅방 입장하기
                </Button>
              </Link>
              <Link to='/recruits-edit' state={{ eventId: eventId }}>
                <Button fill='activeFill' onClick={handleBtnClick}>
                  수정하기
                </Button>
              </Link>
            </div>
          )}
          {postDetail.eventApplies.some((mem) => mem.user.id === user?.id) && (
            <div className='p-3.5 mx-auto'>
              <Link to={`/chat/${eventId}`}>
                <Button
                  fill='activeFill'
                  width='w-big-button'
                  onClick={handleBtnClick}
                >
                  채팅방 입장하기
                </Button>
              </Link>
            </div>
          )}
          {postDetail.user.id !== user?.id &&
            !postDetail.eventApplies.some(
              (mem) => mem.user.id === user?.id,
            ) && (
              <div className='p-3.5 mx-auto'>
                <Link to={`/recruits-register/${postDetail.id}`}>
                  <Button fill='border' onClick={handleBtnClick}>
                    신청하기
                  </Button>
                </Link>
              </div>
            )}
        </div>
      )}
    </>
  )
}
