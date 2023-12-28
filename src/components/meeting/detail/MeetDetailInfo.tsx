import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { MdPlace, MdAccessTimeFilled } from 'react-icons/md'
import { FaUser, FaUserCircle } from 'react-icons/fa'
import { Modal, Tag } from '@/components/common'
import { useEffect, useState } from 'react'
import { HashTag, careerCategory } from '@/types'
import { LuSiren } from 'react-icons/lu'
import Declaration from '@/components/common/Declaration'
import { fetchPutLikePosts } from '@/api/event'
import useAuthStore from '@/store/userStore'
import { FaRegLightbulb } from 'react-icons/fa'

interface MeetDetailProps {
  startDate?: string
  endDate?: string
  title: string
  content: string
  place: string
  memNum: number
  postImageUrl: string
  hashTags: HashTag[]
  parentId?: number
  online: number
  careerCategories: careerCategory[]
  eventId: number
  likes: any[]
}

export default function MeetDetailInfo({
  startDate,
  endDate,
  title,
  content,
  place,
  memNum,
  postImageUrl,
  hashTags,
  parentId,
  online,
  careerCategories,
  eventId,
  likes,
}: MeetDetailProps) {
  const [isLike, setIsLike] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuthStore((state) => state)
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    const userLikeEvent = likes.some((like) => like.user.id === user?.id)
    setIsLike(userLikeEvent)
  }, [likes, user?.id])

  const handleLikeClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    try {
      await fetchPutLikePosts(eventId)
      setIsLike((prev) => !prev)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className='flex items-center justify-between w-full py-3'>
        <div className='flex items-center gap-x-2'>
          <i className='-mt-1 -ml-1'>
            <FaRegLightbulb fill='#ff5e2e' size={24} />
          </i>
          <h3 className='font-bold text-size-title break-keep text-black-color'>
            {title}
          </h3>
        </div>

        <div className='flex items-center gap-x-2'>
          {/* 좋아요 상태에 따라 하트 색상 다르게 */}
          <button
            onClick={handleLikeClick}
            className='transition-transform transform active:scale-75 tablet:text-size-title'
          >
            <i className='text-size-title'>
              {isLike ? (
                <TiHeartFullOutline
                  fill='#ff5e2e'
                  className='transition-all duration-1000 hover:scale-105'
                />
              ) : (
                <TiHeartOutline className='transition-all duration-1000 hover:scale-105' />
              )}
            </i>
          </button>
          <button onClick={openModal} className='-mt-1'>
            <i>
              <LuSiren
                size={24}
                className='transition-all duration-300 hover:scale-105 hover:stroke-main-color'
              />
            </i>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <Declaration
            type='eventReport'
            reporterId={user?.id}
            eventId={eventId}
            closeModal={closeModal}
          />
        </Modal>
      )}

      {/* 모임 장소, 시간, 인원, 해시태그 관련 내용 */}
      <div className='flex flex-col gap-y-3'>
        <h3 className='text-xl font-semibold text-black-color'>
          모임을 소개합니다!
        </h3>
        <div className='flex items-center justify-between'>
          <div className='flex -ml-1 gap-x-2'>
            <MdPlace size={26} />
            <span className='tracking-wider text-black-color text-size-body'>
              <span className='font-bold '>장소 </span>
              <span className='text-dark-gray-color'>|</span>{' '}
              {online === 1 ? '온라인' : `${place}`}
            </span>
          </div>
          <div className='flex items-center gap-x-1'>
            <FaUserCircle size={20} />
            <ul className='flex items-center gap-3'>
              {careerCategories?.map((career) => (
                <li
                  key={career.id}
                  className='p-1 px-3 my-1 rounded-md bg-main-light-color w-fit text-size-subbody text-black-color'
                >
                  #{career.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex gap-x-2'>
          <MdAccessTimeFilled size={21} />
          {endDate ? (
            <span className='tracking-wider text-black-color text-size-body'>
              <span className='font-bold '> 기간 </span>{' '}
              <span className='text-dark-gray-color'>|</span> {startDate} ~{' '}
              {endDate}
            </span>
          ) : (
            <span className='tracking-wider text-black-color text-size-body'>
              <span className='font-bold '>개설일 </span>
              <span className='text-dark-gray-color'>|</span> {startDate}
            </span>
          )}
        </div>
        <div className='flex gap-x-2'>
          <FaUser size={18} />
          <span className='tracking-wider text-black-color text-size-body'>
            <span className='font-bold '>모집인원 </span>
            <span className='text-dark-gray-color'>|</span> {memNum}명
          </span>
        </div>
      </div>

      {/* 태그 */}
      <div className='flex flex-col gap-y-2'>
        <span className='font-size-body text-black-color'>관련 태그</span>
        <Tag options={hashTags} parentId={parentId} />
      </div>

      {/* 모임소개 이미지, 글 */}
      <div className='flex flex-col justify-between mt-3 transition-all duration-1000 tablet:gap-y-0 gap-y-6 tablet:items-center tablet:flex-row'>
        <div>
          <img
            src={postImageUrl}
            alt={`${title} 게시물의 모임 사진`}
            className='object-cover tablet:h-[280px] tablet:w-[280px] rounded-big-radius w-[200px] h-[200px] transition-all duration-1000'
          />
        </div>
        <div className='overflow-y-auto border-2 border-sub-color basis-2/3 tablet:h-[280px] tablet:w-[280px] w-full rounded-big-radius transition-all duration-1000'>
          <p className='p-4 h-[200px] transition-all duration-1000 whitespace-pre-wrap'>
            {content}
          </p>
        </div>
      </div>
    </>
  )
}
