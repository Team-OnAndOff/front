import { CardProps } from '@/types'
import { formatDate } from '@/utils'
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import { Tag } from '@/components/common'
import { LazyImage } from '@/utils'

export default function Card({ data }: CardProps) {
  const {
    image,
    title,
    category,
    createdAt,
    user,
    hashTags,
    challengeStartDate,
    challengeEndDate,
  } = data

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

  const tagOptions = hashTags.map((tag) => ({
    createdAt: tag.createdAt,
    updatedAt: tag.updatedAt,
    id: tag.id,
    hashtag: tag.hashtag,
  }))

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

  // 이미지 로더
  const [isUserImageLoaded, setIsUserImageLoaded] = useState(false)

  const handleUserImageLazyLoad = () => {
    setIsUserImageLoaded(true)
  }
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
            <Link to={`/details/${data.id}`}>
              <LazyImage
                src={image.uploadPath}
                alt={title}
                className='object-cover w-full h-full cursor-pointer rounded-image-radius max-w-[360px] max-h-[360px]'
                loading='lazy'
                onLazyLoad={handleUserImageLazyLoad}
              />
            </Link>
          </div>
          {/* 방장 프로필 이미지 */}
          <div className='relative group'>
            <Link
              to={`/userInfo/${user.id}`}
              className='absolute w-1/3 bg-white rounded-full max-h-[46px] max-w-[46px] drop-shadow-xl h-1/3 bottom-12 right-5 cursor-pointer'
            >
              <LazyImage
                src={user.image.uploadPath}
                alt={user.username}
                className='rounded-full'
                loading='lazy'
              />
            </Link>
            {/* TODO: 이름이 있을 경우에만 ToolTip이 보여지도록 */}
            <span className='absolute px-2 py-1 text-sm font-medium transition-opacity bg-gray-900 rounded shadow opacity-0 pointer-events-none right-5 bottom-12 w-max text-light-gray-color group-hover:opacity-100'>
              {user.username}
            </span>
          </div>
        </div>
        {/* 텍스트 영역 */}
        <div className='flex flex-col justify-between px-3 -mt-5 text-left gap-y-3'>
          <div className='text-[0.6rem] text-dark-gray-color tablet:text-size-subbody'>
            <Link
              to={`/meetup-lists/${category.parentId?.id}?subcategories=${category.id}`}
            >
              {category.name}
            </Link>
            &nbsp; &#124; &nbsp;
            {formatDate(createdAt)}
          </Link>
          <div className='h-14'>
            <Link to={`/details/${data.id}`}>
              <h2 className='w-full font-bold line-clamp-2 text-size-body'>
                {title}
              </h2>
            </Link>
          </div>

          {/* 태그 */}
          <div className='flex flex-row h-8 gap-x-3'>
            <Tag
              options={tagOptions}
              parentId={category.parentId?.id}
              subCategoryId={category.id}
            />
          </div>

          <div>
            {/* 크루/챌린지스 */}
            <Link
              to={`/meetup-lists/${category.parentId?.id}`}
              className='font-light text-main-color text-size-body'
            >
              {category.parentId?.name}
            </Link>
            <div className='flex items-center justify-between w-full h-6 font-bold text-size-subbody'>
              {challengeStartDate}
              {challengeEndDate && ` ~ ${challengeEndDate}`}
              {/* 호버시 보이는 영역 */}
              <div>
                {/* Pop-up menu */}
                {isKebabVisible && (
                  <div>
                    {isMenuVisible ? (
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
                    <button className='w-full p-2 px-4 cursor-pointer menuItems hover:text-main-color'>
                      <Link to='/chat'>채팅방 입장하기</Link>
                    </button>
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
