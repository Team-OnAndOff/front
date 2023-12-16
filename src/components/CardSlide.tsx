import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { data } from '@/data/post'
import { useState, useRef } from 'react'
import { Card } from '@/components/common'
import SwiperCore from 'swiper/core'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

SwiperCore.use([Autoplay])

export default function CardSlide() {
  const [items] = useState(data)

  const swiperRef = useRef(null)

  const onInit = (swiper) => {
    swiperRef.current = swiper
  }

  const handleMouseEnter = () => {
    if (swiperRef.current) swiperRef.current.autoplay.stop()
  }

  const handleMouseLeave = () => {
    if (swiperRef.current) swiperRef.current.autoplay.start()
  }

  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        onInit={onInit}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              key={index}
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
  )
}
