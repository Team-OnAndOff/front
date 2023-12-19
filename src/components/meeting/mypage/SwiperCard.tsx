import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import './styles.css'

import { FreeMode, Pagination, Navigation } from 'swiper/modules'

export default function SwiperCard() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        freeMode={true}
        loop={true}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        className='mySwiper h-[588px] mt-5'
      >
        <SwiperSlide className='bg-main-color'>Slide 1</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 2</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 3</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 4</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 5</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 6</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 7</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 8</SwiperSlide>
        <SwiperSlide className='bg-main-color'>Slide 9</SwiperSlide>
      </Swiper>
    </>
  )
}
