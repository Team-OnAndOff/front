import { CardProps } from '@/types'
import { formatDate } from '@/utils'
import { TiHeartOutline, TiHeartFullOutline } from 'react-icons/ti'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEllipsisVertical } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'
import { Tag } from '@/components/common'
import { LazyImage } from '@/utils'
import { fetchPutLikePosts } from '@/api/event'
import useAuthStore from '@/store/userStore'

export default function MyPageCard({ data, openModal }: CardProps) {
  console.log(data)
  const {
    image,
    title,
    category,
    createdAt,
    user,
    hashTags,
    challengeStartDate,
    challengeEndDate,
    likes,
  } = data
  const store = useAuthStore()
  const [isLike, setIsLike] = useState(false)

  const [isKebabVisible, setIsKebabVisible] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  //   // 신고하기 클릭
  //   const handleDeclaration = () => {
  //     setIsMenuVisible(false)
  //     openModal()
  //   }

  // 하트 클릭
  //   const handleIconClick: React.MouseEventHandler<HTMLButtonElement> = async (
  //     e,
  //   ) => {
  //     e.stopPropagation()
  //     try {
  //       await fetchPutLikePosts(data.id)
  //       setIsLike((prev) => !prev)
  //     } catch (error) {
  //       console.error('Error liking post:', error)
  //     }
  //   }

  // 내가 누른 좋아요 보이게
  useEffect(() => {
    const userHasLiked = likes.some((like) => like.user.id === store.user?.id)
    setIsKebabVisible(userHasLiked)
    setIsLike(userHasLiked)
  }, [])

  const handleMenuClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation()
    setIsMenuVisible(true)
  }

  const handleCancelMenu: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsMenuVisible(false)
  }

  //태그
  //   const tagOptions = hashTags.map((tag) => ({
  //     createdAt: tag.createdAt,
  //     updatedAt: tag.updatedAt,
  //     id: tag.id,
  //     hashtag: tag.hashtag,
  //   }))

  // 이미지 로더
  const [isUserImageLoaded, setIsUserImageLoaded] = useState(false)

  const handleUserImageLazyLoad = () => {
    setIsUserImageLoaded(true)
  }

  return (
    <>
      <div
        className={
          'relative flex desktop:flex-col justify-between desktop:pb-2 flex-row rounded-button-radius desktop:gap-y-10 tablet:gap-x-10 gap-x-12 w-full transition-all duration-[1000ms] ease-in-out'
        }
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
        <div className='relative flex justify-center hover:-translate-y-1 hover:transition-all aspect-w-1 aspect-h-1 hover:drop-shadow-xl w-[14rem] desktop:max-w-[32rem] desktop:w-full'>
          <div className='w-full h-36 desktop:h-[14vw]'>
            <Link to={`/details/${data.id}`}>
              <LazyImage
                src={data.event.image}
                alt={title}
                className='object-cover w-full h-full min-w-[230px] cursor-pointer rounded-image-radius'
                loading='lazy'
                onLazyLoad={handleUserImageLazyLoad}
              />
            </Link>
          </div>
          {/* 방장 프로필 이미지 */}
          <div className='group'>
            <Link
              to={`/userInfo/${data.id}`}
              className='absolute bg-white rounded-full cursor-pointer -bottom-6 drop-shadow-xl right-2 desktop:-bottom-6 desktop:right-5'
            >
              <LazyImage
                src={data.event.image.uploadPath}
                alt={user.username}
                className='w-16 h-16 rounded-full'
                loading='lazy'
              />
            </Link>
            {/* TODO: 이름이 있을 경우에만 ToolTip이 보여지도록 */}
            <span className='absolute px-2 py-1 text-sm font-medium transition-opacity bg-gray-900 rounded shadow opacity-0 pointer-events-none desktop:right-3 bottom-12 w-max text-light-gray-color group-hover:opacity-100'>
              {user.username}
            </span>
          </div>
        </div>
        {/* 텍스트 영역 */}
        <div className='flex flex-col justify-between flex-1 desktop:px-3 desktop:-mt-5 desktop:gap-y-3'>
          <div className='text-[0.6rem] text-dark-gray-color tablet:text-size-subbody  desktop:text-left'>
            <Link
              to={`/meetup-lists/${category.parentId?.id}?subCategoryId=${category.id}`}
            >
              {category.name}
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
            <div className='h-8'>
              <Tag options={tagOptions} parentId={category.parentId?.id} />
            </div>

            <div className='w-full'>
              {/* 크루/챌린지스 */}
              <Link
                to={`/meetup-lists/${category.parentId?.id}`}
                className='font-light text-right text-main-color desktop:text-size-body text-size-subbody'
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
                      {!isMenuVisible && (
                        <div className='flex'>
                          <button
                            onClick={handleIconClick}
                            className='p-2 transition-transform transform active:scale-75 tablet:text-size-title'
                          >
                            <i className='text-size-body tablet:text-size-title'>
                              {isLike ? (
                                <TiHeartFullOutline fill='#ff5e2e' />
                              ) : (
                                <TiHeartOutline />
                              )}
                            </i>
                          </button>
                          <button
                            onClick={handleMenuClick}
                            className='p-3 -m-3'
                          >
                            <i className='text-size-body tablet:text-xl'>
                              <FaEllipsisVertical fill='black' />
                            </i>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Pop-up menu */}
                  {/* {isMenuVisible && (
                    <div className='absolute desktop:right-5 desktop:bottom-6 right-0.5 bottom-5 z-[998]'>
                      <div className='bg-white rounded-small-radius shadow w-big-button z-[998] mb-4'>
                        <button className='w-full p-2 px-4 cursor-pointer menuItems hover:text-main-color'>
                          <Link to='/chat'>채팅방 입장하기</Link>
                        </button>
                        <button
                          onClick={handleDeclaration}
                          className='w-full p-2 px-4 cursor-pointer menuItems hover:text-main-color'
                        >
                          신고하기
                        </button>
                      </div>
                      <button
                        onClick={handleCancelMenu}
                        className='absolute right-0 p-3 -m-3'
                      >
                        <FaTimes fill='black' size={16} />
                      </button>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
