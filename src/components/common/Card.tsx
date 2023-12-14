import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface CardProps {
  // 카드
  imageUrl: string
  title: string
  startDate: string
  endDate: string
  // postId: number
}

export default function Card({
  imageUrl,
  title,
  startDate,
  endDate,
}: CardProps) {
  const [isLike, setIsLike] = useState(false)

  const handleIconClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsLike(!isLike)
  }

  return (
    <div className='flex flex-col gap-y-5'>
      {/* 이미지 영역 */}
      <div className='relative aspect-w-1 aspect-h-1'>
        {/* 누르면 crews/challenges 인지에 따라 postId 받고 이동 */}
        {/* 모든 path를 props로 한번에 받아오기 */}
        {/* <Link to={`${categoryId}/${postId}`}> */}
        <img
          src={imageUrl}
          alt={title}
          className='object-cover w-full h-full cursor-pointer rounded-image-radius'
        />
        {/* </Link> */}
        <button
          onClick={handleIconClick}
          className='absolute top-0 right-0 p-2 transition-transform transform active:scale-75'
        >
          {/* TODO: 하트 오렌지색 */}
          {isLike ? (
            <TiHeartFullOutline size={24} />
          ) : (
            <TiHeartOutline size={24} />
          )}
        </button>
      </div>

      {/* 텍스트 영역 */}
      <div className='flex flex-col gap-y-2'>
        <Link to={'crews/dd'}>
          {/* TODO: height 설정 */}
          <h2 className='w-full font-bold line-clamp-2 text-size-body'>
            {title}
          </h2>
        </Link>

        {/* Tag 컴포넌트 위치해야함 */}
        {/* Tag 클릭 시, 해당 Tag의 text가 검색되어 리스트 나오도록 */}
        <div className='flex flex-row gap-x-3'>
          <span>태그 위치할 곳</span>
          <span>태그</span>
        </div>

        {/* 크루일 경우에는 시작일만, 챌린지인 경우에는 시작~끝 기간 */}
        <p className='font-bold text-size-body'>
          {startDate}~{endDate}
        </p>
      </div>
    </div>
  )
}
