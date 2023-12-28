import { CardData } from '@/types'
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
import { DefaultProfile } from '@/assets/images'
import Swal, { SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'
import { Modal, Declaration } from '@/components/common'

const MySwal = withReactContent(Swal)
interface MyPageCardProps {
  data: CardData
}

export default function MyPageCard({ data }: MyPageCardProps) {
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
    id,
  } = data

  const navigate = useNavigate()
  const store = useAuthStore()
  const [isLike, setIsLike] = useState(false)

  const [isKebabVisible, setIsKebabVisible] = useState(false)
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)

  // 채팅방 입장하기
  const handleChatRoomEntry: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    setIsMenuVisible(false)
    // 비회원일 경우
    if (!store.user) {
      MySwal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 후에 채팅방에 입장하실 수 있습니다.',
        icon: 'warning',
        iconColor: '#ff5e2e',
        footer: '로그인 페이지로 이동하시겠습니까?',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
      return
    }
  }

  // 신고하기 클릭
  const handleDeclaration = () => {
    setIsMenuVisible(false)

    if (!store.user) {
      MySwal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 후에 해당 게시물을 신고하실 수 있습니다.',
        icon: 'warning',
        iconColor: '#ff5e2e',
        footer: '로그인 페이지로 이동하시겠습니까?',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
      return
    } else {
      openModal()
    }
  }

  // 하트 클릭
  const handleLikeClick: React.MouseEventHandler<HTMLButtonElement> = async (
    e,
  ) => {
    e.stopPropagation()

    // 비회원일 경우
    if (!store.user) {
      MySwal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 후에 좋아요를 누르실 수 있습니다.',
        icon: 'warning',
        iconColor: '#ff5e2e',
        footer: '로그인 페이지로 이동하시겠습니까?',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
      return
    }

    try {
      await fetchPutLikePosts(data.id)
      setIsLike((prev) => !prev)
    } catch (error) {
      console.error('Error liking post:', error)
    }
  }

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

  // 신고모달
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div
        className={
          'relative flex desktop:flex-col justify-between desktop:pb-2 flex-row rounded-button-radius desktop:gap-y-10 gap-y-0 tablet:gap-x-10 gap-x-6 w-full transition-all duration-[1000ms] ease-in-out'
        }
        onMouseEnter={() => setIsKebabVisible(true)}
        onMouseLeave={() => {
          !isMenuVisible && setIsKebabVisible(false)
          isLike && setIsKebabVisible(true)
        }}
      >
        {isMenuVisible && (
          <div className='absolute w-full desktop:h-full h-[120%] bg-white opacity-80 z-[997]' />
        )}
        {/* 이미지 영역 */}
        <div className='relative flex justify-center hover:-translate-y-1 hover:transition-all aspect-w-1 aspect-h-1 hover:drop-shadow-xl w-[14rem] desktop:max-w-[32rem] desktop:w-full mb-10 desktop:mb-0'>
          <div className='w-full h-36 desktop:h-[14vw]'>
            <Link to={`/details/${data.id}`}>
              <LazyImage
                src={image.uploadPath}
                alt={title}
                className='object-cover w-full h-full min-w-[230px] cursor-pointer rounded-image-radius'
                loading='lazy'
              />
            </Link>
          </div>
          {/* 방장 프로필 이미지 */}
          <div className='group'>
            <Link
              to={`/userInfo/${user.id}`}
              className='absolute bg-white rounded-full cursor-pointer -bottom-6 drop-shadow-xl right-2 desktop:-bottom-6 desktop:right-5'
            >
              <LazyImage
                src={user.image.uploadPath || DefaultProfile}
                alt={user.username}
                className='w-12 h-12 rounded-full'
                loading='lazy'
              />
            </Link>
            {/* TODO: 이름이 있을 경우에만 ToolTip이 보여지도록 */}
            <span className='absolute px-2 py-1 text-xs font-light transition-opacity rounded shadow opacity-0 pointer-events-none bg-dark-gray-color -bottom-6 -right-10 desktop:right-3 desktop:-bottom-14 w-max text-light-gray-color group-hover:opacity-100'>
              {user.username}
            </span>
          </div>
        </div>
        {/* 텍스트 영역 */}
        <div className='flex flex-col justify-between flex-1 desktop:px-3 desktop:-mt-5 desktop:gap-y-3'>
          <div className='text-[0.6rem] text-dark-gray-color tablet:text-size-subbody desktop:text-left'>
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
              <Tag options={hashTags} parentId={category.parentId?.id} />
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
                            onClick={handleLikeClick}
                            className='p-2 transition-transform transform active:scale-75 tablet:text-size-title hover:scale-105'
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
                  {isMenuVisible && (
                    <div className='absolute desktop:right-5 desktop:bottom-6 right-0.5 bottom-8 z-[998]'>
                      <div className='bg-white rounded-small-radius shadow w-big-button z-[998] mb-4'>
                        <button
                          className='w-full p-2 px-4 cursor-pointer menuItems hover:text-main-color'
                          onClick={handleChatRoomEntry}
                        >
                          채팅방 입장하기
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
                        className='absolute bottom-0 right-0 p-3 -m-3 desktop:bottom-0'
                      >
                        <FaTimes fill='black' size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <Declaration
            type='eventReport'
            eventId={id}
            reporterId={user?.id}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </>
  )
}
