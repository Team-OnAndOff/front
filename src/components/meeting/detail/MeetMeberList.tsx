import { useState, useRef } from 'react'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { MeetMemberCard } from '@/components/meeting'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/bundle'
import { EventAppliesUser } from '@/types'
import { IoIosArrowBack } from 'react-icons/io'
import { Modal } from '@/components/common'
import Evaluation from '../mypage/Evaluation'

interface MeetMemberListProps {
  participatedMem: EventAppliesUser[]
  eventId: number
}

import swipercore from 'swiper'
swipercore.use([Autoplay])

export default function MeetMemberList({
  participatedMem,
  eventId,
}: MeetMemberListProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null)

  const swiperRef = useRef<swipercore>()

  // 호버 시, 슬라이드 정지
  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay?.stop()
  }

  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay?.start()
  }

  // 이전, 다음 버튼 이벤트핸들러
  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [attendeeId, setAttendeeId] = useState(0)
  const [username, setUserName] = useState('')
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div
        className='relative flex mt-3'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isModalOpen && (
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <Evaluation
              username={username}
              attendeeId={attendeeId}
              eventId={eventId}
              closeModal={closeModal}
            />
          </Modal>
        )}
        {participatedMem && participatedMem.length > 4 ? (
          <Swiper
            loop={participatedMem.length >= 1}
            speed={2000}
            slideToClickedSlide={true}
            spaceBetween={10}
            slidesPerView={1}
            watchOverflow={true}
            slidesOffsetBefore={0}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              1740: {
                slidesPerView: 6.5,
                slidesPerGroupSkip: 1,
              },
              1120: {
                slidesPerView: 4.5,
                slidesPerGroupSkip: 1,
              },
              768: {
                slidesPerView: 3,
                slidesPerGroupSkip: 1,
              },
              520: {
                slidesPerView: 2,
                slidesPerGroupSkip: 1,
              },
            }}
            navigation={{
              prevEl: '#prev_slide',
              nextEl: '#next_slide',
            }}
            onSwiper={(e) => {
              setSwiper(e)
              swiperRef.current = e
            }}
          >
            {participatedMem?.map((member, index) => (
              <SwiperSlide key={index}>
                <MeetMemberCard
                  findUserName={setUserName}
                  findAttendeeId={setAttendeeId}
                  member={member}
                  openModal={openModal}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          participatedMem?.map((member, index) => (
            <MeetMemberCard
              key={index}
              member={member}
              findUserName={setUserName}
              findAttendeeId={setAttendeeId}
              openModal={openModal}
            />
          ))
        )}
        {/* 이전, 다음 버튼 커스텀 */}
        {participatedMem && participatedMem.length > 4 && (
          <>
            <button
              className='absolute top-1/2 -left-[50px]'
              onClick={handlePrev}
            >
              <i className='text-size-title desktop:text-[2rem] text-black-color'>
                <IoIosArrowBack />
              </i>
            </button>
            <button
              className='absolute top-1/2 -right-[50px]'
              onClick={handleNext}
            >
              <i className='text-size-title desktop:text-[2rem] text-black-color'>
                <IoIosArrowBack className='rotate-180' />
              </i>
            </button>
          </>
        )}
      </div>
    </>
  )
}
