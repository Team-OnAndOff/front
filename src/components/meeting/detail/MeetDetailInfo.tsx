import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { MdPlace, MdAccessTimeFilled } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { Tag } from '@/components/common'

export default function MeetDetailInfo() {
  // 태그 옵션 예시
  const options = [
    { meetup: 'crew', categoryId: 1, tagName: '태그1' },
    { meetup: 'challenge', categoryId: 2, tagName: '태그2' },
    { meetup: 'crew', categoryId: 3, tagName: '태그3' },
  ]
  return (
    <>
      <div className='flex items-center'>
        {/* 좋아요 상태에 따라 하트 색상 다르게 */}
        <TiHeartOutline size={24} />
        <TiHeartFullOutline size={24} />
        <h3 className='text-size-title'>React + Typescript 집중 탐구 모임</h3>
      </div>

      {/* 모임 장소, 시간, 인원, 해시태그 관련 내용 */}
      <div className='flex justify-between p-2 mt-3'>
        <div className='flex'>
          <MdPlace size={24} />
          <span className='ml-2 text-size-body'>강남 아지트 3F</span>
        </div>
        <div className='flex'>
          <MdAccessTimeFilled size={24} />
          <span className='ml-2 text-size-body'>일요일 14:00 ~ 17:00</span>
        </div>
        <div className='flex'>
          <FaUser size={24} />
          <span className='ml-2 text-size-body'>참여인원: 12명</span>
        </div>
      </div>

      {/* 태그 */}
      <div className='p-2 mt-3'>
        <Tag options={options} />
      </div>

      <div className='flex items-center mt-3'>
        <div className='w-[360px] mr-4 h-[360px] bg-dark-gray-color rounded-big-radius'>
          이미지 자리
        </div>
        <div className='w-[calc(100%-360px)] h-[360px] bg-dark-gray-color rounded-big-radius'>
          모임 상세 자리
        </div>
      </div>
    </>
  )
}
