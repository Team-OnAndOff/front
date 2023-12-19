import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import { Tag } from '@/components/common'

interface CardProps {
  // 카드
  postImageUrl: string
  title: string
  startDate: string
  endDate?: string
  category: string
  leaderName: string
  leaderImageUrl: string
  createDate: string
  detailCategory: string
  postId: number
}

export default function Card({
  postImageUrl,
  title,
  startDate,
  endDate,
  category,
  leaderName,
  leaderImageUrl,
  createDate,
  detailCategory,
}: CardProps) {
  const [isLike, setIsLike] = useState(false)
  const [isKebabVisible, setIsKebabVisible] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const handleIconClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsLike(!isLike)
  }

  const handleMenuClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsMenuVisible(true)
  }

  const handleCancelMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuVisible(false)
  }

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      const menuItems = document.querySelector('.menuItems')
      if (menuItems && !menuItems.contains(event.target as Node)) {
        setIsMenuVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideMenu)

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu)
    }
  }, [])

  const options = [
    { meetup: 'crew', tagName: '태그1' },
    { meetup: 'challenge', tagName: '태그2' },
    { meetup: 'crew', tagName: '태그3' },
  ]

  return (
    <>
      <div
        className={'relative flex flex-col pb-2 rounded-button-radius gap-y-5'}
        onMouseEnter={() => setIsKebabVisible(true)}
        onMouseLeave={() => {
          !isMenuVisible && setIsKebabVisible(false)
          isLike && setIsKebabVisible(true)
        }}
      >
        {isMenuVisible && (
          <div className='absolute w-full h-full bg-white opacity-80 z-[997]' />
        )}
        {/* 이미지 영역 */}
        <div className='hover:-translate-y-1 hover:transition-all aspect-w-1 aspect-h-1 hover:drop-shadow-xl'>
          <div className='w-full h-96'>
            {/* 모든 path를 props로 한번에 받아오기 */}
            <Link to={'/details/:postId'}>
              <img
                src={postImageUrl}
                alt={title}
                className='object-cover w-full h-full cursor-pointer rounded-image-radius max-w-[360px] max-h-[360px]'
                loading='lazy'
              />
            </Link>
          </div>
          {/* 방장 프로필 이미지 */}
          <div className='relative group'>
            <div className='absolute w-1/3 bg-white rounded-full max-h-[46px] max-w-[46px] drop-shadow-xl h-1/3 bottom-12 right-5 cursor-pointer'>
              <img
                src={leaderImageUrl}
                className='rounded-full'
                alt={leaderName}
                loading='lazy'
              />
            </div>
            <span className='absolute px-2 py-1 font-medium transition-opacity rounded shadow opacity-0 pointer-events-none bg-black-color text-size-subbody right-5 bottom-12 w-max text-light-gray-color group-hover:opacity-100'>
              {leaderName}
            </span>
          </div>
        </div>
        {/* 텍스트 영역 */}
        <div className='flex flex-col justify-between px-3 -mt-5 gap-y-3'>
          <div className='text-[0.6rem] text-dark-gray-color tablet:text-size-subbody'>
            {detailCategory}
            &nbsp; &#124; &nbsp;
            {createDate}
          </div>
          <div className='h-14'>
            <Link to={'crews/dd'}>
              <h2 className='w-full font-bold line-clamp-2 text-size-body'>
                {title}
              </h2>
            </Link>
          </div>

          {/* 태그 */}
          <div className='flex flex-row gap-x-3'>
            <Tag options={options} />
          </div>

          <div>
            {/* 크루/챌린지스 */}
            <div className='font-light text-main-color text-size-body'>
              {category}
            </div>
            <div className='flex items-center justify-between h-6 font-bold text-size-subbody'>
              {/* 크루일 경우에는 시작일만, 챌린지인 경우에는 시작~끝 기간 */}
              {startDate} &#126; {endDate}
              <div>
                {/* 호버시 보이는 영역 */}
                {/* Pop-up menu */}
                {isKebabVisible && (
                  <div>
                    {isMenuVisible ? (
                      // TODO: X버튼 레이어 밖으로 빼기
                      <button onClick={handleCancelMenu} className='p-3 -m-3'>
                        <FaTimes fill='black' size={16} />
                      </button>
                    ) : (
                      <div className='flex'>
                        <button
                          onClick={handleIconClick}
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
                        <button onClick={handleMenuClick} className='p-3 -m-3'>
                          <i className='text-size-body tablet:text-xl'>
                            <FaEllipsisVertical fill='black' />
                          </i>
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {/* Pop-up menu */}
                {isMenuVisible && (
                  <div className='absolute bg-white rounded-small-radius shadow w-big-button right-2 bottom-12 z-[998]'>
                    {/* 입장하기 or 신청하기 페이지로 이동 */}
                    <button className='w-full p-2 px-4 cursor-pointer menuItems hover:text-main-color'>
                      <Link to='/chat'>채팅방 입장하기</Link>
                    </button>
                    {/* 신고모달 띄우기 */}
                    <button className='w-full p-2 px-4 cursor-pointer menuItems hover:text-main-color'>
                      신고하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
