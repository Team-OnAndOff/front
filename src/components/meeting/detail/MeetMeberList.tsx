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

interface MeetMemberListProps {
  participatedMem: EventAppliesUser[]
}

import swipercore from 'swiper'
swipercore.use([Autoplay])

export default function MeetMemberList({
  participatedMem,
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

  return (
    <>
      <div
        className='relative'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='flex mt-3'>
          <Swiper
            slidesPerView={1}
            slideToClickedSlide={true}
            spaceBetween={10}
            speed={2000}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={participatedMem.length >= 1}
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
                <MeetMemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* 이전, 다음 버튼 커스텀 */}
        <button className='absolute top-1/2 -left-[50px]' onClick={handlePrev}>
          <i className='text-size-title desktop:text-[2rem] text-black-color'>
            <IoIosArrowBack />
          </i>
        </button>
        <button className='absolute top-1/2 -right-[50px]' onClick={handleNext}>
          <i className='text-size-title desktop:text-[2rem] text-black-color'>
            <IoIosArrowBack className='rotate-180' />
          </i>
        </button>
      </div>
      <style>
        {`
        .swiper-button-prev::after,
        .swiper-button-next::after {
          color: #999999;
        }
        `}
      </style>
    </>
  )
}
