import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { MdPlace, MdAccessTimeFilled } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { Modal, Tag, TextArea } from '@/components/common'
import { useState } from 'react'
import { HashTag } from '@/types'
import { LuSiren } from 'react-icons/lu'

interface MeetDetailProps {
  startDate?: string
  endDate?: string
  title: string
  content: string
  place: string
  memNum: number
  postImageUrl: string
  hashTags: HashTag[]
  parentId: number
  online: number
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
}: MeetDetailProps) {
  const [isLike, setIsLike] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const handleLikeClick = () => {
    setIsLike((prev) => !prev)
  }
  return (
    <>
      <div className='flex items-center'>
        {/* 좋아요 상태에 따라 하트 색상 다르게 */}
        <button
          onClick={handleLikeClick}
          className='p-2 transition-transform transform active:scale-75 tablet:text-size-title'
        >
          {isLike ? (
            <i className='text-size-body tablet:text-size-title'>
              <TiHeartFullOutline fill='#ff5e2e' />
            </i>
          ) : (
            <i className='text-size-body tablet:text-size-title'>
              <TiHeartOutline />
            </i>
          )}
        </button>
        <div className='flex justify-between w-full '>
          <h3 className='text-size-title'>{title}</h3>
          <i className='cursor-pointer' onClick={openModal}>
            <LuSiren size={24} />
          </i>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <TextArea placeholder='신고 사유를 적어주세요!' />
        </Modal>
      )}

      {/* 모임 장소, 시간, 인원, 해시태그 관련 내용 */}
      <div className='flex justify-between p-2 mt-3'>
        <div className='flex'>
          <MdPlace size={24} />
          {online === 1 ? (
            <span className='ml-2 text-size-body'>장소: 온라인</span>
          ) : (
            <span className='ml-2 text-size-body'>장소: {place}</span>
          )}
        </div>
        &#124;
        <div className='flex'>
          <MdAccessTimeFilled size={24} />
          {endDate ? (
            <span className='ml-2 text-size-body'>
              기간: {startDate}~{endDate}
            </span>
          ) : (
            <span className='ml-2 text-size-body'>개설일: {startDate}</span>
          )}
        </div>
        &#124;
        <div className='flex'>
          <FaUser size={24} />
          <span className='ml-2 text-size-body'>모집인원: {memNum}명</span>
        </div>
      </div>

      {/* 태그 */}
      <div className='p-2 mt-3'>
        <Tag options={hashTags} parentId={parentId} />
      </div>

      <div className='flex items-center mt-3'>
        <div className='w-[360px] mr-4 h-[360px]'>
          <img
            src={postImageUrl}
            alt='모임 사진'
            className='object-cover w-full h-full min-w-[360px] min-h-[360px] rounded-big-radius'
          />
        </div>
        <div className='overflow-y-auto border-2 border-dark-gray-color min-w-[calc(100%-360px)] min-h-[360px] rounded-big-radius'>
          <p className='p-3.5'>{content}</p>
        </div>
      </div>
    </>
  )
}
