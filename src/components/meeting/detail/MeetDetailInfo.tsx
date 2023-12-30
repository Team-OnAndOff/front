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
import Swal, { SweetAlertResult } from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom'

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
  hostId: number
}

const MySwal = withReactContent(Swal)

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
  hostId,
}: MeetDetailProps) {
  const [isLike, setIsLike] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { user } = useAuthStore((state) => state)
  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!user) {
      MySwal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 후에 모임 신고를 하실 수 있습니다.',
        icon: 'warning',
        iconColor: '#ff5e2e',
        confirmButtonColor: '#ff5e2e',
        cancelButtonColor: '#3a823f',
        footer: '로그인 페이지로 이동하시겠습니까?',
        confirmButtonText: '확인',
        showCancelButton: true,
        cancelButtonText: '취소',
      }).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    } else {
      if (user?.id === hostId) {
        Swal.fire({
          icon: 'error',
          text: '본인이 개설한 모임입니다!',
          timer: 2000,
          confirmButtonColor: '#ff5e2e',
        })
      } else {
        setIsModalOpen(true)
      }
    }
  }
  const closeModal = () => setIsModalOpen(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userLikeEvent = likes.some((like) => like.user.id === user?.id)
    setIsLike(userLikeEvent)
  }, [likes, user?.id])

  // 하트 클릭
  const handleLikeClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()

    // 비회원일 경우
    if (!user) {
      MySwal.fire({
        title: '로그인이 필요합니다',
        text: '로그인 후에 좋아요를 누르실 수 있습니다.',
        icon: 'warning',
        iconColor: '#ff5e2e',
        confirmButtonColor: '#ff5e2e',
        cancelButtonColor: '#3a823f',
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
            <FaRegLightbulb
              className='fill-main-color dark:fill-sub-color'
              size={24}
            />
          </i>
          <h3 className='font-bold text-size-title break-keep text-black-color smooth-transition dark:text-dark-light-color'>
            {title}
          </h3>
        </div>

        <div className='flex items-center gap-x-2'>
          {/* 좋아요 상태에 따라 하트 색상 다르게 */}
          <button
            onClick={handleLikeClick}
            className='transform smooth-transition active:scale-75 tablet:text-size-title'
          >
            {isLike ? (
              <i className='text-size-body tablet:text-size-title smooth-color'>
                <TiHeartFullOutline fill='#ff5e2e' />
              </i>
            ) : (
              <i className='text-size-body tablet:text-size-title smooth-color dark:fill-dark-light-color'>
                <TiHeartOutline fill='dark' />
              </i>
            )}
          </button>
          <button onClick={openModal} className='-mt-1'>
            <i>
              <LuSiren
                size={24}
                className='smooth-color smooth-transition dark:stroke-dark-light-color hover:scale-105 hover:stroke-main-color hover:dark:stroke-main-hover-color'
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
      <div className='flex flex-col mt-5 gap-y-3'>
        <h3 className='text-xl font-semibold text-black-color dark:text-dark-light-color smooth-color'>
          👉 모임을 소개합니다!
        </h3>
        <div className='flex items-center justify-between'>
          <div className='flex -ml-1 gap-x-2'>
            <MdPlace
              size={26}
              className='smooth-color dark:fill-dark-light-color'
            />
            <span className='tracking-wider text-black-color smooth-transition dark:text-dark-light-color text-size-body'>
              <span className='font-bold smooth-transition dark:text-dark-light-color'>
                장소{' '}
              </span>
              <span className='text-dark-gray-color smooth-transition dark:text-dark-light-color'>
                |
              </span>{' '}
              {online === 1 ? '온라인' : `${place}`}
            </span>
          </div>
          <div className='flex items-center gap-x-1'>
            <FaUserCircle
              size={20}
              className='smooth-color dark:fill-dark-light-color'
            />
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
          <MdAccessTimeFilled
            size={21}
            className='smooth-color dark:fill-dark-light-color'
          />
          {endDate ? (
            <span className='tracking-wider smooth-transition dark:text-dark-light-color text-black-color text-size-body'>
              <span className='font-bold smooth-transition dark:text-dark-light-color'>
                {' '}
                기간{' '}
              </span>{' '}
              <span className='text-dark-gray-color smooth-transition dark:text-dark-light-color'>
                |
              </span>{' '}
              {startDate} ~ {endDate}
            </span>
          ) : (
            <span className='tracking-wider smooth-transition dark:text-dark-light-color text-black-color text-size-body'>
              <span className='font-bold smooth-transition dark:text-dark-light-color'>
                개설일{' '}
              </span>
              <span className='text-dark-gray-color smooth-transition dark:text-dark-light-color'>
                |
              </span>{' '}
              {startDate}
            </span>
          )}
        </div>
        <div className='flex gap-x-2'>
          <FaUser
            size={18}
            className='smooth-color dark:fill-dark-light-color'
          />
          <span className='tracking-wider text-black-color text-size-body smooth-transition dark:text-dark-light-color'>
            <span className='font-bold smooth-transition dark:text-dark-light-color'>
              모집인원{' '}
            </span>
            <span className='text-dark-gray-color smooth-transition dark:text-dark-light-color'>
              |
            </span>{' '}
            {memNum}명
          </span>
        </div>
      </div>

      {/* 태그 */}
      <div className='flex flex-col my-10 gap-y-2'>
        <span className='font-size-body text-black-color smooth-transition dark:text-dark-light-color'>
          관련 태그
        </span>
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
          <p className='p-4 h-[200px] transition-all duration-1000 whitespace-pre-wrap smooth-transition dark:text-dark-light-color'>
            {content}
          </p>
        </div>
      </div>
    </>
  )
}
