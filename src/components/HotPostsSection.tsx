import { Card, Button } from '@/components/common'
import { useNavigate } from 'react-router-dom'
import { CategoryType } from '@/utils/index'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { useState, useRef } from 'react'
import SwiperCore from 'swiper/core'

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

  const filteredData = data.filter((item) => item.category === categoryType)

  const sortedData = data.sort((a, b) => (b.like || 0) - (a.like || 0))
  const topPosts = sortedData.slice(0, 3)

  const handleClickCrew = () => {
    if (categoryType) navigate(`/${categoryType.toLowerCase()}s/0`)
  }

  const [items] = useState(filteredData)

  const swiperRef = useRef(null)

  const onInit = (swiper) => {
    swiperRef.current = swiper
  }

  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop()
  }

  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop()
  }

  return (
    <section className='relative flex flex-col gap-y-7'>
      <h2 className='font-bold text-size-title break-keep'>{title}</h2>
      {isSlide ? (
        <>
          <div
            className='relative'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Swiper
              loop={true}
              slidesPerView={2}
              spaceBetween={10}
              navigation={true}
              centeredSlides={true}
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
              onInit={onInit}
              modules={[Autoplay, Navigation]}
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
          <div className='pt-2 text-right text-size-subbody'>
            <Button fill='border' onClick={handleClickCrew}>
              전체보기
            </Button>
          </div>
        </>
      ) : (
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

      <style>
        {`
          .swiper-button-prev::after,
          .swiper-button-next::after {
            color: #fff;
          }

          .swiper-pagination-bullet {
            background-color: #fff;
          }
          .swiper-pagination-bullet-active {
            background-color: #ff5e2e;
          }
        `}
      </style>
    </section>
  )
}
