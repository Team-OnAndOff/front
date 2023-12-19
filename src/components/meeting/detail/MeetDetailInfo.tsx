import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { MdPlace, MdAccessTimeFilled } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { Tag } from '@/components/common'
import { useState } from 'react'

interface MeetDetailProps {
  startDate: string
  endDate: string
  title: string
  content: string
  place: string
  memNum: number
  postImageUrl: string
}

export default function MeetDetailInfo({
  startDate,
  endDate,
  title,
  content,
  place,
  memNum,
  postImageUrl,
}: MeetDetailProps) {
  const [isLike, setIsLike] = useState(false)
  const handleLikeClick = () => {
    setIsLike((prev) => !prev)
  }
  // 태그 옵션 예시
  const options = [
    { meetup: 'crew', tagName: '태그1' },
    { meetup: 'challenge', tagName: '태그2' },
    { meetup: 'crew', tagName: '태그3' },
  ]
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
        <h3 className='text-size-title'>{title}</h3>
      </div>

      {/* 모임 장소, 시간, 인원, 해시태그 관련 내용 */}
      <div className='flex justify-between p-2 mt-3'>
        <div className='flex'>
          <MdPlace size={24} />
          <span className='ml-2 text-size-body'>{place}</span>
        </div>
        &#124;
        <div className='flex'>
          <MdAccessTimeFilled size={24} />
          <span className='ml-2 text-size-body'>
            {startDate}~{endDate}
          </span>
        </div>
        &#124;
        <div className='flex'>
          <FaUser size={24} />
          <span className='ml-2 text-size-body'>참여인원: {memNum}명</span>
        </div>
      </div>

      {/* 태그 */}
      <div className='p-2 mt-3'>
        <Tag options={options} />
      </div>

      <div className='flex items-center mt-3'>
        <div className='w-[360px] mr-4 h-[360px]'>
          <img
            src={postImageUrl}
            alt='모임 사진'
            className='object-cover w-full h-full max-w-[360px] max-h-[360px] rounded-big-radius'
          />
        </div>
        <div className='overflow-y-auto border-2 border-dark-gray-color max-w-[calc(100%-360px)] max-h-[360px] rounded-big-radius'>
          <p className='p-3.5'>{content}</p>
        </div>
      </div>
    </>
  )
}
