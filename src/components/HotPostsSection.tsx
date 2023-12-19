import { Card, Button } from '@/components/common'
import { useNavigate } from 'react-router-dom'
import { CategoryType } from '@/utils/index'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { useState, useRef } from 'react'
import SwiperCore from 'swiper/core'
import { IoIosArrowBack } from 'react-icons/io'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Autoplay])

interface HotPostsSectionProps {
  title: string
  data: {
    postImageUrl: string
    title: string
    startDate: string
    endDate?: string
    category: string
    leaderName: string
    leaderImageUrl: string
    createDate: string
    detailCategory: string
    like?: number
  }[]
  isSlide: boolean
  categoryType?: CategoryType
}

export default function HotPostsSection({
  title,
  data,
  isSlide,
  categoryType,
}: HotPostsSectionProps) {
  const navigate = useNavigate()
  const [swiper, setSwiper] = useState<SwiperClass>()

  const filteredData = data.filter((item) => item.category === categoryType)

  const sortedData = data.sort((a, b) => (b.like || 0) - (a.like || 0))
  const topPosts = sortedData.slice(0, 3)

  const handleClickCrew = () => {
    if (categoryType) navigate(`/${categoryType.toLowerCase()}s/0`)
  }

  const [items] = useState(filteredData)

  const swiperRef = useRef(null)

  // 호버 시, 슬라이드 정지
  const onInit = (swiper) => {
    swiperRef.current = swiper
  }

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop()
    }
  }

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start()
    }
  }

  // 이전, 다음 버튼 이벤트핸들러
  const handlePrev = () => {
    swiper?.slidePrev()
  }
  const handleNext = () => {
    swiper?.slideNext()
  }

  return (
    <section className='relative flex flex-col gap-y-7'>
      <h2 className='font-bold text-size-title break-keep'>{title}</h2>
      {isSlide ? (
        <>
          <div id='post-slide' className='relative'>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Swiper
                className='pt-1'
                loop={items.length > 1}
                speed={2000}
                slideToClickedSlide={true}
                loopedSlides={2}
                slidesPerView={3}
                spaceBetween={30}
                watchOverflow={true}
                slidesOffsetBefore={0}
                autoplay={{
                  delay: 1000,
                  disableOnInteraction: false,
                }}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                }}
                navigation={{
                  prevEl: '#prev_slide',
                  nextEl: '#next_slide',
                }}
                onInit={onInit}
                modules={[Autoplay, Navigation]}
                onSwiper={(e) => {
                  setSwiper(e)
                }}
              >
                {items.map((item) => (
                  <SwiperSlide key={item.title}>
                    <Card
                      postImageUrl={item.postImageUrl}
                      title={item.title}
                      startDate={item.startDate}
                      endDate={item.endDate}
                      category={item.category}
                      leaderName={item.leaderName}
                      leaderImageUrl={item.leaderImageUrl}
                      createDate={item.createDate}
                      detailCategory={item.detailCategory}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* 이전, 다음 버튼 커스텀 */}
            <button
              className='absolute top-1/2 -left-[50px]'
              onClick={handlePrev}
            >
              <i className='text-size-title tablet:text-[2rem] text-black-color'>
                <IoIosArrowBack />
              </i>
            </button>
            <button
              className='absolute top-1/2 -right-[50px]'
              onClick={handleNext}
            >
              <i className='text-size-title tablet:text-[2rem] text-black-color'>
                <IoIosArrowBack className='rotate-180' />
              </i>
            </button>
          </div>

          <div className='pt-2 text-right text-size-subbody'>
            <Button fill='border' onClick={handleClickCrew}>
              전체보기
            </Button>
          </div>
        </>
      ) : (
        // 슬라이드 없이 top3만 보여주기
        <div className='grid grid-cols-3 gap-4'>
          {topPosts.map((item) => (
            <Card
              key={item.title}
              postImageUrl={item.postImageUrl}
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              category={item.category}
              leaderName={item.leaderName}
              leaderImageUrl={item.leaderImageUrl}
              createDate={item.createDate}
              detailCategory={item.detailCategory}
            />
          ))}
        </div>
      )}
    </section>
  )
}
